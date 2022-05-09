import Product from "../../src/domain/entity/Product";
import Order from "../../src/domain/entity/Order";
import Voucher from "../../src/domain/entity/Voucher";
import Dimension from "../../src/domain/entity/Dimension";

test('When pass invalid cpf to order, expect throw invalid cpf', function () {
	expect(() => new Order({ cpf: '11111111111' })).toThrow(new Error('Invalid cpf'));
});

test('When pass valid cpf to order, expect return total value as 0', function () {
	const order = new Order({ cpf: '570.251.630-31' });
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(0);
});

test('When pass many products, expect return correctly total value with freight', function () {
	const order = new Order({ cpf: '570.251.630-31' });
	order.addProduct({
		product: new Product({
			id: 1,
			description: 'first product',
			price: 100,
			dimension: new Dimension({
				height: 20,
				width: 15,
				depth: 10,
			}),
			weight: 1,
		}),
		amount: 1,
	});
	order.addProduct({
		product: new Product({
			id: 2,
			description: 'second product',
			price: 20,
			dimension: new Dimension({
				height: 100,
				width: 30,
				depth: 10,
			}),
			weight: 3,
		}),
		amount: 7,
	});
	order.addProduct({
		product: new Product({
			id: 3,
			description: 'third product',
			price: 500,
			dimension: new Dimension({
				height: 200,
				width: 100,
				depth: 50,
			}),
			weight: 40,
		}),
		amount: 2,
	});
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(2259.99);
	expect(order.getFreightValue()).toBe(1019.99);
});

test('When pass a voucher, expect return correctly total value with discount', function () {
	const voucher = new Voucher({
		code: 'BACK10',
		percentage: 10,
	});
	const order = new Order({ cpf: '570.251.630-31' });
	order.addVoucher({ voucher });
	order.addProduct({
		product: new Product({
			id: 1,
			description: 'second product',
			price: 300,
			dimension: new Dimension({
				height: 100,
				width: 30,
				depth: 10,
			}),
			weight: 3,
		}),
		amount: 5,
	});
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(1500);
	expect(order.getFreightValue()).toBe(150);
});

test('When order total is lower than minimal freight value, expect add min value of freight at total', function () {
	const order = new Order({ cpf: '570.251.630-31' });
	order.addProduct({
		product: new Product({
			id: 1,
			description: 'second product',
			price: 10,
			dimension: new Dimension({
				height: 100,
				width: 100,
				depth: 100,
			}),
			weight: 0.7,
		}),
		amount: 1,
	});
	expect(order.cpf.getValue()).toBe('57025163031');
	expect(order.getTotalValue()).toBe(20);
	expect(order.getFreightValue()).toBe(10);
});