import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Books from './pages/Books'
import LoginOrSign from './pages/LoginOrSign'
import Profile from './components/Profile'
import ProductsListCart from './components/ProductsListCart'
import Checkout from './components/Checkout'
import Pix from './components/Pix'
import AddressEdit from './components/AddressEdit'

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store/:id" element={<Books />} />
            <Route path="/login" element={<LoginOrSign />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<ProductsListCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pix" element={<Pix />} />
            <Route path="/address" element={<AddressEdit />} />
        </Routes>
    )
}

export default Rotas
