import { Execution } from '@gooddata/typings';

const emptyResponse: Execution.IError = {
    code: 204
};

const tooLargeResponse: Execution.IError = {
    code: 413
};

const badRequestResponse: Execution.IError = {
    code: 400
};

const oneMeasureResponse: Execution.IExecutionResponses = {
    executionResponse: {
        executionResponse: {
            dimensions: [
                {
                    name: 'a',
                    headers: []
                },
                {
                    name: 'm',
                    headers: [
                        {
                            measureGroupHeader: {
                                items: [
                                    {
                                        measureHeaderItem: {
                                            name: 'Lost',
                                            format: '$#,##0.00',
                                            localIdentifier: '1st_measure_local_identifier',
                                            uri: '/gdc/md/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/obj/1283',
                                            identifier: 'af2Ewj9Re2vK'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
            links: {
                dataResult: '/gdc/app/projects/d20eyb3wfs0xe5l0lfscdnrnyhq1t42q/executionResults/2651138797087227392'
            }
        }
    },
    executionResult: {
        executionResult: {
            data: [
                [
                    '42470571.16'
                ]
            ],
            paging: {
                count: [
                    1,
                    1
                ],
                offset: [
                    0,
                    0
                ],
                total: [
                    1,
                    1
                ]
            },
            attributeHeaderItems: [
                [],
                []
            ]
        }
    }
};

export {
    emptyResponse,
    tooLargeResponse,
    oneMeasureResponse,
    badRequestResponse
};
