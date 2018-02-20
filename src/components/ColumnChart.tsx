import * as React from 'react';
import { VisualizationObject, AFM } from '@gooddata/typings';

import { ColumnChart as CoreColumnChart } from './core/ColumnChart';
import { IDataSource } from '../interfaces/DataSource';
import { dataSourceProvider } from './afm/DataSourceProvider';

export type DataSourceFactory = (buckets: VisualizationObject.IBucket[]) => IDataSource;

export interface IColumnChartProps {
    projectId: string;
    measures: VisualizationObject.BucketItem[];
    attributes?: VisualizationObject.IVisualizationAttribute[];
    stacks?: VisualizationObject.IVisualizationAttribute[];
    filters?: VisualizationObject.VisualizationObjectFilter[];
}

function convertMeasureDefinition(
    measure: VisualizationObject.IMeasure
): AFM.IPopMeasureDefinition | AFM.ISimpleMeasureDefinition {
    if (VisualizationObject.isMeasureDefinition(measure.measure.definition)) {
        // TODO: Convert filters
        const { aggregation, computeRatio, item }
            = measure.measure.definition.measureDefinition;

        return {
            measure: {
                aggregation,
                computeRatio,
                item
            }
        };
    }

    return {
        popMeasure: measure.measure.definition.popMeasureDefinition
    };
}

function convertBucketsToAFM(buckets: VisualizationObject.IBucket[]): AFM.IAfm {
    return buckets.reduce((afm: AFM.IAfm, bucket: VisualizationObject.IBucket) => {
        if (bucket.localIdentifier === 'measures') {
            const measures: AFM.IMeasure[] = [];

            for (const item of bucket.items) {
                if (VisualizationObject.isMeasure(item)) {
                    const afmMeasure: AFM.IMeasure = {
                        localIdentifier: item.measure.localIdentifier,
                        alias: item.measure.alias,
                        format: item.measure.format,
                        definition: convertMeasureDefinition(item)
                    };

                    measures.push(afmMeasure);
                }
            }

            afm.measures = measures;
        }

        if (bucket.localIdentifier === 'attributes') {
            const attributes: AFM.IAttribute[] = [];

            for (const item of bucket.items) {
                if (VisualizationObject.isAttribute(item)) {
                    attributes.push(item.visualizationAttribute);
                }
            }

            afm.attributes = attributes;
        }

        // TODO: Convert filters

        return afm;
    }, {});
}

function generateDefaultDimensions(afm: AFM.IAfm): AFM.IDimension[] {
    return [
        {
            itemIdentifiers: ['measureGroup']
        },
        {
            itemIdentifiers: (afm.attributes || []).map(a => a.localIdentifier)
        }
    ];
}

function generateStackedDimensions(afm: AFM.IAfm): AFM.IDimension[] {
    return [
        {
            itemIdentifiers: ['measureGroup', afm.attributes[0].localIdentifier]
        },
        {
            itemIdentifiers: (afm.attributes || []).map((a => a.localIdentifier))
        }
    ];
}

function isStackedChart(buckets: VisualizationObject.IBucket[]): boolean {
    return buckets.some((bucket) => {
        return bucket.localIdentifier === 'stacks' && bucket.items.length > 0;
    });
}

function getStackingResultSpec(buckets: VisualizationObject.IBucket[]): AFM.IResultSpec {
    if (isStackedChart(buckets)) {
        return {
            dimensions: generateStackedDimensions(convertBucketsToAFM(buckets))
        };
    }

    return {
        dimensions: generateDefaultDimensions(convertBucketsToAFM(buckets))
    };
}

export function ColumnChart(props: IColumnChartProps): JSX.Element {
    const Component = dataSourceProvider(CoreColumnChart, generateDefaultDimensions);

    const buckets: VisualizationObject.IBucket[] = [
        {
            localIdentifier: 'measures',
            items: props.measures || []
        },
        {
            localIdentifier: 'attributes',
            items: props.attributes || []
        },
        {
            localIdentifier: 'stacks',
            items: props.stacks || []
        }
    ];

    return (
        <Component
            projectId={props.projectId}
            afm={convertBucketsToAFM(buckets)}
            resultSpec={getStackingResultSpec(buckets)}
        />
    );
}
