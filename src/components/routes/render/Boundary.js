import React, {Component} from 'react';

export default class Boundary extends Component {

	constructor (props) {
		super (props);

		this.state = {
			hasError: false
		};
	}

	componentDidCatch (error, info) {
		this.setState ({error});

		console.error ('* boundary error:', error, info);
	}

	render () {
		if (this.state.error) {
			return <div className="error">{this.state.error}</div>;
		}

		return this.props.children;
	}
}
