import Dimension from "../src/Dimension";
import Product from "../src/Product";

test('When create product with dimension, expect to return correctly volume', function () {
	const productDimension = new Dimension({
		height: 20,
		width: 15,
		depth:  10,
	})
	const product = new Product({
		description: 'some description',
		price: 10.90,
		dimension: productDimension,
		weight: 1,
	});

	expect(product.description).toBe('some description');
	expect(product.price).toBe(10.90);
	expect(product.getVolume()).toBe(0.003);
	expect(product.getDensity()).toBe(333);
});