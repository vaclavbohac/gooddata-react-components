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
import { AreaChart as CoreAreaChart } from '../core/AreaChart';
import { generateDefaultDimensions } from './afmHelper';

/**
 * AFM AreaChart
 * is an internal component that accepts afm, resultSpec
 * @internal
 */
export const AreaChart = dataSourceProvider<ICommonChartProps>(CoreAreaChart, generateDefaultDimensions, 'AreaChart');
