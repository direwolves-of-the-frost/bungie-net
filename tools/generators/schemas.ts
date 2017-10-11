import {existsSync, mkdirSync, unlinkSync, writeFileSync} from 'fs';
import {dirname, relative} from 'path';
import * as request from 'request-promise-native';
import {isReference, OpenAPI, Reference, Schema} from '../utils/openapi';
import {Writer} from '../utils/writer';

const out = './src/schemas';

request('https://raw.githubusercontent.com/Bungie-net/api/master/openapi.json', {
	json: true,
}).then((specification: OpenAPI) => {
	function resolveReference<T>(reference: Reference): T {
		console.info(`Resolving reference ${reference.$ref}.`);
		let object: any = specification;
		const path = reference.$ref.replace('#/', '').split('/');

		while (object && path.length > 0) {
			const key = path.shift();
			object = object[key];
		}

		return object || null;
	}

	function resolveType(resolvable: Schema | Reference, importCallback: (reference: Reference) => void): string {
		if (resolvable) {
			if (isReference(resolvable)) {
				importCallback(resolvable);
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
						const keyType = resolveType(resolvable['x-dictionary-key'], importCallback);
						const dictionaryType = resolveType(resolvable.additionalProperties, importCallback);

						if (keyType !== 'string' && keyType !== 'number') {
							if (isReference(resolvable['x-dictionary-key'])) {
								const reference = resolveReference<Schema>(resolvable['x-dictionary-key']);

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
							types += `${types !== '' ? ' | ' : ''}${resolveType(value, importCallback)}`;
						});

						return types;
					}
				} else if (type === 'array') {
					return `${resolveType(resolvable.items, importCallback)}[]`;
				} else {
					return type;
				}
			}
		}

		console.info('Unable to resolve type of:', resolvable);
		return 'any';
	}

	function addImport(imports: Map<string, Map<string, string[]>>, source: string, target: Reference) {
		if (target.$ref.startsWith('#/components/schemas/')) {
			const parts = target.$ref.replace('#/components/schemas/', '').split('.');
			const classname = parts.pop();
			const path = parts.join('/').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

			if (path !== source) {
				if (!imports.has(source)) {
					imports.set(source, new Map());
				}

				if (!imports.get(source).has(path)) {
					imports.get(source).set(path, []);
				}

				if (imports.get(source).get(path).indexOf(classname) === -1) {
					imports.get(source).get(path).push(classname);
				}
			}
		} else {
			console.warn(`Unable to add import ${target.$ref} to ${source}!`);
		}
	}

	if (specification instanceof Object) {
		const schemas = specification.components && specification.components.schemas;

		if (schemas instanceof Object) {
			const writers = new Map<string, Writer>();
			const imports = new Map<string, Map<string, string[]>>();

			Object.keys(schemas).forEach((name) => {
				const parts = name.split('.');
				const classname = parts.pop();
				const path = parts.join('/').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
				const writer = writers.get(path) || new Writer();

				if (!writers.has(path)) {
					writers.set(path, writer);
				}

				let schema = schemas[name];

				if (isReference(schema)) {
					schema = resolveReference<Schema>(schema);
				}

				if (schema !== null && !isReference(schema)) {
					console.info(`Processing ${classname}...`);

					if (schema['x-enum-values'] instanceof Array) {
						if (schema.description !== undefined) {
							writer.writeDocComment(schema.description);
						}

						writer.writeLine(`export enum ${classname} {`);
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

						writer.writeLine(`export interface ${classname} {`);
						writer.indent();

						Object.keys(properties).forEach((propertyName) => {
							console.info(`Processing property ${propertyName}...`);

							const property: Schema | Reference = properties[propertyName];
							const propertySchema = isReference(property) ? resolveReference<Schema>(property) : property;

							if (propertySchema !== null) {
								if (!isReference(property) && propertySchema.description !== undefined) {
									writer.writeDocComment(propertySchema.description);
								}

								writer.writeLine(`${propertyName}${propertySchema.nullable ? '?:' : ':'} ${resolveType(property, (reference) => addImport(imports, path, reference))};`);
							} else {
								console.warn(`Unable to resolve reference!`);
							}
						});

						writer.unindent();
						writer.writeLine('}');
						writer.writeBlankLine();
					}
				}
			});

			if (existsSync(out)) {
				unlinkSync(out);
			}

			writers.forEach((writer, path) => {
				const isFile = Array.from(writers.keys()).every((p) => (p === path || !p.startsWith(path)));
				const filename = `${out}/${path}${isFile ? '' : '/index'}.ts`;
				const directory = dirname(filename);

				directory.split('/').reduce((parent, child) => {
					const currentDirectory = `${parent}/${child}`;

					if (!existsSync(currentDirectory)) {
						mkdirSync(currentDirectory);
					}

					return currentDirectory;
				});

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

				if (imports.has(path)) {
					let text = '';

					Array.from(imports.get(path).entries()).map((value) => {
						let relativePath = relative(`${directory}`, `${out}/${value[0]}`);

						relativePath = relativePath.replace(/\\/g, '/');

						if (!relativePath.startsWith('..')) {
							relativePath = `./${relativePath}`;
						}

						if (relativePath.endsWith('.')) {
							relativePath += '/';
						}

						value[0] = relativePath;

						return value;
					}).sort((a, b) => {
						return sort(a[0], b[0]);
					}).forEach((sortedImport) => {
						text += `import {${sortedImport[1].sort(sort).join(', ')}} from '${sortedImport[0]}';\n`;
					});

					writer.prepend(`${text}`);
				}

				writeFileSync(filename, writer.getOutput());
			});

		} else {
			throw new Error('Malformed API definition!');
		}
	}
}).catch((error: Error) => {
	console.error(`Unable to process API definition: ${error.name} (${error.message})`);
});
