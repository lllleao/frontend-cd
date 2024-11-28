import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Books from "./pages/Books"
import User from "./pages/User"
import ProductsListCart from "./components/ProductsListCart"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store-books/:id" element={<Books />} />
            <Route path="/user" element={<User />} />
            <Route path="/cart" element={<ProductsListCart />} />
        </Routes>
    )
}

export default Rotas
