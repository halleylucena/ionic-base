import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { useHistory } from "react-router-dom"
import { isPlatform } from "@ionic/core/components"
import "./LoginPage.scss"
import { useEffect, useState } from "react"
import useStore from "../store/store"
import { useLogin } from "../logic/auth/useLogin"
import { useAuth } from "../logic/auth/useProvideAuth"
const logo = "/assets/img/vendus-pos-logo-horizontal.svg"

const LoginPage: React.FC = () => {
    const apiKey = useStore((state: any) => state.apiKey)
    const history = useHistory()
    const login = useLogin({})
    const auth = useAuth()
    const [showLoading, setShowLoading] = useState(false)
    const [loadingMessage, setloadingMessage] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [saas, setSaas] = useState(0)
    const [errors, setErrors] = useState<string[]>([])
    const [loginFields, setLoginFields] = useState(false)
    const [accountField, setAccountField] = useState(false)
    const [accounts, setAccounts] = useState<any[]>([])

    useEffect(() => {
        console.log("API KEY: ", apiKey)
        if (apiKey !== null) {
            history.push("/home")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (event: any) => {
        setErrors([])
        let newErrors: string[] = []
        event.preventDefault()

        if (email === "") {
            newErrors = ["Tem de introduzir o e-mail.", ...newErrors]
        } else {
            if (!loginFields) {
                setloadingMessage("A obter contas")
                setShowLoading(true)
                const req = await login.requestLogin(email)
                switch (req.status) {
                    case 200:
                        setAccounts(req.data)
                        if (req.data.length > 1) {
                            setAccountField(true)
                        } else {
                            setSaas(req.data[0]["saas_id"])
                        }
                        setLoginFields(true)
                        setShowLoading(false)
                        break
                    case 400:
                        if (req.data.errors) {
                            req.data.errors.forEach((error: any) => {
                                newErrors = [error.message, ...newErrors]
                            })
                        }
                        break
                    default:
                        newErrors = ["Ocorreu um erro, por favor tente novamente. #L0101", ...newErrors]
                        setShowLoading(false)
                        break
                }
            } else {
                setloadingMessage("A iniciar sessão")
                setShowLoading(true)
                if (password === "") {
                    newErrors = ["Tem de introduzir a password.", ...newErrors]
                }
                if (saas === 0) {
                    newErrors = ["Tem de selecionar uma conta.", ...newErrors]
                }

                const req = await login.login(email, password, saas)
                const returnData = await login.verifyPermission(req.data["api_key"])
                if (returnData.status === 400) {
                    newErrors = ["O seu plano atual não permite a utilização desta aplicação, Por favor, aceda ao Backoffice e subscreva um plano adequado.", ...newErrors]
                }

                if (newErrors.length <= 0) {
                    switch (req.status) {
                        case 200:
                            if (req.data["api_key"]) {
                                auth.signin(req.data["api_key"], () => {
                                    history.push("/home")
                                })
                            } else {
                                newErrors = ["Ocorreu um erro, por favor tente novamente. #L0102", ...newErrors]
                            }
                            break
                        case 400:
                            if (req.data.errors) {
                                req.data.errors.forEach((error: any) => {
                                    newErrors = [error.message, ...newErrors]
                                })
                            } else {
                                newErrors = ["Ocorreu um erro, por favor tente novamente. #L0103", ...newErrors]
                            }
                            break
                        default:
                            newErrors = ["Ocorreu um erro, por favor tente novamente. #L0104", ...newErrors]
                            break
                    }
                }
            }
        }
        setErrors(newErrors)
        setShowLoading(false)
    }

    return (
        <IonPage>
            <IonLoading isOpen={showLoading} message={loadingMessage} />
            <IonContent className="login__wrapper" fullscreen>
                <IonGrid className="h--100">
                    <IonRow className="h--100 a--center">
                        <IonCol size="12" sizeMd="6" sizeLg="4" offsetMd="1" offsetLg="2" className="ion-text-center">
                            {errors.length > 0 ? (
                                <ul className="alert">
                                    {errors.map((error: any, idx: number) => (
                                        <li key={`login-error-${idx}`}>{error}</li>
                                    ))}
                                </ul>
                            ) : (
                                ""
                            )}
                            <IonCard className="login__card">
                                <IonIcon className="login__logo" src={logo} />
                                <form onSubmit={handleSubmit}>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel position="stacked">E-Mail</IonLabel>
                                            <IonInput
                                                placeholder="E-Mail"
                                                className="ion-margin-top"
                                                name="email"
                                                value={email}
                                                onIonChange={(e: any) => {
                                                    setEmail(e.target.value)
                                                    setLoginFields(false)
                                                    setAccountField(false)
                                                    setSaas(0)
                                                    setPassword("")
                                                }}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem className={loginFields && accountField ? "" : "ion-hide"}>
                                            <IonLabel position="stacked">Conta</IonLabel>
                                            <IonSelect placeholder="Selecionar Conta" cancelText="Cancelar" value={saas} onIonChange={(e: any) => setSaas(e.target.value)}>
                                                {accounts.map((account: any, id: number) => (
                                                    <IonSelectOption key={`saas-item-${account["saas_id"]}`} value={account["saas_id"]}>
                                                        {account.company} - {`${account["seo_url"]}.vendus.pt`}
                                                    </IonSelectOption>
                                                ))}
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem className={loginFields ? "" : "ion-hide"}>
                                            <IonLabel position="stacked">Password</IonLabel>
                                            {!isPlatform("ios") ? (
                                                <a className="login__forgot" href="https://www.vendus.pt/recuperar-password/">
                                                    Recuperar Password
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                            <IonInput type="password" className="ion-margin-top" placeholder="Password" name="password" value={password} onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                                        </IonItem>

                                        <IonButton type="submit" className="login__btn" expand="block">
                                            Iniciar Sessão
                                        </IonButton>
                                    </IonList>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default LoginPage
