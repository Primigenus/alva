import { ElementValue } from './element_value';
import { Pattern } from '../pattern';
import { Store } from '..';

export class PageElement {
	private children: PageElement[] = [];
	private patternPath: string;
	private pattern?: Pattern;
	private properties: { [id: string]: ElementValue } = {};

	// tslint:disable-next-line:no-any
	public constructor(json: any, store: Store) {
		this.patternPath = json['pattern'];
		const pattern: Pattern | undefined = store.getPattern(this.patternPath);
		if (pattern) {
			this.pattern = pattern;
		} else {
			console.warn(`Ignoring unknown pattern ${this.patternPath}`);
		}

		if (json.properties) {
			Object.keys(json.properties).forEach((propertyId: string) => {
				// tslint:disable-next-line:no-any
				const value: any = json.properties[propertyId];
				this.properties[propertyId] = this.createElementOrValue(value, store);
			});
		}

		if (json.children) {
			this.children = json.children.map(
				// tslint:disable-next-line:no-any
				(childJson: any) => this.createElementOrValue(childJson, store)
			);
		}
	}

	// tslint:disable-next-line:no-any
	protected createElementOrValue(json: any, store: Store): PageElement | ElementValue {
		return json && json['_type'] === 'pattern' ? new PageElement(json, store) : json;
	}

	public getChildren(): PageElement[] {
		return this.children;
	}

	public getPattern(): Pattern | undefined {
		return this.pattern;
	}

	public getPatternPath(): string {
		return this.patternPath;
	}

	public getProperty(id: string): ElementValue {
		return this.properties[id];
	}
}
