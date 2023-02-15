import axios from "axios"

export function useLogin(api: any) {
    const requestLogin = async (email: string) => {
        let res: any

        // await api
        //     .connect(
        //         "account",
        //         {
        //             _email: email,
        //         },
        //         undefined,
        //         true
        //     )
        //     .then((res: any) => {
        //         data = res
        //     })
        //     .catch((res: any) => {
        //         data = res
        //     })

        await axios
            .request({
                url: "http://vendus-pt/ws/v1.2/account/",
                method: "GET",
                params: {
                    _email: email,
                },
            })
            .then((response) => (res = response))
            .catch((error) => (res = error.response))
        return res
    }

    const login = async (email: string, pwd: string, saas: number) => {
        let res: any
        // await api
        //     .connect(
        //         "account",
        //         {
        //             _email: email,
        //             _password: pwd,
        //             _saas: saas,
        //             _origin: "kds",
        //         },
        //         undefined,
        //         true
        //     )
        //     .then((res: any) => {
        //         data = res
        //     })
        //     .catch(() => {
        //         return {
        //             errors: [{ message: "Ocorreu um erro. #A0102" }],
        //         }
        //     })

        await axios
            .request({
                url: "http://vendus-pt/ws/v1.2/account/",
                method: "GET",
                params: {
                    _email: email,
                    _password: pwd,
                    _saas: saas,
                    _origin: "kds",
                },
            })
            .then((response) => (res = response))
            .catch((error) => (res = error.response))
        return res
    }

    const verifyPermission = async (apikey: string) => {
        let res: any
        // await api
        //     .connect(
        //         "account",
        //         {
        //             api_key: apikey,
        //         },
        //         undefined,
        //         true
        //     )
        //     .then((res: any) => {
        //         data = res
        //     })
        //     .catch(() => {
        //         return {
        //             errors: [{ message: "Ocorreu um erro. #A0102" }],
        //         }
        //     })

        await axios
            .request({
                url: "http://vendus-pt/ws/v1.2/account/",
                method: "GET",
                params: {
                    api_key: apikey,
                },
            })
            .then((response) => (res = response))
            .catch((error) => (res = error.response))
        return res
    }

    return {
        requestLogin: requestLogin,
        login: login,
        verifyPermission: verifyPermission,
    }
}
