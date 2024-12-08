import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Books from "./pages/Books"
import ProductsListCart from "./components/ProductsListCart"
import LoginOrSign from "./pages/LoginOrSign"
import Profile from "./components/Profile"
import Checkout from "./components/Checkout"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store-books/:id" element={<Books />} />
            <Route path="/login" element={<LoginOrSign />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<ProductsListCart />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    )
}

export default Rotas
