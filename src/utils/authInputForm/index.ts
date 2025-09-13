import { nameVerify } from '../inputfields'

export const authForms = (
    name: string,
    cep: string,
    cpf: string,
    street: string,
    neighborhood: string,
    complement: string,
    number: string,
    cpfValidator: (cpf: string) => boolean
) => {
    const cepRegex = /^\d{8}$/
    const streetRegex = /^(?!\d+$).{1,40}$/
    const cepScape = cep.replace(/\D/g, '')
    const isNameValid = nameVerify(name)
    const isCpfValid = cpfValidator(cpf)
    const isCepValid = cepRegex.test(cepScape)
    const isStreetValid = streetRegex.test(street)
    const isNeighborhoodValid = neighborhood.length <= 40
    const isComplementValid = complement.length <= 40 || complement.length === 0
    const isNumberValid = number.length <= 6

    return {
        isNameValid,
        isCpfValid,
        isCepValid,
        isStreetValid,
        isNeighborhoodValid,
        isComplementValid,
        isNumberValid
    }
}
