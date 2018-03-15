// (C) 2007-2018 GoodData Corporation
// TODO maybe rename this file to 'Table.ts' and move it into src/interfaces

import { AFM, Execution } from '@gooddata/typings';

export interface IAttributeTableHeader {
    uri: string;
    identifier: string;
    localIdentifier: string;
    name: string;
    type: string;
}

export interface IAttributeTableHeaderForDrilling {
    type: 'attrLabel';
    id: string;
    identifier: string;
    uri: string;
    title: string;
}

export interface IMeasureTableHeader {
    uri?: string;
    identifier?: string;
    localIdentifier: string;
    name: string;
    format: string;
    type: string;
}

export interface IMeasureTableHeaderForDrilling {
    type: 'metric';
    id: string;
    identifier: string;
    uri: string;
    title: string;
    format: string;
}

export type TableHeader = IAttributeTableHeader | IMeasureTableHeader;

export function isAttributeTableHeader(header: TableHeader): header is IAttributeTableHeader {
    return header.type === 'attribute';
}

export function isMeasureTableHeader(header: TableHeader): header is IMeasureTableHeader {
    return header.type === 'measure';
}

export type TableHeaderForDrilling = IAttributeTableHeaderForDrilling | IMeasureTableHeaderForDrilling;

export interface IAttributeCell {
    uri: string;
    name: string;
}

export interface IAttributeCellForDrilling {
    id: string;
    name: string;
}

export type MeasureCell = string | null;

export type TableCell = IAttributeCell | MeasureCell;

export type TableCellForDrilling = IAttributeCellForDrilling | MeasureCell;

export type TableRow = TableCell[];

export type TableRowForDrilling = TableCellForDrilling[];

export type Align = 'left' | 'right';

export type SortDir = 'asc' | 'desc';

export interface ISortInfo {
    sortBy: number;
    sortDir: SortDir;
}

export interface IScrollEvent {
    name: string;
    debounce: number;
}

export interface ISortObj {
    dir: SortDir;
    nextDir: SortDir;
    sortDirClass: string;
}

export interface IAlignPoint {
    align: string;
    offset: { x: number, y: number };
}

export interface ITableCellStyle {
    color?: string;
    fontWeight?: React.CSSProperties['fontWeight'];
}

export type TableCellLabel = string;

export interface ITableCellStyledLabel {
    style: ITableCellStyle;
    label: TableCellLabel;
}

export interface IPositions {
    absoluteTop: number;
    defaultTop: number;
    edgeTop: number;
    fixedTop: number;
}

export interface IHeaderTooltipArrowPosition {
    left: string;
}

export interface ITableColumnProperties {
    align: Align;
    index: number;
    width: number;
}

export interface ITableDimensions {
    height: number;
    top?: number;
    bottom?: number;
}

export interface ITotalTypeWithTitle {
    type?: AFM.TotalType;
    title: string;
    role?: string;
}

export interface ITotalsDataSource {
    rowsCount: number;
    getObjectAt: (index: number) => ITotalTypeWithTitle;
}

export function isAttributeCell(cell: TableCell): cell is IAttributeCell {
    return cell && (cell as IAttributeCell).uri !== undefined;
}

// TODO move to @gooddata/typings/src/Execution.d.ts
export function isResultTotalHeaderItem(
    headerItem: Execution.IResultHeaderItem
): headerItem is Execution.IResultTotalHeaderItem {
    return (headerItem as Execution.ITotalHeaderItem).totalHeaderItem !== undefined;
}
