import { BrowserRouter, useLocation } from 'react-router-dom'
import Footer from './containers/Footer'
import GlobalStyle from './globalStyles'
import Rotas from './routes/routes'
import { Provider } from 'react-redux'
import store from './store'
import CartListenner from './components/CartListenner'
import { useCsrfTokenStore } from './hooks/useFetchCsrfToken'
import { useEffect } from 'react'
import ScrollToTop from './components/ScrollToTop'
import Header from './containers/Header'

function App() {
    const setLogged = useCsrfTokenStore((state) => state.setLogged)

    const fetchCsrfToken = useCsrfTokenStore((state) => state.fetchCsrfToken)

    useEffect(() => {
        fetchCsrfToken().catch(() => {
            setLogged(false)
            localStorage.removeItem('logado')
        })
        const interval = setInterval(
            () => {
                fetchCsrfToken().catch(() => {
                    setLogged(false)
                    localStorage.removeItem('logado')
                })
            },
            30 * 60 * 1000
        ) // A cada 30 min
        return () => clearInterval(interval)
    }, [fetchCsrfToken])

    function AppLayout() {
        const location = useLocation()
        const isPixRoute = location.pathname === '/pix-payment'

        return (
            <>
                <CartListenner />
                <GlobalStyle />
                <ScrollToTop />
                {!isPixRoute && <Header />}
                <main className="main">
                    <Rotas />
                </main>
                {!isPixRoute && <Footer />}
            </>
        )
    }

    return (
        <Provider store={store}>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <AppLayout />
            </BrowserRouter>
        </Provider>
    )
}

export default App
