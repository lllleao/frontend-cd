import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
// import Books from '../components/Books'
// import LoginOrSign from '../pages/LoginOrSign'
// import ProductsListCart from '../components/ProductsListCart'
// import Profile from '../components/Profile'
// import Checkout from '../components/Checkout'
// import Pix from '../components/Pix'
// import AddressEdit from '../components/AddressEdit'
// import { PrivateRoute } from './RouteGuards'

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/store/:id" element={<Books />} />
            <Route path="/login" element={<LoginOrSign />} />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/cart"
                element={
                    <PrivateRoute>
                        <ProductsListCart />
                    </PrivateRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>
                }
            />
            <Route
                path="/pix"
                element={
                    <PrivateRoute>
                        <Pix />
                    </PrivateRoute>
                }
            />
            <Route
                path="/address"
                element={
                    <PrivateRoute>
                        <AddressEdit />
                    </PrivateRoute>
                }
            /> */}
        </Routes>
    )
}

export default Rotas
