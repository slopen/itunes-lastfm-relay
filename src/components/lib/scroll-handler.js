// @flow

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import throttle from 'lodash.throttle';

type Props = {
	threshold?: number;
	onScrollEnd: (position:number) => mixed;
};

type Direction = 'down' | 'up';


type PartialWindow = {
	scrollY: number;
	innerHeight: number;
	innerWidth: number;
} & EventTarget;

const isInViewport = (element: ?Node, threshold: number) => {
	const html: ?Element = document.documentElement;

	if (html && element instanceof HTMLElement) {
		const {
			top,
			bottom,
			left,
			right
		} = element.getBoundingClientRect ();
		const {
			clientHeight: cWidth,
			clientWidth: cHeight
		} = html;
		const {
			innerHeight: wWidth,
			innerWidth: wHeight
		}: PartialWindow = window;

		return (
			top >= 0 &&
			left >= 0 &&
			(bottom - threshold) <= (wWidth || cHeight) &&
			right <= (wHeight || cWidth)
		);
	}

	return null;
}

export default class ScrollDirection extends Component<Props> {

	_last: number;
	_threshold: number;

	constructor (props: Props) {
		super (props);

		this._last = 0;
		this._threshold = props.threshold || 200;

		(this: any).scrollHandler = throttle (this.scrollHandler, 200).bind (this);
	}


	scrollHandler () {
		const element: ?Node = findDOMNode (this);
		const {scrollY: position}: PartialWindow = window;
		const direction: ?Direction = ['up', 'down'] [
			Number (position > this._last)
		];

		if (direction === 'down' && isInViewport (element, this._threshold)) {
			this.props.onScrollEnd (position);
		}

		this._last = position;
	}

	componentDidMount () {
		(window: PartialWindow).addEventListener ('scroll', this.scrollHandler);
	}

	componentWillUnmount () {
		(window: PartialWindow).removeEventListener ('scroll', this.scrollHandler);
	}

	render () {
		return (
			<div onClick={this.props.onScrollEnd}/>
		);
	}
}