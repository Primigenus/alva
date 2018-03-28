import * as React from 'react';

import Layout from '../../lsg/patterns/layout';
import { observer } from 'mobx-react';
import { PageViewModel } from '../view-model/page-view-model';
import { PreviewTile } from '../../lsg/patterns/preview-tile';
import Space, { Size } from '../../lsg/patterns/space';

export interface PageListProps {
	pages: PageViewModel[];
}

@observer
export class PageList extends React.Component<PageListProps> {
	public render(): JSX.Element {
		return (
			<Layout>
				{this.props.pages.map((page: PageViewModel, i: number) => {
					console.log(page.handleDoubleClick, 'the page');
					return (
						<Space key={i} size={Size.S}>
							<PreviewTile
								id={page.page.getId()}
								editable={page.editable}
								focused={page.focused}
								onChange={e => page.handleChange(e)}
								name={page.name}
								onClick={e => page.handleClick(e)}
								onDoubleClick={e => page.handleDoubleClick(e)}
								value={page.name}
							/>
						</Space>
					);
				})}
			</Layout>
		);
	}
}
