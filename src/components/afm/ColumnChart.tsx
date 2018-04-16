// (C) 2007-2018 GoodData Corporation
import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

import { ComponentClass } from 'react';

export {
    ComponentClass,
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { ColumnChart as CoreColumnChart } from '../core/ColumnChart';
import { generateDefaultDimensions } from './afmHelper';

/**
 * AFM ColumnChart
 * is an internal component that accepts afm, resultSpec
 * @internal
 */
export const ColumnChart = dataSourceProvider<ICommonChartProps>(
    CoreColumnChart, generateDefaultDimensions, 'ColumnChart');
