const formatDate = (dateIso: string) => {
    const data = new Date(dateIso)
    const dateFormated = data.toLocaleString('pt-br', { timeZone: 'UTC' })
    return dateFormated.slice(0, 10)
}

export default formatDate
