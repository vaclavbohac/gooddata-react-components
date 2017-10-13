import * as React from 'react';
import * as numeral from 'numeral';
import get = require('lodash/get');
import noop = require('lodash/noop');
import { AFM, Execution } from '@gooddata/typings';
import { Filters, Uri } from '@gooddata/data-layer';

import { Execute } from '../../execution/Execute';
import { IEvents } from '../../interfaces/Events';
import { KpiPropTypes, Requireable } from '../../proptypes/Kpi';

export { Requireable };

export interface IKpiProps extends IEvents {
    measure: string;
    projectId: string;
    filters?: AFM.FilterItem[];
    format?: string;
}

function buildAFM(measure: string, filters: AFM.FilterItem[] = []): AFM.IAfm {
    const item = Uri.isUri(measure) ? {
        uri: measure
    } : {
        identifier: measure
    };

    const afm: AFM.IAfm = {
        measures: [
            {
                localIdentifier: 'm1',
                definition: {
                    measure: {
                        item
                    }
                }
            }
        ],
        filters: filters.filter(Filters.isNotEmptyFilter)
    };
    return afm;
}

const defaultErrorHandler = (error: Object) => {
    console.error(error); // tslint:disable-line:no-console
};

export class Kpi extends React.Component<IKpiProps, null> {
    public static defaultProps: Partial<IKpiProps> = {
        format: '$0,0.00',
        filters: [],
        onError: defaultErrorHandler,
        onLoadingChanged: noop
    };

    public static propTypes = KpiPropTypes;

    public render() {
        const afm = buildAFM(this.props.measure, this.props.filters);

        return (
            <Execute
                afm={afm}
                projectId={this.props.projectId}
                onError={this.props.onError}
                onLoadingChanged={this.props.onLoadingChanged}
            >
                {(result: Execution.IExecutionResponses) =>
                    <span className="gdc-kpi">
                        {this.getFormattedResult(
                            this.extractNumber(result)
                        )}
                    </span>
                }
            </Execute>
        );
    }

    private getFormattedResult(result: string): string {
        return numeral(result).format(this.props.format);
    }

    private extractNumber(result: Execution.IExecutionResponses): string {
        // TODO handle empty result
        return get<string>(result, 'executionResult.executionResult.data.0.0');
    }
}
