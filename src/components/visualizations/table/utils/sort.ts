// (C) 2007-2018 GoodData Corporation
import * as classNames from 'classnames';
import * as invariant from 'invariant';
import { first, get, has } from 'lodash';

import { AFM } from '@gooddata/typings';

import { ASC, DESC } from '../constants/sort';
import { ISortInfo, ISortObj, SortDir, TableHeader } from '../interfaces/data';
import IAttributeSortItem = AFM.IAttributeSortItem;
import IMeasureSortItem = AFM.IMeasureSortItem;

function getSortBy(tableHeaders: TableHeader[], sortItemLocalIdentifier: string): number {
    const sortByColumnIndex: number = tableHeaders.findIndex(
        tableHeader => tableHeader.localIdentifier === sortItemLocalIdentifier
    );

    invariant(sortByColumnIndex >= 0, `Cannot find sort identifier ${sortItemLocalIdentifier} in table headers`);

    return sortByColumnIndex;
}

function getSortItemAttributeIdentifier(sortItem: AFM.IAttributeSortItem): string {
    const sortItemAttributeIdentifier = get(sortItem, ['attributeSortItem', 'attributeIdentifier']) as string;

    invariant(sortItemAttributeIdentifier, 'Attribute sort item doesn\'t contain attribute identifier');

    return sortItemAttributeIdentifier;
}

function getSortItemMeasureIdentifier(sortItem: AFM.IMeasureSortItem): string {
    const locators = get(sortItem, ['measureSortItem', 'locators']) as AFM.LocatorItem[];

    invariant(locators, 'Measure sort item doesn\'t contain locators');

    invariant(locators.length <= 1, 'Measure sort item couldn\'t contain more than one locator');

    const firstLocator: AFM.LocatorItem = first(locators);
    const sortItemMeasureIdentifier = get(firstLocator, ['measureLocatorItem', 'measureIdentifier']) as string;

    invariant(sortItemMeasureIdentifier, 'Measure sort item doesn\'t contain measure identifier');

    return sortItemMeasureIdentifier;
}

export function getHeaderSortClassName(sortDir: SortDir, currentSort: SortDir): string {
    return classNames({
        'gd-table-arrow-up': sortDir === ASC,
        'gd-table-arrow-down': sortDir === DESC,
        's-sorted-asc': currentSort === ASC,
        's-sorted-desc': currentSort === DESC
    });
}

export function getNextSortDir(header: TableHeader, currentSortDir: SortDir): SortDir {
    if (!currentSortDir) {
        return header.type === 'measure' ? DESC : ASC;
    }

    return currentSortDir === ASC ? DESC : ASC;
}

export function getSortItem(executionRequest: AFM.IExecution): AFM.SortItem {
    const sorts = get(executionRequest, ['execution', 'resultSpec', 'sorts'], []);

    if (sorts.length === 0) {
        return null;
    }

    invariant(sorts.length === 1, 'Table allows only one sort');

    return sorts[0];
}

export function getSortInfo(sortItem: AFM.SortItem, tableHeaders: TableHeader[]): ISortInfo {
    if (has(sortItem, 'attributeSortItem')) {
        const sortItemIdentifier = getSortItemAttributeIdentifier(sortItem as IAttributeSortItem);
        const sortBy: number = getSortBy(tableHeaders, sortItemIdentifier);
        const sortDir = get(sortItem, ['attributeSortItem', 'direction']) as SortDir;

        invariant(sortDir, 'Attribute sort item doesn\'t contain direction');

        return { sortBy, sortDir };
    }

    if (has(sortItem, 'measureSortItem')) {
        const sortItemIdentifier = getSortItemMeasureIdentifier(sortItem as IMeasureSortItem);
        const sortBy: number = getSortBy(tableHeaders, sortItemIdentifier);
        const sortDir = get(sortItem, ['measureSortItem', 'direction']) as SortDir;

        invariant(sortDir, 'Measure sort item doesn\'t contain direction');

        return { sortBy, sortDir };
    }

    throw new Error(`Unknown sort item: ${Object.keys(sortItem)[0]}`);
}

export function createSortItem(header: TableHeader, sortObj: ISortObj): AFM.SortItem {
    return header.type === 'attribute'
        ? {
            attributeSortItem: {
                direction: sortObj.nextDir,
                attributeIdentifier: header.localIdentifier
            }
        }
        : {
            measureSortItem: {
                direction: sortObj.nextDir,
                locators: [
                    {
                        measureLocatorItem: {
                            measureIdentifier: header.localIdentifier
                        }
                    }
                ]
            }
        };
}
