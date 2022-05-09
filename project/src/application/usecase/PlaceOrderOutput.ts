export default class PlaceOrderOutput {
	total: number;
	freightTotal: number;

	constructor({
		total,
		freightTotal,
	}: {
		total: number;
		freightTotal: number;
	}) {
		this.total = total;
		this.freightTotal = freightTotal;
	}
}