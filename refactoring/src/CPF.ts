export default class CPF {
	cpf: string;
	verifiedCpf: string;

	constructor (cpf: string) {
		this.cpf = cpf;
		this.verifiedCpf = '';
	}

	sanitize() {
		return this.cpf = this.cpf.replace(/[\.\-]/g, '');
	}
	
	allDigitsAreSame() {
		return this.cpf.split('').every(digit => digit === this.cpf[0])
	}

	outOfLength() {
		return this.cpf.length !== 11
	}

	getDigitCheckerOfSum({ digitsSum }: { digitsSum: number}) {
		const restOfDivision = digitsSum % 11;
		if (restOfDivision < 2) return 0;
		const cpfSize = 11;
		return cpfSize - restOfDivision;
	}

	mountDigitChecker({ cpf, checkSize }: { cpf: string, checkSize: number }) {
		const digits = cpf.substring(0, checkSize).split('').map(digit => parseInt(digit, 10));
		const reversedDigits = digits.slice().reverse();
		const sumDigits = reversedDigits.reduce((sum, digit, index) => {
			const multiplication = digit * (index + 2)
			return sum + multiplication
		}, 0)

		const digitChecker = this.getDigitCheckerOfSum({ digitsSum: sumDigits });
		this.verifiedCpf = `${digits.join('')}${digitChecker}`
	}

	checkFirstDigitChecker() {
		const firstDigitFactor = 9;
		this.mountDigitChecker({ cpf: this.cpf, checkSize: firstDigitFactor });
	}

	checkSecondDigitChecker() {
		const secondDigitFactor = 10;
		this.mountDigitChecker({ cpf: this.verifiedCpf, checkSize: secondDigitFactor });
	}

	isValid(): boolean {
		if (!this.cpf) return false;
		this.sanitize();
		if (this.outOfLength()) return false;
		if (this.allDigitsAreSame()) return false;
		this.checkFirstDigitChecker();
		this.checkSecondDigitChecker();
		return this.cpf === this.verifiedCpf;
	}
}