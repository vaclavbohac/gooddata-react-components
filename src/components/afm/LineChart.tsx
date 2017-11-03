import { AFM } from '@gooddata/typings';
import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { LineChart as coreLineChart } from '../core/LineChart';

function generateDefaultDimensions(afm: AFM.IAfm): AFM.IDimension[] {
    return [
        {
            name: 'x',
            itemIdentifiers: (afm.attributes || []).map(a => a.localIdentifier)
        },
        {
            name: 'y',
            itemIdentifiers: ['measureGroup']
        }
    ];
}

export const LineChart = dataSourceProvider<ICommonChartProps>(coreLineChart, generateDefaultDimensions);
