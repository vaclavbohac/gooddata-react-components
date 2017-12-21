import { VisualizationTypes, VisType } from '../constants/visualizationTypes';

export function getVisualizationType(visualizationClassUri: string): VisType {
    // known types follow local:<type> pattern
    const type = visualizationClassUri.split(':')[1];
    if (type) {
        return VisualizationTypes[type.toUpperCase()];
    }

    return null;
}
