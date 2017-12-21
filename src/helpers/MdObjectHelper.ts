// todo-mms: Consider to implement MDObject class to encapsulate all kind of helper methods around mdObject data
import { VisualizationObject } from '@gooddata/typings';
import get = require('lodash/get');
import { MEASURES } from '../constants/bucketNames';

export function getTotals(mdObject: VisualizationObject.IVisualizationObject):
    VisualizationObject.IVisualizationTotal[] {

    const measures: VisualizationObject.IBucket = mdObject.content.buckets
        .find(bucket => bucket.localIdentifier === MEASURES);

    return get(measures, 'totals', []);
}
