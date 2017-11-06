import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { ISimpleExecutorResult } from 'gooddata';
import { AFM } from '@gooddata/typings';
import { Execute } from '../src/execution/Execute';

const afm: AFM.IAfm = {
    measures: [
        {
            localIdentifier: 'm1',
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/storybook/obj/1'
                    }
                }
            }
        },
        {
            localIdentifier: 'm2',
            definition: {
                measure: {
                    item: {
                        uri: '/gdc/md/storybook/obj/2'
                    }
                }
            }
        }
    ]
};

const usage = `
    <Execute afm={afm} transformation={transformation} projectId={projectId}>
        {result => ...}
    </Execute>
`;

storiesOf('Execute', module)
    .add('Execute', () => (
        <div>
            <h4>Execute</h4>
            <p>Component which can execute AFM with Transformation</p>
            <h5>Usage:</h5>
            <pre>{usage}</pre>

            <h5>Example:</h5>
            <Execute
                afm={afm}
                projectId={'storybook'}
                onLoadingChanged={action('loadingChanged')}
            >
                {(result: ISimpleExecutorResult) => (<pre>{JSON.stringify(result, null, 2)}</pre>)}
            </Execute>
        </div>
    ));
