import { apiUrl } from ".."

const addToCart = (data: BooksCart) => {
    fetch(`${apiUrl}/addCart`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data.items[0])
    })
}

export default addToCart
