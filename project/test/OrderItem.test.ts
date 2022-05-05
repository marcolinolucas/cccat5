import Product from "../src/Product";
import OrderItem from "../src/OrderItem";

test('When item with amount, expect return total value correctly', function () {
	const item = new Product({
		description: 'description of item',
		price: 10,
		weight: 3,
	});
	const orderItem = new OrderItem({ item, amount: 2 });
	expect(orderItem.getTotal()).toBe(20);
});
