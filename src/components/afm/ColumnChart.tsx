import { AFM } from '@gooddata/typings';
import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { ICommonChartProps } from '../core/base/BaseChart';
import { ColumnChart as coreColumnChart } from '../core/ColumnChart';

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

export const ColumnChart = dataSourceProvider<ICommonChartProps>(coreColumnChart, generateDefaultDimensions);
