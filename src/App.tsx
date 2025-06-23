import { BrowserRouter } from 'react-router-dom'
import Footer from './containers/Footer'
import GlobalStyle from './globalStyles'
import Rotas from './routes'
import { Provider } from 'react-redux'
import store from './store'
import CartListenner from './components/CartListenner'
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <CartListenner />
                <GlobalStyle />
                <Rotas />
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
