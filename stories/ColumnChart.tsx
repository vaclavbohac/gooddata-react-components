import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { VisualizationObject } from '@gooddata/typings';

import { ColumnChart } from '../src/components/ColumnChart';
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

storiesOf('Unified - ColumnChart', module)
    .add('nested - two measures, one attribute', () => (
        <div style={{ width: 800, height: 400 }}>
            <ColumnChart
                projectId="storybook"
                measures={[measureA, measureB]}
                attributes={[attributeA]}
            />
        </div>
    ));
