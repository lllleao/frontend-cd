import { BrowserRouter } from 'react-router-dom'
import Footer from './containers/Footer'
import GlobalStyle from './globalStyles'
import Rotas from './routes'
import { Provider } from 'react-redux'
import store from './store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <GlobalStyle />
                <Rotas />
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
 