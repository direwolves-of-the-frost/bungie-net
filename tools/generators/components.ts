import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {dirname} from 'path';
import * as request from 'request-promise-native';
import * as rimraf from 'rimraf';
import {Namespace} from './utils/namespace';
import * as OpenAPI from './utils/open-api';

const out = './src';

request('https://raw.githubusercontent.com/Bungie-net/api/master/openapi.json', {
	json: true,
}).then((specification: OpenAPI.Specification) => {
	const namespaces = new Namespace('', specification);
	const schemas = specification && specification.components && specification.components.schemas;
	const responses = specification && specification.components && specification.components.responses;

	if (existsSync(`${out}/schemas`)) {
		rimraf.sync(`${out}/schemas`);
	}

	if (schemas instanceof Object) {
		Object.keys(schemas).forEach((namespace) => {
			namespaces.add(`schemas.${namespace}`);
		});
	}

	if (existsSync(`${out}/responses`)) {
		rimraf.sync(`${out}/responses`);
	}

	if (responses instanceof Object) {
		Object.keys(responses).forEach((namespace) => {
			namespaces.add(`responses.${namespace}`);
		});
	}

	function write(namespace: Namespace) {
		const hasNamespaces = namespace.hasNamespaces();

		if (namespace !== namespaces) {
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
		}

		if (hasNamespaces) {
			namespace.forEach((child) => {
				if (typeof child !== 'string') {
					write(child);
				}
			});
		}
	}

	write(namespaces);
}).catch((error: Error) => {
	console.error(`Unable to process API definition: ${error.name} (${error.message})`);
});
