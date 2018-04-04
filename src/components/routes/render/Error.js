import React from 'react';


export default ({error = ''}) =>
	<div className="Error">
		{error.toString ()}
	</div>
