export default class Dimension {
	height: number;
	width: number;
	depth:  number;

	constructor({
		height,
		width,
		depth,
	}: {
		height: number;
		width: number;
		depth: number;
	}) {
		this.height = height;
		this.width = width;
		this.depth = depth;
	}

	getVolume() {
		return (this.height / 100) * (this.width / 100) * (this.depth / 100);
	}
}