// @flow

import React from 'react';

type Props = {
	error: Error
};

export default ({error}: Props) =>
	<div className="error">{error.toString ()}</div>
