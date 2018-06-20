// @flow

import React, {Component} from 'react';

type Data = {
	[key: string]: string
};

type Props = {
	data: Object,
	fields: Array <string>,
	onChange: (Object) => void
};

type State = {
	...Data
};


const Input = ({
	name,
	value,
	onFocus,
	onChange
}) =>
	typeof value && value.length > 24
		? <textarea
			required
			name={name}
			value={value}
			onFocus={onFocus}
			onChange={onChange}
			className="form-control"
			placeholder={name}
			autoComplete="off"
			type="text"/>
		: <input
			required
			name={name}
			value={value}
			onFocus={onFocus}
			onChange={onChange}
			className="form-control"
			placeholder={name}
			autoComplete="off"
			type="text"/>

export default class EditFieldset extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};

		(this: any).onFocus = this.onFocus.bind (this);
		(this: any).onChange = this.onChange.bind (this);
	}

	onFocus () {
		if (!Object.keys (this.state).length) {
			this.setState ({...this.props.data});
		}
	}

	onChange ({target: {name, value}}: SyntheticInputEvent <EventTarget>) {
		this.setState ({[name]: value}, () => {
			this.props.onChange (this.state);
		});
	}

	render () {
		const {fields, data} = this.props;

		return (
			<fieldset>
				{fields.map ((name) => {
					const value = typeof this.state [name] !== 'undefined'
						? this.state [name] : data [name];

					return <p key={name}><Input
						name={name}
						value={typeof value === 'object'
							? value.summary
							: value
						}
						onFocus={this.onFocus}
						onChange={this.onChange}/></p>
				})}
			</fieldset>
		);
	}
}