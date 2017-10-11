import {relative} from 'path';
import * as OpenAPI from './open-api';
import {Writer} from './writer';

const importPrefix = '#/components/schemas/';

export class Namespace extends Map<string, string | Namespace> {
	public readonly path: string;
	private specification: OpenAPI.Specification;
	private imports: Map<string, Map<string, string[]>> = new Map();

	constructor(path: string, specification: OpenAPI.Specification) {
		super();

		this.path = path;
		this.specification = specification;
	}

	public static getPath(namespace: string) {
		return namespace.replace(/\./g, '/').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	public static getNamespaceAndPath(path: string) {
		const parts = path.split('.');
		return [parts.pop(), parts.join('.')];
	}

	public add(targetNamespace: string) {
		let currentPath = this.path;
		let currentNamespace: Namespace = this;
		const namespaces = targetNamespace.substr(this.path.length).split('.');
		const schemaName = namespaces.pop() || 'index';

		namespaces.forEach((namespace) => {
			const existingNamespace = currentNamespace.get(namespace);

			currentPath += `${currentPath.length > 0 ? '.' : ''}${namespace}`;

			if (existingNamespace === undefined || typeof existingNamespace === 'string') {
				const newNamespace = new Namespace(currentPath, this.specification);

				if (typeof existingNamespace === 'string') {
					currentNamespace.add(currentPath);
					this.imports.delete(namespace);
				}

				currentNamespace.set(namespace, newNamespace);
				currentNamespace = newNamespace;
			} else {
				currentNamespace = existingNamespace;
			}
		});

		let schema = this.specification.components.schemas[targetNamespace];

		if (OpenAPI.isReference(schema)) {
			schema = this.resolveReference<OpenAPI.Schema>(schema);
		}

		if (schema !== undefined && schema !== null) {
			const builtSchema = currentNamespace.buildSchema(schemaName, schema);

			if (builtSchema !== null) {
				currentNamespace.set(schemaName, builtSchema);
			}
		}
	}

	public hasNamespaces(): boolean {
		for (const value of this.values()) {
			if (value instanceof Object) {
				return true;
			}
		}

		return false;
	}

	public getOutput() {
		const hasNamespaces = this.hasNamespaces();
		const writer = new Writer();

		function sort(a: string, b: string) {
			a = a.toLowerCase();
			b = b.toLowerCase();

			if (a < b) {
				return -1;
			}

			if (a > b) {
				return 1;
			}

			return 0;
		}

		if (this.imports.size > 0) {
			const basePath = (hasNamespaces ? this.path : this.path.split('.').slice(0, -1).join('.'));

			Array.from(Array.from(this.imports.values()).reduce((accumulator, currentValue) => {
				currentValue.forEach((imports, namespace) => {
					if (!accumulator.has(namespace)) {
						accumulator.set(namespace, imports.filter((value, index, self) => {
							return self.indexOf(value) === index;
						}));
					} else {
						const existingPaths = accumulator.get(namespace);

						imports.forEach((path) => {
							if (existingPaths.indexOf(path) === -1) {
								existingPaths.push(path);
							}
						});
					}
				});

				return accumulator;
			}, new Map()).entries()).map((imports) => {
				let path = relative(`${Namespace.getPath(basePath)}`, `${Namespace.getPath(imports[0])}`);

				path = path.replace(/\\/g, '/');

				if (!path.startsWith('..')) {
					path = `./${path}`;
				}

				if (path.endsWith('.')) {
					path += '/';
				}

				imports[0] = path;

				return imports;
			}).sort((a, b) => sort(a[0], b[0])).forEach((imports) => {
				writer.writeLine(`import {${imports[1].sort(sort).join(', ')}} from '${imports[0]}';`);
			});

			writer.writeBlankLine();
		}

		if (hasNamespaces) {
			for (const [name, declaration] of this.entries()) {
				if (declaration instanceof Object) {
					writer.writeLine(`import * as ${name} from './${Namespace.getPath(name)}';`);
					writer.writeLine(`export {${name}};`);
				}
			}

			writer.writeBlankLine();
		}

		for (const declaration of this.values()) {
			if (typeof declaration === 'string') {
				writer.write(declaration);
			}
		}

		return writer.getOutput();
	}

	private addImport(schemaName: string, reference: OpenAPI.Reference) {
		if (reference.$ref.startsWith(importPrefix)) {
			const [namespace, path] = Namespace.getNamespaceAndPath(reference.$ref.substr(importPrefix.length));

			if (this.path !== path) {
				if (!this.imports.has(schemaName)) {
					this.imports.set(schemaName, new Map());
				}

				if (!this.imports.get(schemaName).has(path)) {
					this.imports.get(schemaName).set(path, []);
				}

				this.imports.get(schemaName).get(path).push(namespace);
			}
		} else {
			console.warn(`Unable to add import ${reference.$ref} to ${this.path}!`);
		}
	}

	private resolveReference<T>(reference: OpenAPI.Reference): T {
		console.info(`Resolving reference ${reference.$ref}.`);
		let object: any = this.specification;
		const path = reference.$ref.replace('#/', '').split('/');

		while (object && path.length > 0) {
			const key = path.shift();
			object = object[key];
		}

		return object || null;
	}

	private resolveType(schemaName: string, resolvable: OpenAPI.Schema | OpenAPI.Reference): string {
		if (resolvable) {
			if (OpenAPI.isReference(resolvable)) {
				this.addImport(schemaName, resolvable);
				return resolvable.$ref.split('/').pop().split('.').pop();
			} else {
				const type = resolvable.type;

				if (type === 'integer') {
					if (resolvable.format.indexOf('int64') > -1) {
						return 'string';
					}

					return 'number';
				} else if (type === 'object') {
					if (resolvable['x-dictionary-key'] !== undefined) {
						const keyType = this.resolveType(schemaName, resolvable['x-dictionary-key']);
						const dictionaryType = this.resolveType(schemaName, resolvable.additionalProperties);

						if (keyType !== 'string' && keyType !== 'number') {
							if (OpenAPI.isReference(resolvable['x-dictionary-key'])) {
								const reference = this.resolveReference<OpenAPI.Schema>(resolvable['x-dictionary-key']);

								if (reference['x-enum-values'] instanceof Array) {
									console.warn('Dictionary key type rewritten to number (workaround for https://github.com/Microsoft/TypeScript/issues/13042).');
									return `{[field: number]: ${dictionaryType}}`;
								}
							}

							console.warn('Dictionary key type was not a number or string!');
							return `{[field: string | number]: ${dictionaryType}}`;
						}

						return `{[field: ${keyType}]: ${dictionaryType}}`;
					} else if (resolvable.allOf instanceof Array && resolvable.allOf.length > 0) {
						let types = '';

						resolvable.allOf.forEach((value) => {
							types += `${types !== '' ? ' | ' : ''}${this.resolveType(schemaName, value)}`;
						});

						return types;
					}
				} else if (type === 'array') {
					return `${this.resolveType(schemaName, resolvable.items)}[]`;
				} else {
					return type;
				}
			}
		}

		console.info('Unable to resolve type of:', resolvable);
		return 'any';
	}

	private buildSchema(schemaName: string, schema: OpenAPI.Schema): string {
		const writer = new Writer();

		console.info(`Processing ${schemaName}...`);

		if (schema['x-enum-values'] instanceof Array) {
			if (schema.description !== undefined) {
				writer.writeDocComment(schema.description);
			}

			writer.writeLine(`export enum ${schemaName} {`);
			writer.indent();

			schema['x-enum-values'].forEach((value: any) => {
				writer.writeLine(`${value.identifier} = ${value.numericValue},`);
			});

			writer.unindent();
			writer.writeLine('}');
			writer.writeBlankLine();
		} else if (schema.type === 'object' && schema.properties instanceof Object) {
			const properties = schema.properties;

			if (schema.description !== undefined) {
				writer.writeDocComment(schema.description);
			}

			writer.writeLine(`export interface ${schemaName} {`);
			writer.indent();

			Object.keys(properties).forEach((propertyName) => {
				console.info(`Processing property ${propertyName}...`);

				const property: OpenAPI.Schema | OpenAPI.Reference = properties[propertyName];
				const propertySchema = OpenAPI.isReference(property) ? this.resolveReference<OpenAPI.Schema>(property) : property;

				if (propertySchema !== null) {
					if (!OpenAPI.isReference(property) && propertySchema.description !== undefined) {
						writer.writeDocComment(propertySchema.description);
					}

					writer.writeLine(`${propertyName}${propertySchema.nullable ? '?:' : ':'} ${this.resolveType(schemaName, property)};`);
				} else {
					console.warn(`Unable to resolve reference!`);
				}
			});

			writer.unindent();
			writer.writeLine('}');
			writer.writeBlankLine();
		} else if (schema.type === 'object' && schema.additionalProperties instanceof Object && schema['x-dictionary-key'] instanceof Object) {
			const keyType = this.resolveType(schemaName, schema['x-dictionary-key']);
			const dictionaryType = this.resolveType(schemaName, schema.additionalProperties);

			if (schema.description !== undefined) {
				writer.writeDocComment(schema.description);
			}

			writer.writeLine(`export class ${schemaName} {`);
			writer.indent();

			if (keyType !== 'string' && keyType !== 'number') {
				console.warn('Dictionary key type was not a number or string!');
				return `{[field: string | number]: ${dictionaryType}}`;
			} else {
				writer.writeLine(`[field: ${keyType}]: ${dictionaryType};`);
			}

			writer.unindent();
			writer.writeLine('}');
			writer.writeBlankLine();
		} else {
			console.log(`Unknown Schema Type: ${schema.type}`);
			return null;
		}

		return writer.getOutput();
	}
}
