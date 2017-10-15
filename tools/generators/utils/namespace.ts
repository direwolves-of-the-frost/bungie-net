import {relative} from 'path';
import * as OpenAPI from './open-api';
import {Writer} from './writer';

const importPrefix = '#/components/';

export class Namespace extends Map<string, string | Namespace> {
	public readonly path: string;
	private specification: OpenAPI.Specification;
	private imports: Map<string, Map<string, string[]>> = new Map();

	constructor(path: string, specification: OpenAPI.Specification) {
		super();

		this.path = path;
		this.specification = specification;
	}

	public static pascal(name: string) {
		return name.charAt(0).toUpperCase() + name.slice(1);
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
		const schemaName = Namespace.pascal(namespaces.pop()) || 'index';

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

		let schema: OpenAPI.Schema;
		const [type, name] = targetNamespace.split(/([^.]+)\.(.*)/).slice(1, -1);

		if (type === 'responses') {
			let response = this.specification.components.responses[name];

			if (OpenAPI.isReference(response)) {
				response = OpenAPI.resolveReference<OpenAPI.Response>(this.specification, response);
			}

			if (response !== undefined && response !== null) {
				schema = response.content['application/json'].schema;
			}
		} else if (type === 'schemas') {
			schema = this.specification.components.schemas[name];
		}

		if (OpenAPI.isReference(schema)) {
			schema = OpenAPI.resolveReference<OpenAPI.Response>(this.specification, schema).content['application/json'].schema;
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
			} else if (a > b) {
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
			const [namespace, path] = Namespace.getNamespaceAndPath(reference.$ref.substr(importPrefix.length).replace(/\//g, '.'));

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

	private buildSchema(schemaName: string, schema: OpenAPI.Schema): string {
		console.info(`Processing ${schemaName}...`);

		const writer = new Writer();
		const addImport = (reference: OpenAPI.Reference) => {
			this.addImport(schemaName, reference);
		};

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
				const propertySchema = OpenAPI.isReference(property) ? OpenAPI.resolveReference<OpenAPI.Schema>(this.specification, property) : property;

				if (propertySchema !== null) {
					if (!OpenAPI.isReference(property) && propertySchema.description !== undefined) {
						writer.writeDocComment(propertySchema.description);
					}

					writer.writeLine(`${propertyName}${propertySchema.nullable ? '?:' : ':'} ${OpenAPI.resolveType(this.specification, property, addImport)};`);
				} else {
					console.warn(`Unable to resolve reference!`);
				}
			});

			writer.unindent();
			writer.writeLine('}');
			writer.writeBlankLine();
		} else if (schema.type === 'object' && schema.additionalProperties instanceof Object && schema['x-dictionary-key'] instanceof Object) {
			const keyType = OpenAPI.resolveType(this.specification, schema['x-dictionary-key'], addImport);
			const dictionaryType = OpenAPI.resolveType(this.specification, schema.additionalProperties, addImport);

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
