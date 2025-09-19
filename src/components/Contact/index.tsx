/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useRef, useState } from 'react'
import { ContactContainer, ErrorMessage } from './styles'
import { authentic } from '@/utils'
import { handleBlur, handleFocus } from '@/utils/contactFunctions'
import { useSendEmailMutation } from '@/services/api'
import { useCsrfTokenStore } from '@/hooks/useFetchCsrfToken'
import {
    handleEmailUser,
    handleNameUser,
    handlePhoneUser,
    handleTextBox
} from '@/utils/handlersInput'

type DataEmail = {
    emailUser: string
    text: string
    name: string
    phone?: string
}

const Contact = () => {
    const csrfToken = useCsrfTokenStore((state) => state.csrfToken) as string

    const [sendEmailForm] = useSendEmailMutation()
    const [inputErrorName, setInputErrorName] = useState(false)
    const [inputErrorMessage, setInputErrorMessage] = useState(false)
    const [inputErrorEmail, setInputErrorEmail] = useState(false)
    const [inputErrorPhone, setInputErrorPhone] = useState(false)
    const [successForm, setSuccessForm] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    const [name, setName] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [text, setText] = useState('')
    const [phone, setPhone] = useState('')

    const [nameEmpty, setNameEmpty] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    const [numEmpty, setNumEmpty] = useState(false)

    const [messageSuccess, setMessageSuccess] = useState(true)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data: DataEmail = {
            emailUser: emailUser.trim(),
            text: text.trim(),
            name: name.trim(),
            ...(phone ? { phone: phone.replace(/[^\d]/g, '').trim() } : {})
        }

        const { nameIsValid, messageIsValid, emailIsValid, phoneIsValid } =
            authentic(emailUser, phone, name, text)

        emailIsValid ? setInputErrorEmail(false) : setInputErrorEmail(true)

        nameIsValid ? setInputErrorName(false) : setInputErrorName(true)

        messageIsValid
            ? setInputErrorMessage(false)
            : setInputErrorMessage(true)
        if (
            emailIsValid &&
            nameIsValid &&
            messageIsValid &&
            !successForm &&
            csrfToken
        ) {
            if (!phoneIsValid && phone) return
            setSuccessForm(true)

            sendEmailForm({
                csrfToken: csrfToken,
                data
            })
                .then(() => {
                    setName('')
                    setEmailUser('')
                    setPhone('')
                    setText('')

                    setNameEmpty(false)
                    setEmailEmpty(false)
                    setNumEmpty(false)

                    setMessageSuccess(false)
                    setTimeout(() => {
                        setSuccessForm(false)
                    }, 3000)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function handleClickPix() {
        setIsCopied(true)
        navigator.clipboard
            .writeText('cidadeclipse@gmail.com')
            .then(() => {
                setTimeout(() => {
                    setIsCopied(false)
                }, 2000)
            })
            .catch((err) => console.log(err))
    }

    return (
        <ContactContainer id="contact-us" className="contact-us container">
            <div className="pix">
                <h4>Colabore com a Cidadeclipse!</h4>
                <input
                    className={`input-pix ${isCopied && 'input-pix--is-copied'}`}
                    disabled
                    type="text"
                    value="cidadeclipse@gmail.com"
                />
                <a onClick={handleClickPix} className="button-pix">
                    COPIAR PIX{' '}
                    <svg
                        enableBackground="new 0 0 512 512"
                        xmlSpace="preserve"
                        viewBox="0 0 6.35 6.35"
                        y="0"
                        x="0"
                        height="20"
                        width="20"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="clipboard"
                    >
                        <g>
                            <path
                                fill="currentColor"
                                d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                            ></path>
                        </g>
                    </svg>
                </a>
            </div>
            <div className="contact-email">
                <div
                    className={`success ${successForm && 'success-is-active'}`}
                >
                    {messageSuccess ? 'Carregando...' : 'Enviado com sucesso'}
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    ref={formRef}
                    className="contact-email__form"
                >
                    <div
                        className={`text-field ${nameEmpty && 'text-field__input--empty'}`}
                    >
                        <input
                            value={name}
                            onBlur={(e) => handleBlur(e, setNameEmpty)}
                            onFocus={(e) => handleFocus(e, setNameEmpty)}
                            onChange={(e) =>
                                handleNameUser(
                                    e.target.value,
                                    setName,
                                    setInputErrorName
                                )
                            }
                            className={`text-field__input name input-num ${inputErrorName && 'text-field__input-is-error'}`}
                            type="text"
                        />
                        <label className="text-field__label">
                            Nome Completo
                        </label>
                    </div>
                    <div
                        className={`text-field ${emailEmpty && 'text-field__input--empty'}`}
                    >
                        <input
                            value={emailUser}
                            onBlur={(e) => handleBlur(e, setEmailEmpty)}
                            onFocus={(e) => handleFocus(e, setEmailEmpty)}
                            onChange={(e) =>
                                handleEmailUser(
                                    e.target.value,
                                    setEmailUser,
                                    setInputErrorEmail
                                )
                            }
                            className={`text-field__input email ${inputErrorEmail && 'text-field__input-is-error'}`}
                            type="text"
                        />
                        <label className="text-field__label">Email</label>
                    </div>
                    <div
                        className={`text-field ${numEmpty && 'text-field__input--empty'}`}
                    >
                        <input
                            value={phone}
                            onBlur={(e) => handleBlur(e, setNumEmpty)}
                            onFocus={(e) => handleFocus(e, setNumEmpty)}
                            onChange={(e) =>
                                handlePhoneUser(
                                    e.target.value,
                                    setPhone,
                                    setInputErrorPhone
                                )
                            }
                            className={`text-field__input number ${inputErrorPhone && 'text-field__input-is-error'}`}
                            type="text"
                            maxLength={16}
                        />
                        <label className="text-field__label">
                            Número (opcional)
                        </label>
                    </div>
                    <ErrorMessage $displayError={inputErrorMessage}>
                        A mensagem deve ter no mínimo 19 caracteres
                    </ErrorMessage>
                    <div className="text-field">
                        <textarea
                            value={text}
                            onChange={(e) =>
                                handleTextBox(
                                    e.target.value,
                                    setText,
                                    setInputErrorMessage
                                )
                            }
                            className={`text-field__textarea message ${inputErrorMessage && 'text-field__input-is-error'}`}
                            placeholder="Olá! Achei as edições incriveis e gostaria de colaborar."
                        ></textarea>
                    </div>
                    <button className="button-pix button-contact" type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </ContactContainer>
    )
}

export default Contact
