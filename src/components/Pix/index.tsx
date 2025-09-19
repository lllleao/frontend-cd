import { useEffect, useState } from 'react'
import { ButtonCopyPaste, PixContainer } from './styles'
import {
    useLazyIsPaidQuery,
    useLazyPayWithPixQuery,
    useLazyDeleteAllItemsQuery
} from '@/services/api'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import { updateNumberCart } from '@/store/reducers/cart'
import { isLoginAndCsrf } from '@/utils'
import useRefreshToken from '@/hooks/useRefreshToken'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { useDispatch } from 'react-redux'
import { removeFromCache } from '@/utils/cacheConfig'

const Pix = () => {
    const refresheTokenFunction = useRefreshToken()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [getPixInfos, { data, isFetching }] = useLazyPayWithPixQuery()
    const [getIsPaid, { isFetching: fetchingIsPaid }] = useLazyIsPaidQuery()
    const [deleteAllItems] = useLazyDeleteAllItemsQuery()
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string
    const logado = localStorage.getItem('logado')
    const [isItemAdd, setIsItemAdd] = useState(false)
    const [isPaymentWarn, setIsPaymentDoneWarn] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(data?.copyPastePix as string)
        setIsItemAdd(!isItemAdd)
        setTimeout(() => {
            setIsItemAdd(false)
        }, 2000)
    }

    const handleSeePurchasePaid = () => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getIsPaid(csrfToken).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    getIsPaid(csrfToken).then((response) => {
                        if (response.data) {
                            deleteAllItems(csrfToken).then((resDelete) => {
                                if (resDelete.error) {
                                    return refresheTokenFunction(
                                        resDelete,
                                        () => {
                                            deleteAllItems(csrfToken).then(
                                                () => {
                                                    if (res.data) {
                                                        return navigate(
                                                            '/profile'
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    )
                                }
                                return navigate('/profile')
                            })
                            setIsPaymentDoneWarn(true)
                            setTimeout(() => setIsPaymentDoneWarn(false), 2000)
                        }
                    })
                })
            }
            if (res.data) {
                if (!res.data.status) {
                    deleteAllItems(csrfToken).then((resDelete) => {
                        if (resDelete.error) {
                            return refresheTokenFunction(resDelete, () => {
                                deleteAllItems(csrfToken).then(() => {
                                    if (res.data) {
                                        removeFromCache('numberCart')
                                        dispatch(updateNumberCart(0))
                                        return navigate('/profile')
                                    }
                                })
                            })
                        }
                        dispatch(updateNumberCart(0))
                        removeFromCache('numberCart')
                        return navigate('/profile')
                    })
                }
                setIsPaymentDoneWarn(true)
                setTimeout(() => setIsPaymentDoneWarn(false), 2000)
            }
        })
    }

    useEffect(() => {
        if (!isLoginAndCsrf(logado, csrfToken)) return
        getPixInfos(csrfToken).then((res) => {
            if (res.error) {
                return refresheTokenFunction(res, () => {
                    getPixInfos(csrfToken).then((response) => {
                        if (response.data) {
                            if (response.data.qrCodeBase64 === 'undefined') {
                                navigate('/')
                            }
                        }
                    })
                })
            }
            if (res.data) {
                if (res.data.qrCodeBase64 === 'undefined') {
                    dispatch(updateNumberCart(0))
                    navigate('/')
                }
            }
        })
        // eslint-disable-next-line reactHooksPlugin/exhaustive-deps
    }, [csrfToken, logado])

    return (
        <>
            <PixContainer>
                <div className="container">
                    <div className="pix-code">
                        {isFetching ? (
                            <Loader isCircle />
                        ) : (
                            <img srcSet={data?.qrCodeBase64} />
                        )}
                        <ButtonCopyPaste
                            $isItemAdd={isItemAdd}
                            onClick={handleCopy}
                        >
                            Copiar PIX COPIA-COLA
                        </ButtonCopyPaste>
                    </div>
                    <p>
                        O QRCODE IRÁ VENCER EM 30 MINUTOS
                        <br />
                        <br />
                        Depois de efetuar o pagamento, clique em ACOMPANHAR
                        PEDIDO, você será redirecionade ao seu perfil. Você
                        receberá um email com os detalhes da sua compra. Se não
                        recebeu o email VERIFIQUE A CAIXA DE SPAM.
                    </p>
                    <ButtonCopyPaste
                        className={`${isPaymentWarn && 'not-paid'} ${fetchingIsPaid && 'is-fetching'}`}
                        onClick={handleSeePurchasePaid}
                        disabled={fetchingIsPaid}
                    >
                        {isPaymentWarn
                            ? 'Pedido sendo processado'
                            : 'Acompanhar Pedido'}
                    </ButtonCopyPaste>
                    {fetchingIsPaid ? <Loader isCircle /> : <></>}
                </div>
            </PixContainer>
        </>
    )
}

export default Pix
