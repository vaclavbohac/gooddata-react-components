import { VisualizationTypes } from '../../constants/visualizationTypes';
import { getVisualizationType } from '../visualizationType';

describe('getVisualizationType', () => {
    it('should be undefined if uri leads to external src', () => {
        expect(getVisualizationType('loremipsum.com/CDN/index.js')).toBeNull();
    });
    it('should be BAR if uri is local:bar', () => {
        expect(getVisualizationType('local:bar')).toBe(VisualizationTypes.BAR);
    });
    it('should be COLUMN if uri is local:column', () => {
        expect(getVisualizationType('local:column')).toBe(VisualizationTypes.COLUMN);
    });
    it('should be LINE if uri is local:line', () => {
        expect(getVisualizationType('local:line')).toBe(VisualizationTypes.LINE);
    });
    it('should be TABLE if uri is local:TABLE', () => {
        expect(getVisualizationType('local:table')).toBe(VisualizationTypes.TABLE);
    });
    it('should be PIE if uri is local:pie', () => {
        expect(getVisualizationType('local:pie')).toBe(VisualizationTypes.PIE);
    });
    it('should handle different casing', () => {
        expect(getVisualizationType('local:Bar')).toBe(VisualizationTypes.BAR);
        expect(getVisualizationType('local:BAR')).toBe(VisualizationTypes.BAR);
        expect(getVisualizationType('local:bAR')).toBe(VisualizationTypes.BAR);
    });
});
