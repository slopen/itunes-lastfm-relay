// @flow

import * as React from 'react';

declare module 'react-list' {

  declare export interface Props {
    axis: | 'x' | 'y',
    initialIndex: number,
    itemRenderer: (index: number, key: string) => React.Component<*>,
    itemsRenderer: (items: Object[], ref: React.Component<*>) => React.Component<*>,
    itemSizeEstimator: Function,
    itemSizeGetter: Function,
    length: number,
    minSize: number,
    pageSize: number,
    scrollParentGetter: Function,
    threshold: number,
    type: | 'simple' | 'variable' | 'uniform',
    useStaticSize: boolean,
    useTranslate3d: boolean
  }

  declare export interface DefaultProps {
    axis: 'y',
    length: 0,
    minSize: 1,
    pageSize: 10,
    threshold: 100,
    type: 'simple',
    useStaticSize: false,
    useTranslate3d: false
  }


  declare export default class ReactList extends React.Component<Props, {}> {
    static defaultProps: DefaultProps;
  }
}