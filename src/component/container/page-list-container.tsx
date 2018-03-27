import * as MobX from 'mobx';
import * as React from 'react';

import { observer } from 'mobx-react';
import { PageList } from '../composite/page-list';
import { PageRef } from '../../store/project/page-ref';
import { Project } from '../../store/project/project';

import { Store } from '../../store/store';

export interface PageListContainerProps {
	store: Store;
}

export interface PageStateProps {
	focused: boolean;
	id: string;
	name: string;
}

@observer
export class PageListContainer extends React.Component<PageListContainerProps> {
	@MobX.observable protected activePage: string = '';
	@MobX.observable protected activeTitle: string = '';
	@MobX.observable protected editablePage: boolean = false;
	@MobX.observable protected focusedPage: boolean = false;
	@MobX.observable protected pageNameInputValue: string = '';

	@MobX.observable protected pageStates: PageStateProps[];

	public componentWillMount(): void {
		this.getProjectPages().map(page => {
			console.log(this.pageStates);
		});
	}

	protected getActivePage(target: HTMLElement, name: string): string | void {
		const ids: string[] = this.getProjectPages().map(page => page.getId());
		const data = target.dataset;
		ids.forEach((id: string) => {
			if (id === data[name]) {
				if (Object.keys(data)[0] === 'id') {
					return (this.activePage = data[name] || '');
				}
				if (Object.keys(data)[0] === 'titleId') {
					return (this.activeTitle = data[name] || '');
				}
			}
			return '';
		});
	}

	protected getInputValueName(value: string): void {
		console.log(value);
	}

	protected getProjectPages(): PageRef[] {
		const project: Project | undefined = this.props.store.getCurrentProject();
		return project ? project.getPages() : [];
	}

	protected handleClick(e: React.MouseEvent<HTMLElement>): void {
		e.preventDefault();
		// this.getActivePage(e.target as HTMLElement, 'id');
		// this.getActivePage(e.target as HTMLElement, 'titleId');
		console.log(e.target, 'new ********');
		this.toggleFocus();
	}

	protected handleDoubleClick(e: React.MouseEvent<HTMLElement>): void {
		e.preventDefault();
		this.getActivePage(e.target as HTMLElement, 'titleId');
	}

	@MobX.action
	protected handleEditMode(): boolean {
		return (this.editablePage = !this.editablePage);
	}

	protected handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		this.getInputValueName(e.target.value);
	}

	public render(): JSX.Element {
		return (
			<div onDoubleClick={e => this.handleDoubleClick(e)}>
				<PageList
					activePage={this.activePage}
					activeTitle={this.activeTitle}
					editable={this.editablePage}
					focused={this.focusedPage}
					handleChange={this.handleInputChange}
					handleClick={e => this.handleClick(e)}
					onEdit={() => this.handleEditMode}
					pages={this.getProjectPages()}
					value={this.pageNameInputValue}
				/>
			</div>
		);
	}

	@MobX.action
	protected toggleFocus(): void {
		this.focusedPage = !this.focusedPage;
	}
}
