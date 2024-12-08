// export const saveState = (bookState: any) => {
//     try {
//         localStorage.setItem('items', JSON.stringify(bookState))
//     } catch (err) {
//         console.error('Erro ao salvar', err)
//     }
// }

// export const loadState = () => {
//     try {
//         const statesLocal = localStorage.getItem('items')

//         if (!statesLocal) return undefined
//         return JSON.parse(statesLocal)
//     } catch (err) {
//         console.error("Erro ao carregar do localStorage:", err)
//         return undefined
//     }
// }
