// (C) 2007-2018 GoodData Corporation
import * as React from 'react';
import { noop, pick } from 'lodash';
import { AFM, Execution } from '@gooddata/typings';

import { TableHeader, TableRow, ISortInfo } from './interfaces/data';

import { ITableProps, Table } from './Table';

import { getHeaders, getRows, validateTableProportions, getTotalsWithData } from './utils/dataTransformation';
import { getSortInfo, getSortItem } from './utils/sort';

import { IIndexedTotalItem, ITotalWithData } from '../../../interfaces/Totals';
import { IDrillableItem } from '../../../interfaces/DrillEvents';

export interface ITableTransformationProps {
    afterRender?: Function;
    totals?: IIndexedTotalItem[]; // TODO or ITotalWithData[] ?
    totalsEditAllowed?: boolean;
    onTotalsEdit?: (indexedTotals: IIndexedTotalItem[]) => void;
    config?: {}; // TODO
    drillableItems?: IDrillableItem[];
    executionRequest: AFM.IExecution;
    executionResponse: Execution.IExecutionResponse;
    executionResult: Execution.IExecutionResult;
    height?: number;
    maxHeight?: number;
    onFiredDrillEvent?: Function;
    onSortChange?: (sortItem: AFM.SortItem) => void;
    tableRenderer?: (props: ITableProps) => JSX.Element;
    width?: number;
    lastAddedTotalType?: AFM.TotalType;
    onLastAddedTotalRowHighlightPeriodEnd?: () => void;
}

function renderDefaultTable(props: ITableProps): JSX.Element {
    return <Table {...props} />;
}

export class TableTransformation extends React.Component<ITableTransformationProps> {
    public static defaultProps: Partial<ITableTransformationProps> = {
        afterRender: noop,
        totals: [],
        onTotalsEdit: noop,
        config: {},
        drillableItems: [],
        onFiredDrillEvent: noop,
        onSortChange: noop,
        tableRenderer: renderDefaultTable,
        onLastAddedTotalRowHighlightPeriodEnd: noop
    };

    public render(): JSX.Element {
        const {
            config,
            drillableItems,
            executionRequest,
            executionResponse,
            executionResult,
            height,
            maxHeight,
            onFiredDrillEvent,
            onSortChange,
            width,
            totals,
            totalsEditAllowed,
            onTotalsEdit,
            afterRender,
            lastAddedTotalType,
            onLastAddedTotalRowHighlightPeriodEnd
        } = this.props;

        const headers: TableHeader[] = getHeaders(executionResponse);
        const rows: TableRow[] = getRows(executionResult);
        const totalsWithData: ITotalWithData[] = getTotalsWithData(totals, executionResult);

        validateTableProportions(headers, rows);

        const sortItem = getSortItem(executionRequest);

        const EMPTY_SORT_INFO: ISortInfo =  { sortBy: undefined, sortDir: undefined };
        const { sortBy, sortDir } = sortItem ? getSortInfo(sortItem, headers) : EMPTY_SORT_INFO;

        const tableProps: ITableProps = { // TODO add type
            ...pick(config, ['rowsPerPage', 'onMore', 'onLess', 'sortInTooltip', 'stickyHeaderOffset']),
            afterRender,
            totalsWithData,
            totalsEditAllowed,
            onTotalsEdit,
            drillableItems,
            executionRequest,
            headers,
            onFiredDrillEvent,
            onSortChange,
            rows,
            sortBy,
            sortDir,
            lastAddedTotalType,
            onLastAddedTotalRowHighlightPeriodEnd
        };

        if (height) {
            tableProps.containerHeight = height;
        }

        if (maxHeight) {
            tableProps.containerMaxHeight = maxHeight;
        }

        if (width) {
            tableProps.containerWidth = width;
        }

        return this.props.tableRenderer(tableProps);
    }
}
