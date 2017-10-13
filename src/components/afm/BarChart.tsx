import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { BarChart as coreBarChart } from '../core/BarChart';

export const BarChart = dataSourceProvider<ICommonChartProps>(coreBarChart);
