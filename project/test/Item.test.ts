import Item from "../src/Item";

test('When pass valid parameters, expect to create correctly item', function () {
	const item = new Item({
		description: 'some description',
		price: 10.90,
	});

	expect(item.description).toBe('some description');
	expect(item.price).toBe(10.90);
});