import Dimension from "../../src/domain/entity/Dimension";

test('When create dimension, expect calculate volume correctly', function () {
	const dimension = new Dimension({
		height: 20,
		width: 15,
		depth:  10,
	});

	expect(dimension.getVolume()).toBe(0.003);
});