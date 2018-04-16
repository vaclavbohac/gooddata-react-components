import * as React from 'react';
import { omit } from 'lodash';
import { Subtract } from 'utility-types';
import { VisualizationObject } from '@gooddata/typings';

import { PieChart as AfmPieChart } from './afm/PieChart';
import { ICommonChartProps } from './core/base/BaseChart';
import { convertBucketsToAFM } from '../helpers/conversion';

export interface IPieChartBucketProps {
    measures: VisualizationObject.BucketItem[];
    viewBy?: VisualizationObject.IVisualizationAttribute;
    filters?: VisualizationObject.VisualizationObjectFilter[];
}

export interface IPieChartProps extends ICommonChartProps, IPieChartBucketProps {
    projectId: string;
}

type IPieChartNonBucketProps = Subtract<IPieChartProps, IPieChartBucketProps>;

/**
 * [PieChart](http://sdk.gooddata.com/gdc-ui-sdk-doc/docs/next/pie_chart_component.html)
 * is a component with bucket props measures, viewBy, filters
 */
export function PieChart(props: IPieChartProps): JSX.Element {
    const buckets: VisualizationObject.IBucket[] = [
        {
            localIdentifier: 'measures',
            items: props.measures || []
        },
        {
            localIdentifier: 'view',
            items: props.viewBy ? [props.viewBy] : []
        }
    ];

    const newProps
        = omit<IPieChartNonBucketProps>(props, ['measures', 'viewBy', 'filters']);

    return (
        <AfmPieChart
            {...newProps}
            projectId={props.projectId}
            afm={convertBucketsToAFM(buckets, props.filters)}
        />
    );
}
