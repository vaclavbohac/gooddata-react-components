import * as React from 'react';
import { mount } from 'enzyme';
import { AFM } from '@gooddata/typings';
import {
    Table,
    BaseChart
} from '../../tests/mocks';
import { charts } from '../../../../__mocks__/fixtures';

import { VisualizationObject } from '@gooddata/data-layer';
import { Visualization } from '../Visualization';
import { ErrorStates } from '../../../constants/errorStates';
import { delay } from '../../tests/utils';

const projectId = 'myproject';
const CHART_URI = `/gdc/md/${projectId}/obj/1`;
const TABLE_URI = `/gdc/md/${projectId}/obj/2`;
const CHART_IDENTIFIER = 'chart';
const TABLE_IDENTIFIER = 'table';

const SLOW = 20;
const FAST = 5;

function getResponse(response: string, delay: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(response), delay);
    });
}

function fetchVisObject(uri: string): Promise<VisualizationObject.IVisualizationObject> {
    const visObj = charts.find(chart => chart.visualization.meta.uri === uri);

    if (!visObj) {
        throw new Error(`Unknown uri ${uri}`);
    }

    return Promise.resolve(visObj.visualization);
}

// tslint:disable-next-line:variable-name
function uriResolver(_projectId: string, _uri: string, identifier: string): Promise<string> {
    if (identifier === TABLE_IDENTIFIER) {
        return getResponse(TABLE_URI, FAST);
    }

    if (identifier === CHART_IDENTIFIER) {
        return getResponse(CHART_URI, SLOW);
    }

    return Promise.reject('Unknown identifier');
}

describe('Visualization', () => {
    it('should render chart', () => {
        const wrapper = mount(
            <Visualization
                projectId={projectId}
                identifier={CHART_IDENTIFIER}
                fetchVisObject={fetchVisObject}
                uriResolver={uriResolver}
                BaseChartComponent={BaseChart}
            />
        );

        return delay(SLOW + 1).then(() => {
            expect(wrapper.find(BaseChart).length).toBe(1);
        });
    });

    it('should render table', () => {
        const wrapper = mount(
            <Visualization
                projectId={projectId}
                identifier={TABLE_IDENTIFIER}
                fetchVisObject={fetchVisObject}
                uriResolver={uriResolver}
                TableComponent={Table}
            />
        );

        return delay(SLOW).then(() => {
            expect(wrapper.find(Table).length).toBe(1);
        });
    });

    it('should trigger error in case of given uri is not valid', (done) => {
        const errorHandler = (value: string) => {
            expect(value).toEqual(ErrorStates.NOT_FOUND);
            done();
        };

        mount(
            <Visualization
                projectId={projectId}
                uri={'/invalid/url'}
                onError={errorHandler}
            />
        );
    });

    it('should replace date filter, if it has same id', () => {
        const filter: AFM.IRelativeDateFilter = {
            relativeDateFilter: {
                dataSet: {
                    uri: '/gdc/md/myproject/obj/921'
                },
                from: -51,
                to: 0,
                granularity: 'GDC.time.date'
            }
        };

        const wrapper = mount(
            <Visualization
                projectId={projectId}
                uri={CHART_URI}
                filters={[filter]}
            />
        );

        return delay().then(() => {
            const node: any = wrapper.getNode();
            expect(node.dataSource.afm.filters).toHaveLength(1);
            expect(node.dataSource.afm.filters[0]).toEqual(filter);
        });
    });

    it('should add date filter, if it has different id', () => {
        const filter: AFM.IRelativeDateFilter = {
            relativeDateFilter: {
                dataSet: {
                    uri: '/gdc/md/myproject/obj/922'
                },
                from: -51,
                to: 0,
                granularity: 'GDC.time.date'
            }
        };

        const wrapper = mount(
            <Visualization
                projectId={projectId}
                uri={CHART_URI}
                filters={[filter]}
            />
        );

        return delay().then(() => {
            const node: any = wrapper.getNode();
            expect(node.dataSource.afm.filters).toHaveLength(2);
            expect(node.dataSource.afm.filters[1]).toEqual(filter);
        });
    });

    it('should add attribute filter', () => {
        const filter: AFM.IPositiveAttributeFilter = {
            positiveAttributeFilter: {
                displayForm: {
                    uri: '/gdc/md/myproject/obj/925'
                },
                in: ['11', '22', '33']
            }
        };

        const wrapper = mount(
            <Visualization
                projectId={projectId}
                uri={CHART_URI}
                filters={[filter]}
            />
        );

        return delay().then(() => {
            const node: any = wrapper.getNode();
            expect(node.dataSource.afm.filters).toHaveLength(2);
            expect(node.dataSource.afm.filters[0]).toEqual(filter);
        });
    });

    it('should handle slow requests', () => {
        // Response from first request comes back later that from the second one
        const wrapper = mount(
            <Visualization
                projectId={projectId}
                identifier={'chart'}
                uriResolver={uriResolver}
            />
        );

        wrapper.setProps({ identifier: TABLE_IDENTIFIER });

        return delay(300).then(() => {
            expect(wrapper.find(Table).length).toBe(1);
        });
    });

    it('should not re-render with same props', () => {
        const wrapper = mount(
            <Visualization
                projectId={projectId}
                uri={CHART_URI}
                filters={[]}
            />
        );
        const spy = jest.spyOn(wrapper.instance(), 'render');

        wrapper.setProps({
            projectId,
            uri: CHART_URI,
            filters: []
        });

        return delay(300).then(() => {
            // initial render without datasource is called during mount
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
        });
    });

    it('should handle set state on unmounted component', () => {
        const wrapper = mount(
            <Visualization
                projectId={projectId}
                identifier={'chart'}
                uriResolver={uriResolver}
            />
        );

        const spy = jest.spyOn(wrapper.instance(), 'setState');

        // Would throw an error if not handled properly
        wrapper.unmount();
        return delay(300).then(() => {
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });
    });
});
