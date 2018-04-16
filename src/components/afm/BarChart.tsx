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
import { BarChart as CoreBarChart } from '../core/BarChart';
import { generateDefaultDimensions } from './afmHelper';

/**
 * AFM BarChart
 * is an internal component that accepts afm, resultSpec
 * @internal
 */
export const BarChart = dataSourceProvider<ICommonChartProps>(CoreBarChart, generateDefaultDimensions, 'BarChart');
