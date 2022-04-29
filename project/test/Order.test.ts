import Item from "../src/Item";
import Order from "../src/Order";
import Voucher from "../src/Voucher";

test('When pass invalid cpf to order, expect throw invalid cpf', function () {
	expect(() => new Order({ cpf: '11111111111' })).toThrow(new Error('Invalid cpf'));
});

test('When pass valid cpf to order, expect return total value as 0', function () {
	const order = new Order({ cpf: '570.251.630-31' });
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(0);
});

test('When pass many items, expect return correctly total value', function () {
	const order = new Order({ cpf: '570.251.630-31' });
	order.addItem({
		item: new Item({ description: 'first item', price: 100 }),
		amount: 1,
	});
	order.addItem({
		item: new Item({ description: 'second item', price: 20 }),
		amount: 7,
	});
	order.addItem({
		item: new Item({ description: 'third item', price: 500 }),
		amount: 2,
	});
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(1240);
});

test('When pass a voucher, expect return correctly total value with discount', function () {
	const voucher = new Voucher({
		code: 'BACK10',
		percentage: 10,
	});
	const order = new Order({ cpf: '570.251.630-31', voucher});
	order.addItem({
		item: new Item({ description: 'second item', price: 300 }),
		amount: 5,
	});
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(1350);
});