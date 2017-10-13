import {
    dataSourceProvider,
    IDataSourceProviderProps
} from './DataSourceProvider';

export {
    IDataSourceProviderProps
};

import { Table as coreTable } from '../core/Table';

export const Table = dataSourceProvider(coreTable);
