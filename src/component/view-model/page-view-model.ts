import * as MobX from 'mobx';
import { PageRef } from '../../store/page/page-ref';
export class PageViewModel {
	@MobX.observable public editable: boolean;
	@MobX.observable public focused: boolean;
	@MobX.observable public name: string;
	public readonly page: PageRef;
	public constructor(page: PageRef) {
		this.page = page;
		this.name = page.getName();

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}
	public handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const value = e.currentTarget.value;
		// page set name
		console.log(value, 'this is the handle change');
	}
	public handleClick(e: React.MouseEvent<HTMLElement>): void {
		e.preventDefault();
		this.onFocus();
	}

	public handleDoubleClick(e: React.MouseEvent<HTMLElement>): void {
		e.preventDefault();
		this.editable = !this.editable;
	}
	public onFocus(): void {
		this.focused = !this.focused;
	}
}
