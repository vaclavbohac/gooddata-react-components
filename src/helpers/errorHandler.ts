import { Execution } from '@gooddata/typings';
import {
    ErrorCodes,
} from '@gooddata/data-layer';
import { ErrorStates } from '../constants/errorStates';

export function checkForErrors(result: Execution.AfmExecutionResponse) {
    const errorCode: number = (result as Execution.IError).code;
    if (!errorCode) {
        return;
    }
    switch (errorCode) {
        case 204:
            throw ErrorStates.NO_DATA;
        case ErrorCodes.HTTP_TOO_LARGE:
            throw ErrorStates.DATA_TOO_LARGE_TO_COMPUTE;
        case ErrorCodes.HTTP_BAD_REQUEST:
            throw ErrorStates.BAD_REQUEST;
        default:
            throw ErrorStates.UNKNOWN_ERROR;
    }
}
