export enum LineEnding {
	CRLF = '\r\n',
	CR = '\r',
	LF = '\n',
}

export enum Indentation {
	TAB = '\t',
	SPACE = '\x20',
}

export interface WriterOptions {
	lineEnding?: LineEnding;
	indentation?: Indentation;
	indentationWidth?: number;
	trailingNewline?: boolean;
	noTrailingWhitespace?: boolean;
}

export class Writer {
	private output: string = '';
	private lineEnding: LineEnding = LineEnding.CRLF;
	private indentation: Indentation = Indentation.TAB;
	private indentationLevel: number = 0;
	private indentationWidth: number = 4;
	private trailingNewline: boolean = true;
	private noTrailingWhitespace: boolean = true;

	constructor(options: WriterOptions = {}) {
		if (options.lineEnding !== undefined) {
			this.lineEnding = options.lineEnding;
		}

		if (options.indentation !== undefined) {
			this.indentation = options.indentation;
		}

		if (options.indentationWidth !== undefined) {
			this.indentationWidth = options.indentationWidth;
		}

		if (options.trailingNewline !== undefined) {
			this.trailingNewline = options.trailingNewline;
		}

		if (options.noTrailingWhitespace !== undefined) {
			this.noTrailingWhitespace = options.noTrailingWhitespace;
		}
	}

	public clear() {
		this.output = '';
	}

	public getOutput(): string {
		let output = this.output.trim();

		if (this.trailingNewline) {
			output += this.lineEnding.repeat(1);
		}

		return output;
	}

	public indent() {
		this.indentationLevel++;
	}

	public unindent() {
		this.indentationLevel = Math.max(this.indentationLevel - 1, 0);
	}

	public writeLine(line: string) {
		let content = line.replace(/\r?\n/g, '');
		let indent = this.indentation.repeat(this.indentationLevel);

		if (this.indentation !== Indentation.TAB) {
			indent = indent.repeat(this.indentationWidth);
		}

		if (this.noTrailingWhitespace) {
			content = content.replace(/\s+$/, '');
		}

		this.output += `${indent}${content}${this.lineEnding}`;
	}

	public writeBlankLine(count: number = 1) {
		for (let i = 0; i < count; i++) {
			this.output += this.lineEnding;
		}
	}

	public write(text: string | string[]) {
		const lines = (text instanceof Array ? text : text.split(/\r?\n/));

		lines.forEach((line) => {
			this.writeLine(line);
		});
	}

	public writeComment(comment: string | string[]) {
		const lines = (comment instanceof Array ? comment : comment.split(/\r?\n/));

		lines.forEach((line) => {
			this.writeLine(`// ${line}`);
		});
	}

	public writeBlockComment(comment: string | string[]) {
		const lines = (comment instanceof Array ? comment : comment.split(/\r?\n/));

		this.writeLine('/*');
		lines.forEach((line) => {
			this.writeLine(` * ${line}`);
		});
		this.writeLine(' */');
	}

	public writeDocComment(doc: string | string[]) {
		const lines = (doc instanceof Array ? doc : doc.split(/\r?\n/));

		this.writeLine('/**');
		lines.forEach((line) => {
			this.writeLine(` * ${line}`);
		});
		this.writeLine(' */');
	}

	public prepend(text: string | string[]) {
		const lines = (text instanceof Array ? text : text.split(/\r?\n/)).reverse();

		lines.forEach((line) => {
			this.output = `${line}${this.lineEnding}${this.output}`;
		});
	}
}
