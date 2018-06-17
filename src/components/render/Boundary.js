// @flow

import React, {Component} from 'react';
import ErrorComponent from './Error';

type Props = {
	children: React$Node
};

type State = {
	error?: Error,
	hasError: boolean
};

export default class Boundary extends Component<Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {
			hasError: false
		};
	}

	componentDidCatch (error: Error, info: mixed) {
		this.setState ({error});

		console.error ('* boundary error:', error, info);
	}

	render () {
		const {error} = this.state;

		if (error) {
			return <ErrorComponent error={error}/>;
		}

		return this.props.children;
	}
}
