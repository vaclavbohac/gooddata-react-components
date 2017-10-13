import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { PieChart as corePieChart } from '../core/PieChart';

export const PieChart = dataSourceProvider<ICommonChartProps>(corePieChart);
