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
    const cepScape = cep.replace(/\D/g, '')
    const isNameValid = name && name.length > 3 && name.includes(' ')
    const isCpfValid = cpfValidator(cpf)
    const isCepValid = cepScape.length === 8
    const isStreetValid = street.length <= 40
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
