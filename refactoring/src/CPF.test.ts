import CPF from './CPF';

test('When cpf is null, expect return false', function () {
	const cpf = new CPF('');
	const isValid = cpf.isValid();
	expect(isValid).toBe(false);
});

test('When cpf is big, expect return false', function () {
	const cpf = new CPF('111111111111');
	const isValid = cpf.isValid();
	expect(isValid).toBe(false);
});

test('When cpf is invalid, expect return false', function () {
	const cpf = new CPF('11265327465');
	const isValid = cpf.isValid();
	expect(isValid).toBe(false);
});

test('When cpf has every same digit, expect return false', function () {
	const cpf = new CPF('11111111111');
	const isValid = cpf.isValid();
	expect(isValid).toBe(false);
});

test('When cpf is invalid with points, expect return false', function () {
	const cpf = new CPF('323.234.830-03');
	const isValid = cpf.isValid();
	expect(isValid).toBe(false);
});

test('When cpf is valid, expect return true', function () {
	const cpf = new CPF('57025163031');
	const isValid = cpf.isValid();
	expect(isValid).toBe(true);
});

test('When cpf is valid with points, expect return true', function () {
	const cpf = new CPF('570.251.630-31');
	const isValid = cpf.isValid();
	expect(isValid).toBe(true);
});