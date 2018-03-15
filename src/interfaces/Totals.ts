// (C) 2007-2018 GoodData Corporation
import { VisualizationObject } from '@gooddata/typings';

export interface IIndexedTotalItem { // TODO rename to e.g. ITotalWithoutData
    alias?: string;
    type: VisualizationObject.TotalType;
    outputMeasureIndexes: number[];
}

export interface ITotalWithData extends IIndexedTotalItem {
    values: number[];
}
