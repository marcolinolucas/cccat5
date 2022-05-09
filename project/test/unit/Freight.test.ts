import Freight from "../../src/domain/entity/Freight";

test('When create freight with item, expect calculate price correctly', function () {
	const freight = new Freight();
	freight.addItem({ volume: 0.003, density: 333, amount: 2 })
	expect(freight.getTotal()).toBe(19.98);
});

test('When create freight with item, expect return min freight value', function () {
	const freight = new Freight();
	freight.addItem({ volume: 0.003, density: 333, amount: 1 })
	expect(freight.getTotal()).toBe(10);
});