import { BrowserRouter } from 'react-router-dom'
import Footer from './containers/Footer'
import GlobalStyle from './globalStyles'
import Rotas from './routes'
import { Provider } from 'react-redux'
import store from './store'
import CartListenner from './components/CartListenner'
import { useCsrfTokenStore } from './hooks/useFetchCsrfToken'
import { useEffect } from 'react'

function App() {

    const fetchCsrfToken = useCsrfTokenStore((state) => state.fetchCsrfToken)

    useEffect(() => {
        fetchCsrfToken()
        const interval = setInterval(() => {
            fetchCsrfToken()
        }, 30 * 60 * 1000) // A cada 30 min
        return () => clearInterval(interval)
    }, [fetchCsrfToken])

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
