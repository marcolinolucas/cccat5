import Dimension from "./Dimension";

export default class Product {
	id: number;
	description: string;
	price: number;
	dimension?: Dimension;
	weight?: number;

	constructor({
		id,
		description,
		price,
		dimension,
		weight,
	}: {
		id: number;
		description: string;
		price: number;
		dimension?: Dimension;
		weight?: number;
	}) {
		this.id = id;
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