export default class Freight {
	private total: number = 0;
	private DISTANCE: number = 1000;

	constructor() {}

	addItem({
		volume,
		density,
		amount
	}: {
		volume: number;
		density: number;
		amount: number;
	}) {
		this.total += (this.DISTANCE * volume * (density / 100)) * amount;
	}

	getTotal() {
		if (this.total > 0 && this.total < 10) return 10;
		return parseFloat(this.total.toFixed(2));
	}
}