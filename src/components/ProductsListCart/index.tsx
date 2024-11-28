import { ButtonCart, ItemsOnCart, ProductsListCartContainer } from "./styles"
import Header from "../../containers/Header"
import { useGetItemsCartQuery, useGetRemoveItemMutation } from "../../services/api"

const ProductsListCart = () => {
    const { data, refetch } = useGetItemsCartQuery()
    const [deleteCartItem] = useGetRemoveItemMutation()

    const handleDelete = (id: string | undefined) => {
        id && deleteCartItem(id)
            .unwrap()
            .then(() => {
                refetch()
                console.log('Item removido do carrinho com sucesso')
            })
            .catch((error) => console.error('Erro ao remover item:', error))
    }

    return (
        <>
            <Header />
            <ProductsListCartContainer>
                <div className="container">
                    <ItemsOnCart>
                        <h3>ITENS NO CARRINHO</h3>
                        <div className="bar" />
                        <ul>
                            {
                                data && data.items.map(({ id, photo, price, name }) => (
                                    <li key={id}>
                                        <div className="img-delete">
                                            <img src={photo} alt="item cart" />
                                            <i className="fa-solid fa-trash" onClick={() => handleDelete(id)} />
                                        </div>
                                        <div>{name}</div>
                                        <div className="price">
                                            R$ {price},00
                                        </div>
                                        <div className="total-price">
                                            Valor total: R$ {price},00
                                        </div>
                                        <ButtonCart>Comprar agora</ButtonCart>
                                    </li>
                                ))
                            }
                        </ul>
                    </ItemsOnCart>
                    <ItemsOnCart>
                        <h3>COMPRAS REALIZADAS</h3>
                        <div className="bar" />
                        <ul>
                            {
                                data && data.items.map(({ id, photo, price, name }) => (
                                    <li key={id}>
                                        <div className="img-delete">
                                            <img src={photo} alt="item cart" />
                                            <i className="fa-solid fa-trash" onClick={() => handleDelete(id)} />
                                        </div>
                                        <div>{name}</div>
                                        <div className="price">
                                            R$ {price},00
                                        </div>
                                        <div className="total-price">
                                            Valor total: R$ {price},00
                                        </div>
                                        <ButtonCart>Comprar agora</ButtonCart>
                                    </li>
                                ))
                            }
                        </ul>
                    </ItemsOnCart>
                </div>
            </ProductsListCartContainer>
        </>
    )
}

export default ProductsListCart
