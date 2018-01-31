import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { VisualizationObject } from '@gooddata/typings';

import { ColumnChart } from '../src/components/ColumnChart';
import { ColumnChartNested } from '../src/components/ColumnChartNested';
import '../styles/scss/charts.scss';

const measureA = {
    measure: {
        localIdentifier: 'm1',
        definition: {
            measureDefinition: {
                item: {
                    uri: '/gdc/md/storybook/obj/1'
                }
            }
        }
    }
};

const measureB = {
    measure: {
        localIdentifier: 'm2',
        definition: {
            measureDefinition: {
                item: {
                    uri: '/gdc/md/storybook/obj/2'
                }
            }
        }
    }
};

const attributeA: VisualizationObject.IVisualizationAttribute = {
    visualizationAttribute: {
        localIdentifier: 'a1',
        displayForm: {
            uri: '/gdc/md/storybook/obj/3.df'
        }
    }
};

const buckets: VisualizationObject.IBucket[] = [
    {
        localIdentifier: 'measures',
        items: [
            measureA,
            measureB
        ]
    }, {
        localIdentifier: 'attributes',
        items: [
            attributeA
        ]
    }
];

storiesOf('Unified - ColumnChart', module)
    .add('two measures, one attribute', () => (
        <div style={{ width: 800, height: 400 }}>
            <ColumnChart
                projectId="storybook"
                buckets={buckets}
            />
        </div>
    ))
    .add('nested - two measures, one attribute', () => (
        <div style={{ width: 800, height: 400 }}>
            <ColumnChartNested
                projectId="storybook"
                measures={[measureA, measureB]}
                attributes={[attributeA]}
            />
        </div>
    ));
