import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {dirname} from 'path';
import * as request from 'request-promise-native';
import * as rimraf from 'rimraf';
import {Namespace} from './utils/namespace';
import * as OpenAPI from './utils/open-api';

const out = './src/schemas';

request('https://raw.githubusercontent.com/Bungie-net/api/master/openapi.json', {
	json: true,
}).then((specification: OpenAPI.Specification) => {
	const schemas = specification && specification.components && specification.components.schemas;

	if (schemas instanceof Object) {
		const namespaces = new Namespace('', specification);

		Object.keys(schemas).forEach((namespace) => {
			namespaces.add(namespace);
		});

		function write(namespace: Namespace) {
			const hasNamespaces = namespace.hasNamespaces();
			const path = Namespace.getPath(`${namespace.path}${hasNamespaces ? `.index` : ''}`);
			const filename = `${out}/${path}.ts`;
			const directory = dirname(filename);

			console.log(`Writing ${filename}...`);

			directory.split('/').reduce((parent, child) => {
				const currentDirectory = `${parent}/${child}`;

				if (!existsSync(currentDirectory)) {
					mkdirSync(currentDirectory);
				}

				return currentDirectory;
			});

			writeFileSync(filename, namespace.getOutput());

			if (hasNamespaces) {
				namespace.forEach((child) => {
					if (typeof child !== 'string') {
						write(child);
					}
				});
			}
		}

		if (existsSync(out)) {
			rimraf.sync(out);
		}

		write(namespaces);
	} else {
		throw new Error('Malformed API definition!');
	}
}).catch((error: Error) => {
	console.error(`Unable to process API definition: ${error.name} (${error.message})`);
});
