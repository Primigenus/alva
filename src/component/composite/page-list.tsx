import * as React from 'react';

import Layout from '../../lsg/patterns/layout';
import Space, { Size } from '../../lsg/patterns/space';

import { PreviewTile } from '../../lsg/patterns/preview-tile';
import { PageRef } from '../../store/project/page-ref';

export interface PageListProps {
	activeId: string;
	editable: boolean;
	focused: boolean;
	pages: PageRef[];
	onEdit: any;
	onFocus: any;
}

export const PageList: React.StatelessComponent<PageListProps> = (props): JSX.Element => (
	<Layout>
		{props.pages.map((page: PageRef, i: number) => {
			let focused = false;
			let editable = false;
			if (page.getId() === props.activeId) {
				focused = props.onFocus();
			}
			return (
				<Space key={i} size={Size.S}>
					<PreviewTile
						id={page.getId()}
						editable={editable}
						focused={focused}
						name={page.getName()}
						value={'placeholder'}
					/>
				</Space>
			);
		})}
	</Layout>
);
