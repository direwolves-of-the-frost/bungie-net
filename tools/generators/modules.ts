import {existsSync, mkdirSync, writeFileSync} from 'fs';
import * as request from 'request-promise-native';
import * as rimraf from 'rimraf';
import * as OpenAPI from './utils/open-api';
import {Writer} from './utils/writer';

const out = './src/modules';

interface Endpoint {
	path: string;
	item: OpenAPI.PathItem;
}

request('https://raw.githubusercontent.com/Bungie-net/api/master/openapi.json', {
	json: true,
}).then((specification: OpenAPI.Specification) => {
	const paths = specification && specification.paths;

	if (paths !== undefined) {
		const modules = new Map<string, Map<string, Endpoint>>();

		Object.keys(paths).forEach((path) => {
			if (!OpenAPI.isExtensionKey(path)) {
				const item: OpenAPI.PathItem = paths[path];
				const [name, endpoint] = (item.summary ? item.summary.split('.') : [undefined, undefined]);

				if (name !== undefined && endpoint !== undefined) {
					if (!modules.has(name)) {
						console.log(`Creating module ${name}...`);
						modules.set(name, new Map());
					}

					console.log(`Creating endpoint ${endpoint}...`);
					modules.get(name).set(endpoint, {
						path,
						item,
					});
				} else {
					console.warn(`Unable to parse ${path}!`);
				}
			}
		});

		if (existsSync(out)) {
			rimraf.sync(out);
		}

		out.split('/').reduce((parent, child) => {
			const currentDirectory = `${parent}/${child}`;

			if (!existsSync(currentDirectory)) {
				mkdirSync(currentDirectory);
			}

			return currentDirectory;
		});

		function pascal(name: string) {
			return name.charAt(0).toUpperCase() + name.slice(1);
		}

		for (const [name, endpoints] of modules.entries()) {
			console.log(`Parsing module ${name}...`);

			const importPrefix = '#/components/';
			const filename = `${out}/${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}.ts`;
			const writer = new Writer();
			const imports: Map<string, string[]> = new Map([
				['../module', ['Module']],
			]);

			function addImport(reference: OpenAPI.Reference) {
				if (reference.$ref.startsWith(importPrefix)) {
					const parts = reference.$ref.substr(importPrefix.length).replace(/\./g, '/').match(/^(.*)\/([a-zA-Z0-9]+)$/).slice(1);
					const importPath = `../${parts.shift().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
					const importName = pascal(parts.shift());

					if (!imports.has(importPath)) {
						imports.set(importPath, []);
					}

					if (imports.get(importPath).indexOf(importName) === -1) {
						imports.get(importPath).push(importName);
					}
				} else {
					console.warn(`Unable to import ${reference.$ref}.`);
				}
			}

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

			writer.writeLine(`export class ${name} extends Module {`);
			writer.indent();

			const classWriter = new Writer();

			for (const [endpoint, data] of endpoints.entries()) {
				console.log(`Parsing endpoint ${endpoint}...`);

				const item = data.item;
				const info = item.get || item.post || item.put;

				if (info !== undefined) {
					let responses = info.responses;

					if (OpenAPI.isReference(responses)) {
						addImport(responses);
						responses = OpenAPI.resolveReference<OpenAPI.Responses>(specification, responses);
					}

					const response = (responses ? (responses[200] || responses.default) : undefined);

					if (response !== undefined) {
						const path = data.path.replace(/^\/|\/$/g, '').replace(/(\{[a-zA-Z0-9]+\})/g, '$$$1');
						const method = (item.get ? 'get' : (item.post ? 'post' : (item.put ? 'put' : undefined)));
						const returnType = pascal(OpenAPI.resolveType(specification, response, addImport));
						const parameters = info.parameters || item.parameters;
						const signature: string[] = [];
						const params: string[] = [];

						let documentation = (item.description ? `${item.description}\n\n` : '');

						if (Array.isArray(parameters)) {
							parameters.map((parameter) => {
								if (OpenAPI.isReference(parameter)) {
									addImport(parameter);
									return OpenAPI.resolveReference<OpenAPI.Parameter>(specification, parameter);
								}

								return parameter;
							}).sort((a, b) => {
								if (a.required && !b.required) {
									return -1;
								} else if (!a.required && b.required) {
									return 1;
								}

								return parameters.indexOf(a) - parameters.indexOf(b);
							}).forEach((parameter) => {
								const type = OpenAPI.resolveType(specification, parameter.schema, addImport);

								if (parameter.in !== 'path' || path.indexOf(`\${${parameter.name}}`) > -1) {
									if (parameter.in === 'query') {
										params.push(parameter.name);
									}

									signature.push(`${parameter.name}${parameter.required ? ':' : '?:'} ${type}`);
									documentation += `@param {${type}} ${parameter.required ? parameter.name : `[${parameter.name}]`}\n`;
								} else {
									console.warn(`Parameter ${parameter.name} was marked as a path variable but did not appear in the path!`);
								}
							});
						}

						documentation += `@returns {Promise<${returnType}>}\n`;
						documentation += `@memberof ${name}`;

						classWriter.writeDocComment(documentation);
						classWriter.writeLine(`public ${endpoint}(${signature.join(', ')}): Promise<${returnType}> {`);
						classWriter.indent();
						classWriter.writeLine(`return this.client.${method}(\`${path}\`${params.length > 0 ? `, { ${params.join(', ')} }` : ''});`);
						classWriter.unindent();
						classWriter.writeLine(`}`);
						classWriter.writeBlankLine();
					} else {
						console.warn('Unable to parse response information.');
					}
				} else {
					console.warn('Unable to parse endpoint information.');
				}
			}

			writer.write(classWriter.getOutput().replace(/\r?\n$/, ''));
			writer.unindent();
			writer.writeLine(`}`);

			const output = new Writer();

			Array.from(imports.entries()).sort((a, b) => {
				return sort(a[0], b[0]);
			}).forEach((value) => {
				output.writeLine(`import {${value[1].sort(sort).join(', ')}} from '${value[0]}';`);
			});

			output.writeBlankLine();
			output.write(writer.getOutput());

			console.log(`Writing ${filename}...`);
			writeFileSync(filename, output.getOutput());
		}
	} else {
		throw new Error('Malformed API definition!');
	}
}).catch((error: Error) => {
	console.error(`Unable to process API definition: ${error.name} (${error.message})`);
});
