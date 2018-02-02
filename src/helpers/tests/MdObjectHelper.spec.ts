import * as MdObjectHelper from '../MdObjectHelper';
import { charts } from '../../../__mocks__/fixtures';

describe('MdObjectHelper', () => {
    describe('getTotals', () => {
        it('should return table totals for table chart', () => {
            const totals = MdObjectHelper.getTotals(charts[1].visualization);

            expect(totals).toEqual([{
                alias: 'average',
                attributeIdentifier: 'a1',
                measureIdentifier: 'm1',
                type: 'avg'
            }]);
        });

        it('should return empty table totals for bar chart', () => {
            const totals = MdObjectHelper.getTotals(charts[0].visualization);
            expect(totals).toEqual([]);
        });
    });
});
