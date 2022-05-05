import Dimension from "./Dimension";

export default class Item {
	description: string;
	price: number;
	dimension?: Dimension;
	weight?: number;

	constructor({
		description,
		price,
		dimension,
		weight,
	}: {
		description: string;
		price: number;
		dimension?: Dimension;
		weight?: number;
	}) {
		this.description = description;
		this.price = price;
		this.dimension = dimension;
		this.weight = weight;
	}

	getVolume() {
		return this.dimension ? this.dimension.getVolume() : 0;
	}

	getDensity() {
		if (this.weight && this.dimension) return Math.round(this.weight / this.getVolume());
		return 0;
	}
}