import { colors } from '../colors';
import Input, { InputTypes } from '../input';
import * as React from 'react';
import { getSpace, Size } from '../space';
import styled from 'styled-components';

export interface PreviewTileProps {
	editable: boolean;
	focused: boolean;
	id?: string;
	name: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDoubleClick?: React.MouseEventHandler<HTMLElement>;
	value: string;
}

interface StyledPreviewTileProps {
	focused: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledPreview = styled.section`
	width: 245px;
	text-align: center;
`;

const StyledPreviewTile = styled.div`
	box-sizing: border-box;
	width: inherit;
	height: 340px;
	border: 4px solid;
	border-color: ${(props: StyledPreviewTileProps) =>
		props.focused ? colors.blue40.toString() : 'transparent'};
	border-radius: 5px;
	box-shadow: 0 3px 12px ${colors.blackAlpha13.toString()};
	background-color: ${colors.white.toString()};
	cursor: pointer;
`;

const StyledTitle = styled.strong`
	display: inline-block;
	margin-bottom: ${getSpace(Size.S)}px;
	font-size: 12px;
	font-weight: normal;
	cursor: pointer;
`;

const StyledEditableTitle = styled(Input)`
	display: inline-block;
	margin-bottom: ${getSpace(Size.S)}px;
	font-size: 12px;
	font-weight: normal;
	text-align: center;
	::placeholder {
		color: ${colors.grey60.toString()};
	}
	:hover {
		::placeholder {
			color: ${colors.grey60.toString()};
		}
	}
`;

export const PreviewTile: React.StatelessComponent<PreviewTileProps> = (props): JSX.Element => (
	<StyledPreview>
		{props.editable ? (
			<StyledEditableTitle
				data-title-id={props.id}
				focused={props.focused}
				handleChange={props.onChange}
				type={InputTypes.string}
				value={props.value}
			>
				{props.name}
			</StyledEditableTitle>
		) : (
			<StyledTitle onDoubleClick={props.onDoubleClick}>{props.name}</StyledTitle>
		)}
		<StyledPreviewTile onClick={props.onClick} focused={props.focused} />
	</StyledPreview>
);
