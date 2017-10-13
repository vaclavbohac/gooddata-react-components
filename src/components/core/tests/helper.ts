import { Execution } from '@gooddata/typings';
import { IChartProps } from '../base/BaseChart';
import { IDataSource } from '../../../interfaces/DataSource';

// TODO copy and paste from BaseChart.spec file
const emptyResponse: Execution.IError = {
    code: 204
};

export function getComponentProps(): IChartProps {
    const dataSource: IDataSource = {
        getData: () => Promise.resolve(emptyResponse),
        getAfm: () => ({}),
        getFingerprint: () => '{}'
    };
    return {
        dataSource
    };
}
