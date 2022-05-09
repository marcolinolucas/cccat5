export default class Cpf {
	private FIRST_DIGIT_FACTOR = 9;
	private SECOND_DIGIT_FACTOR = 10;

	private cpf: string;

	constructor (cpf: string) {
		if (!this.isValid(cpf)) throw new Error('Invalid cpf');
		this.cpf = this.sanitize(cpf);
	}

	getValue() {
		return this.cpf;
	}

	private sanitize(cpf: string) {
		return cpf.replace(/[\.\-]/g, '');
	}
	
	private allDigitsAreSame(cpf: string) {
		return cpf.split('').every(digit => digit === cpf[0])
	}

	private outOfLength(cpf: string) {
		return cpf.length !== 11
	}

	private getDigitCheckerOfSum({ digitsSum }: { digitsSum: number}) {
		const restOfDivision = digitsSum % 11;
		if (restOfDivision < 2) return 0;
		const cpfSize = 11;
		return cpfSize - restOfDivision;
	}

	private mountDigitChecker({ cpf, checkSize }: { cpf: string, checkSize: number }) {
		const digits = cpf.substring(0, checkSize).split('').map(digit => parseInt(digit, 10));
		const reversedDigits = digits.slice().reverse();
		const sumDigits = reversedDigits.reduce((sum, digit, index) => {
			const multiplication = digit * (index + 2)
			return sum + multiplication
		}, 0)

		return this.getDigitCheckerOfSum({ digitsSum: sumDigits });
	}

	private checkFirstDigitChecker(cpf: string) {
		return this.mountDigitChecker({ cpf, checkSize: this.FIRST_DIGIT_FACTOR });
	}

	private checkSecondDigitChecker(cpf: string) {
		return this.mountDigitChecker({ cpf, checkSize: this.SECOND_DIGIT_FACTOR });
	}

	private isValid(cpf: string): boolean {
		if (!cpf) return false;
		const sanitizedCpf = this.sanitize(cpf);
		if (this.outOfLength(sanitizedCpf)) return false;
		if (this.allDigitsAreSame(sanitizedCpf)) return false;
		const firstDigitChecker = this.checkFirstDigitChecker(sanitizedCpf);
		const cpfWithFirstDigitChecker = `${sanitizedCpf.substring(0, this.FIRST_DIGIT_FACTOR)}${firstDigitChecker}`
		const secondDigitChecker = this.checkSecondDigitChecker(cpfWithFirstDigitChecker);
		const last2DigitsOf = sanitizedCpf.slice(-2);
		return last2DigitsOf === `${firstDigitChecker}${secondDigitChecker}`;
	}
}