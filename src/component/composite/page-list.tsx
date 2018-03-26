import * as React from 'react';

import Layout from '../../lsg/patterns/layout';
import Space, { Size } from '../../lsg/patterns/space';

import { PreviewTile } from '../../lsg/patterns/preview-tile';
import { PageRef } from '../../store/project/page-ref';

export interface PageListProps {
	activePage: string;
	activeTitle: string;
	editable: boolean;
	focused: boolean;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	pages: PageRef[];
	onEdit: any;
	onFocus: any;
	value: string;
}

export const PageList: React.StatelessComponent<PageListProps> = (props): JSX.Element => (
	<Layout>
		{props.pages.map((page: PageRef, i: number) => {
			let focused = false;
			let editable = false;
			if (page.getId() === props.activePage) {
				focused = props.onFocus();
			}
			if (page.getId() === props.activeTitle) {
				editable = props.onEdit();
			}
			return (
				<Space key={i} size={Size.S}>
					<PreviewTile
						id={page.getId()}
						editable={editable}
						focused={focused}
						handleChange={props.handleChange}
						name={page.getName()}
						value={props.value}
					/>
				</Space>
			);
		})}
	</Layout>
);
