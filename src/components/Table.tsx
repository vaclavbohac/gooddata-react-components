import * as React from 'react';
import { VisualizationObject, AFM } from '@gooddata/typings';

import { Table as CoreTable } from './core/Table';
import { IDataSource } from '../interfaces/DataSource';
import { dataSourceProvider } from './afm/DataSourceProvider';

export type DataSourceFactory = (buckets: VisualizationObject.IBucket[]) => IDataSource;

export interface IColumnChartProps {
    projectId: string;
    columns: VisualizationObject.IMeasure[];
    rows?: VisualizationObject.IVisualizationAttribute[];
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
        if (bucket.localIdentifier === 'columns') {
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

        if (bucket.localIdentifier === 'rows') {
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
            itemIdentifiers: (afm.attributes || []).map(a => a.localIdentifier)
        },
        {
            itemIdentifiers: ['measureGroup']
        }
    ];
}

export function Table(props: IColumnChartProps): JSX.Element {
    const Component = dataSourceProvider(CoreTable, generateDefaultDimensions);

    const buckets: VisualizationObject.IBucket[] = [
        {
            localIdentifier: 'measures',
            items: props.columns || []
        },
        {
            localIdentifier: 'attributes',
            items: props.rows || []
        }
    ];

    return (
        <Component
            projectId={props.projectId}
            afm={convertBucketsToAFM(buckets)}
        />
    );
}
