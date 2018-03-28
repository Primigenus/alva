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
		this.onClick = this.onClick.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}
	public onClick(): void {
		this.onFocus();
	}
	public onFocus(): void {
		this.focused = !this.focused;
	}
}
