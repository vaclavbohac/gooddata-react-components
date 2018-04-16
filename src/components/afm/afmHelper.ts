import { get } from 'lodash';

import { AFM } from '@gooddata/typings';

export const generateDefaultDimensions = function generateDefaultDimensions(afm: AFM.IAfm): AFM.IDimension[] {
    return [
        {
            itemIdentifiers: ['measureGroup']
        },
        {
            itemIdentifiers: get<AFM.IAfm, 'attributes', AFM.IAttribute[]>(afm, 'attributes', [])
                .map(a => a.localIdentifier)
        }
    ];
};
