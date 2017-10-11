export type ExtensionKey = string;
export type Extension = null | string | boolean | number | any | any[];
export type Url = string;

export function isExtension(value: string): value is ExtensionKey {
	return value.match(/^x-/) !== null;
}

export function isUrl(value: string): value is Url {
	return value.match(/^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/) !== null;
}

export interface OpenAPI {
	openapi: string;
	info: Info;
	server?: Server[];
	paths: Paths;
	components?: Components;
	security?: SecurityRequirement;
	tags?: Tag[];
	externalDocs?: ExternalDocumentation;
	[field: string]: Extension;
}

export interface Info {
	title: string;
	description?: string;
	termOfServices?: string;
	contact?: Contact;
	license?: License;
	version: string;
	[field: string]: Extension;
}

export interface Contact {
	name?: string;
	url?: Url;
	email?: string;
	[field: string]: Extension;
}

export interface License {
	name: string;
	url?: Url;
	[field: string]: Extension;
}

export interface Server {
	url?: Url;
	description?: string;
	variables?: {[variable: string]: ServerVariable};
	[field: string]: Extension;
}

export interface ServerVariable {
	enum?: string[];
	default: string;
	description?: string;
	[field: string]: Extension;
}

export interface Components {
	schemas?: {[schema: string]: Schema | Reference};
	responses?: {[response: string]: Response | Reference};
	parameters?: {[parameter: string]: Parameter | Reference};
	examples?: {[example: string]: Example | Reference};
	requestBodies?: {[requestBody: string]: RequestBody | Reference};
	headers?: {[header: string]: Header | Reference};
	securitySchemes?: {[securityScheme: string]: SecurityScheme | Reference};
	links?: {[link: string]: Link | Reference};
	callback?: {[callback: string]: Callback | Reference};
	[field: string]: Extension;
}

export interface Paths {
	[field: string]: PathItem | Extension;
}

export interface PathItem {
	$ref?: string;
	summary?: string;
	description?: string;
	get?: Operation;
	put?: Operation;
	post?: Operation;
	delete?: Operation;
	options?: Operation;
	head?: Operation;
	patch?: Operation;
	trace?: Operation;
	servers?: Server[];
	parameters?: Parameter[] | Reference;
	[field: string]: Extension;
}

export interface Operation {
	tags?: string[];
	summary?: string;
	description?: string;
	externalDocs?: ExternalDocumentation;
	operationId?: string;
	parameters?: Parameter[] | Reference;
	requestBody?: RequestBody | Reference;
	responses: Responses | Reference;
	callbacks?: {[callback: string]: Callback | Reference};
	deprecated?: boolean;
	security?: SecurityRequirement;
	servers?: Server[];
	[field: string]: Extension;
}

export interface ExternalDocumentation {
	description?: string;
	url: Url;
	[field: string]: Extension;
}

export interface Parameter {
	name: string;
	in: 'query' | 'header' | 'path' | 'cookie';
	description?: string;
	required: boolean;
	deprecated?: boolean;
	allowEmptyValue?: boolean;
	style?: 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
	explode?: boolean;
	allowReserved?: boolean;
	schema?: Schema | Reference;
	example?: any;
	examples?: {[example: string]: Example | Reference};
	content?: {[type: string]: MediaType};
	[field: string]: Extension;
}

export interface RequestBody {
	description?: string;
	content: {[type: string]: MediaType};
	required?: boolean;
	[field: string]: Extension;
}

export interface MediaType {
	schema?: Schema | Reference;
	example?: any;
	examples?: {[example: string]: Example | Reference};
	encoding?: {[encoding: string]: Encoding};
	[field: string]: Extension;
}

export interface Encoding {
	contentType?: string;
	headers?: {[example: string]: Header | Reference};
	style?: 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
	explode?: boolean;
	allowReserved?: boolean;
	[field: string]: Extension;
}

export interface Responses {
	default?: Response | Reference;
	[field: number]: Response | Reference;
	[field: string]: Extension;
}

export interface Response {
	description: string;
	headers?: {[example: string]: Header | Reference};
	content?: {[type: string]: MediaType};
	links?: {[link: string]: Link | Reference};
	[field: string]: Extension;
}

export interface Callback {
	[field: string]: PathItem | Extension;
}

export interface Example {
	summary?: string;
	description?: string;
	value?: any;
	externalValue?: Url;
	[field: string]: Extension;
}

export interface Link {
	operationRef?: string;
	operationId?: string;
	parameters?: {[parameter: string]: string | any};
	requestBody?: string | any;
	description?: string;
	server?: Server;
	[field: string]: Extension;
}

export interface Header {
	description?: string;
	required: boolean;
	deprecated?: boolean;
	allowEmptyValue?: boolean;
	style?: 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject';
	explode?: boolean;
	allowReserved?: boolean;
	schema?: Schema | Reference;
	example?: any;
	examples?: {[example: string]: Example | Reference};
	content?: {[type: string]: MediaType};
	[field: string]: Extension;
}

export interface Tag {
	name: string;
	description?: string;
	externalDocs?: ExternalDocumentation;
	[field: string]: Extension;
}

export type Examples = any;

export interface Reference {
	$ref: string;
}

export function isReference(value: any): value is Reference {
	return value instanceof Object && value.$ref !== undefined;
}

export interface Schema {
	title?: string;
	multipleOf?: number;
	maximum?: number;
	exclusiveMaximum?: number;
	minimum?: number;
	exclusiveMinimum?: number;
	maxLength?: number;
	minLength?: number;
	pattern?: string;
	maxItems?: number;
	minItems?: number;
	uniqueItems?: boolean;
	maxProperties?: number;
	minProperties?: number;
	required?: string[];
	enum?: any[];
	type?: string;
	allOf?: Schema | Reference | any;
	oneOf?: Schema | Reference | any;
	anyOf?: Schema | Reference | any;
	not?: Schema | Reference;
	items?: any;
	properties?: Schema | Reference | any;
	additionalProperties?: Schema | Reference | any | boolean;
	description?: string;
	format?: string;
	default?: any;
	nullable?: boolean;
	discriminator?: Discriminator;
	readOnly?: boolean;
	writeOnly?: boolean;
	xml?: XML;
	externalDocs?: ExternalDocumentation;
	example?: any;
	deprecated?: boolean;
	[field: string]: Extension;
}

export interface Discriminator {
	propertyName: string;
	mapping?: {[mapping: string]: string};
}

export interface XML {
	name?: string;
	namespace?: string;
	prefix?: string;
	attribute?: string;
	wrapped?: boolean;
	[field: string]: Extension;
}

export interface SecurityScheme {
	type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
	description?: string;
	name?: string;
	in?: 'query' | 'header' | 'cookie';
	scheme?: string;
	bearerFormat?: string;
	flows?: OAuthFlows;
	openIdConnectUrl?: string;
	[field: string]: Extension;
}

export interface OAuthFlows {
	implicit?: OAuthFlow;
	password?: OAuthFlow;
	clientCredentials?: OAuthFlow;
	authorizationCode?: OAuthFlow;
	[field: string]: Extension;
}

export interface OAuthFlow {
	authorizationUrl?: string;
	tokenUrl?: string;
	refreshUrl?: string;
	scopes?: {[scope: string]: string};
	[field: string]: Extension;
}

export interface SecurityRequirement {
	[field: string]: string[];
}
