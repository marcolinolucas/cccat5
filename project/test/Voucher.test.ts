import Voucher from "../src/Voucher";

test('When create percentage voucher, expect return correctly', function () {
	const voucher = new Voucher({ code: 'BACK10', percentage: 10 });
	expect(voucher.code).toBe('BACK10');
	expect(voucher.percentage).toBe(10);
});
