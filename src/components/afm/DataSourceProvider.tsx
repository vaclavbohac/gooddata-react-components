import * as React from 'react';
import * as GoodData from 'gooddata';

import isEqual = require('lodash/isEqual');
import omit = require('lodash/omit');
import identity = require('lodash/identity');
import { AFM } from '@gooddata/typings';
import {
    ExecuteAfmAdapter
} from '@gooddata/data-layer';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { IDataSource } from '../../interfaces/DataSource';

export interface IDataSourceProviderProps {
    afm: AFM.IAfm;
    projectId: string;
    resultSpec?: AFM.IResultSpec;

    [p: string]: any; // other params of inner componnent, just for pass through
}

export interface IDataSourceProviderInjectedProps {
    dataSource: IDataSource;
    resultSpec?: AFM.IResultSpec;
}

export type IDataSourceInfoPromise = Promise<IDataSource>;

export function dataSourceProvider<T>(
    InnerComponent: React.ComponentClass<T & IDataSourceProviderInjectedProps>,
    generateDefaultDimensions: Function
): React.ComponentClass<IDataSourceProviderProps> {
    function addDefaultDimensions(
        afm: AFM.IAfm,
        resultSpec: AFM.IResultSpec
    ): AFM.IResultSpec {
        const dimensions = generateDefaultDimensions(afm);
        return {
            dimensions,
            ...resultSpec
        };
    }

    return class WrappedComponent
        extends React.Component<IDataSourceProviderProps, IDataSourceProviderInjectedProps> {

        private adapter: ExecuteAfmAdapter;
        private subject: Subject<IDataSourceInfoPromise>;
        private subscription: Subscription;

        constructor(props: IDataSourceProviderProps) {
            super(props);

            this.state = {
                dataSource: null,
                resultSpec: null
            };

            this.subject = new Subject<IDataSourceInfoPromise>();
            this.subscription = this.subject
                .switchMap<IDataSourceInfoPromise, IDataSource>(identity)
                .subscribe((dataSource) => {
                    this.setState({
                        dataSource
                    });
                } ,
                (error: any) => this.handleError(error)
            );
        }

        public componentDidMount() {
            const { projectId, afm } = this.props;
            this.createAdapter(projectId);
            this.prepareDataSource(afm);
        }

        // TODO consider using componentDidUpdate
        public componentWillReceiveProps(nextProps: IDataSourceProviderProps) {
            const { projectId, afm, resultSpec } = nextProps;
            if (projectId !== this.props.projectId) {
                this.createAdapter(projectId);
            }
            if (
                !isEqual(afm, this.props.afm)
                || !isEqual(resultSpec, this.props.resultSpec)
                || projectId !== this.props.projectId
            ) {
                this.prepareDataSource(afm);
            }
        }

        public componentWillUnmount() {
            this.subscription.unsubscribe();
            this.subject.unsubscribe();
        }

        public render() {
            const { dataSource } = this.state;
            if (!dataSource) {
                return null;
            }

            const props = omit<any, IDataSourceProviderProps>(this.props, ['afm', 'projectId', 'resultSpec']);
            const resultSpec = addDefaultDimensions(this.props.afm, this.props.resultSpec);
            return (
                <InnerComponent
                    {...props}
                    dataSource={dataSource}
                    resultSpec={resultSpec}
                />
            );
        }

        private createAdapter(projectId: string) {
            this.adapter = new ExecuteAfmAdapter(GoodData, projectId);
        }

        private handleError(error: string) {
            throw error;
        }

        private prepareDataSource(afm: AFM.IAfm) {
            const promise = this.adapter.createDataSource(afm);
            this.subject.next(promise);
        }
    };
}
