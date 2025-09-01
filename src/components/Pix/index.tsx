import { useState } from 'react'
import ButtonPurchase from '@/components/ButtonPurchase'
import { ButtonCopyPaste, PixContainer } from './styles'

const Pix = () => {
    const qrcode = localStorage.getItem('qrCode') as string
    const copyPaste = localStorage.getItem('copPaste') as string
    const [isItemAdd, setIsItemAdd] = useState(false)

    const handleCopy = () => {
        const textQrCode = String(copyPaste)
        navigator.clipboard.writeText(textQrCode)
        setIsItemAdd(!isItemAdd)
        setTimeout(() => {
            setIsItemAdd(false)
        }, 2000)
    }
    return (
        <>
            <PixContainer>
                <div className="container">
                    <div className="pix-code">
                        <img srcSet={qrcode} />
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
                        PEDIDO. Você receberá um email com os detalhes da sua
                        compra.
                    </p>
                    <ButtonPurchase>Acompanhar Pedido</ButtonPurchase>
                </div>
            </PixContainer>
        </>
    )
}

export default Pix
