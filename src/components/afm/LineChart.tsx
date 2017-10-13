import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { LineChart as coreLineChart } from '../core/LineChart';

export const LineChart = dataSourceProvider<ICommonChartProps>(coreLineChart);
