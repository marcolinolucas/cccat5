import Voucher from "../../src/domain/entity/Voucher";

test('When create a voucher, expect return correctly', function () {
	const voucher = new Voucher({ code: 'BACK10', percentage: 10 });
	expect(voucher.code).toBe('BACK10');
	expect(voucher.percentage).toBe(10);
});

test('When create a voucher with expire date, expect return correctly', function () {
	const now = new Date('2022-04-30T06:45:24.413Z');
	const voucher = new Voucher({
		code: 'BACK10',
		percentage: 10,
		expireAt: now,
	});
	expect(voucher.code).toBe('BACK10');
	expect(voucher.percentage).toBe(10);
	expect(voucher.expireAt).toBe(now);
	expect(voucher.isExpired({ date: now })).toBeFalsy()
	expect(voucher.getDiscount({ amount: 100 })).toBe(10);
});

test('When create a voucher with expired date, expect return correctly', function () {
	const expiredAt = new Date('2022-03-30T06:45:24.413Z');
	const now = new Date('2022-04-30T06:45:24.413Z');
	const voucher = new Voucher({
		code: 'BACK10',
		percentage: 10,
		expireAt: expiredAt,
	});
	expect(voucher.code).toBe('BACK10');
	expect(voucher.percentage).toBe(10);
	expect(voucher.expireAt).toBe(expiredAt);
	expect(voucher.isExpired({ date: now })).toBeTruthy();
});