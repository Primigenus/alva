// import * as MobX from 'mobx';
import * as React from 'react';

import { observer } from 'mobx-react';
import { PageList } from '../composite/page-list';
import { PageRef } from '../../store/page/page-ref';
import { PageViewModel } from '../view-model/page-view-model';
import { Project } from '../../store/project';
import { Store } from '../../store/store';

@observer
export class PageListContainer extends React.Component<{}> {
	protected generatePageViewModel(): PageViewModel[] {
		const project: Project | undefined = Store.getInstance().getCurrentProject();
		const projectPages: PageRef[] = project ? project.getPages() : [];
		return projectPages.map(page => new PageViewModel(page));
	}

	public render(): JSX.Element {
		return <PageList pages={this.generatePageViewModel()} />;
	}
}
