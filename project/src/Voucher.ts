import dayjs from "dayjs";

export default class Voucher {
	code: string;
	percentage: number;
	expireAt?: Date;
	
	constructor({
		code,
		percentage,
		expireAt,
	}: {
		code: string;
		percentage: number;
		expireAt?: Date;
	}) {
		this.code = code;
		this.percentage = percentage;
		this.expireAt = expireAt;
	}

	isExpired({ date }: { date: Date }) {
		if (!this.expireAt) return false;
		return dayjs(date).isAfter(dayjs(this.expireAt))
	}

	getDiscount({ amount }: { amount: number }) {
		return amount * (this.percentage / 100);
	}
}