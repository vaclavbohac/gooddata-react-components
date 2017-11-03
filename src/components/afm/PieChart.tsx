import { AFM } from '@gooddata/typings';
import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { PieChart as corePieChart } from '../core/PieChart';

// TODO pie chart need different dimensions
// TODO tests
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

export const PieChart = dataSourceProvider<ICommonChartProps>(corePieChart, generateDefaultDimensions);
