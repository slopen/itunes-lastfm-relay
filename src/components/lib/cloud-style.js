// @flow

const fx = 20000;
const dfx = 3;

const rotate = (input: number) => {
	const deg = Number ((input / Math.E).toString ().slice (-1));

	return (deg <= 5 ? (deg / -dfx) : (deg / dfx)).toFixed (4);
}

export default (counts: number, index: number): Object => {
	const value = ((counts||0) < fx ? fx : counts) / fx;
	const result = (36 + (20 * Math.log (value))).toFixed (2);

	return {
		fontSize: `${result}%`,
		WebkitTransform: `rotate3d(0, 0, 1, ${rotate (index)}deg)`
	};
}