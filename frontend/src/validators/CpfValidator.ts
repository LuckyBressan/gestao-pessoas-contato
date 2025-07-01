/**
 * CPF Validator Class
 */
export default class CpfValidator {

    #cpf: string;

    /**
     * Constructs the CpfValidator class
     */
    constructor(cpf: string) {
        this.#cpf = cpf.replace(/\D+/g, '');
    }

    get value() {
        return this.#cpf;
    }

    /**
     * Checks if the CPF is a repeated sequence of the same digit
     */
    isSequence() {
        return this.value.charAt(0).repeat(11) === this.value;
    }

    /**
     * Generates one of the last digits of a CPF, based on the provided CPF array
     */
    static generateDigit(cpf: string[]) {
        const multiplier = Object.keys(new Array(cpf.length + 1).fill(null)).reverse();

        const sum = cpf.reduce((acc, val, idx) => {
            acc += (parseInt(val) * (parseInt(multiplier[idx]) + 1));
            return acc;
        }, 0);

        const result = 11 - (sum % 11);

        return String(result > 9 ? 0 : result);
    }

    /**
     * Validates if the CPF is valid
     * @returns {boolean}
     */
    validate() {
        if (
            !this.#cpf ||
            this.#cpf.length !== 11 ||
            this.isSequence()
        ) return false;

        let valid = false;

        const cpfArr = Array.from(this.#cpf).slice(0, -2);

        const firstDigit = CpfValidator.generateDigit(cpfArr);

        // If the first calculated digit is not equal to the penultimate digit, don't bother calculating the second
        if (firstDigit == this.#cpf.at(-2)) {
            cpfArr.push(firstDigit);
            // Calculate the second digit and check if it matches the last digit
            if (
                CpfValidator.generateDigit(cpfArr) == this.#cpf.at(-1)
            ) {
                valid = true;
            }
        }

        return valid;
    }
}