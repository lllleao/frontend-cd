const formatDate = (dateIso: string) => {
    const data = new Date(dateIso)
    const dateFormated = data.toLocaleString("pt-br", {timeZone: "UTC"})
    console.log(dateFormated)
    return dateFormated.slice(0, 10)
}

export default formatDate
