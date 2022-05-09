import Cpf from "../../src/domain/entity/Cpf";

test('When cpf is empty string, expect throw invalid cpf', function () {
	expect(() => new Cpf('')).toThrow(new Error('Invalid cpf'));
});

test('When cpf is big, expect throw invalid cpf', function () {
	expect(() => new Cpf('111111111111')).toThrow(new Error('Invalid cpf'));
});

test('When cpf has every same digit, expect throw invalid cpf', function () {
	expect(() => new Cpf('11111111111')).toThrow(new Error('Invalid cpf'));
});

test('When cpf is invalid, expect throw invalid cpf', function () {
	expect(() => new Cpf('11265327465')).toThrow(new Error('Invalid cpf'));
});

test('When cpf is invalid with points, expect throw invalid cpf', function () {
	expect(() => new Cpf('323.234.830-03')).toThrow(new Error('Invalid cpf'));
});

test('When cpf is valid, expect return the same value passed', function () {
	const cpf = new Cpf('57025163031');
	expect(cpf.getValue()).toBe('57025163031')
});

test('When cpf is valid with points, expect return true', function () {
	const cpf = new Cpf('570.251.630-31');
	expect(cpf.getValue()).toBe('57025163031')
});