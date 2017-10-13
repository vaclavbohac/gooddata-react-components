import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { ColumnChart as coreColumnChart } from '../core/ColumnChart';

export const ColumnChart = dataSourceProvider<ICommonChartProps>(coreColumnChart);
