import * as React from 'react';

import Layout from '../../lsg/patterns/layout';
import { PageRef } from '../../store/page/page-ref';
import { PreviewTile } from '../../lsg/patterns/preview-tile';
import Space, { Size } from '../../lsg/patterns/space';

export interface PageListProps {
	activePage: string;
	activeTitle: string;
	editable: boolean;
	focused: boolean;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	pages: PageRef[];
	value: string;
	handleClick(e: React.MouseEvent<HTMLElement>): void;
	onEdit(): void;
}

export const PageList: React.StatelessComponent<PageListProps> = (props): JSX.Element => (
	<Layout>
		{props.pages.map((page: PageRef, i: number) => {
			if (page.getId() === props.activePage) {
				// console.log(props.onFocus());
			}
			if (page.getId() === props.activeTitle) {
				props.onEdit();
			}

			console.log(props, 'this are the props');
			return (
				<Space key={i} size={Size.S}>
					<PreviewTile
						id={page.getId()}
						editable={false}
						focused={props.focused}
						handleChange={props.handleChange}
						name={page.getName()}
						onClick={e => props.handleClick(e)}
						value={props.value}
					/>
				</Space>
			);
		})}
	</Layout>
);
