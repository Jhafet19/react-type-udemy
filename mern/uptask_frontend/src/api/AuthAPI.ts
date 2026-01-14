import api from "@/lib/axios.ts";
import {isAxiosError} from "axios";
import {
    ConfirmToken,
    ForgotPasswordForm, NewPasswordForm,
    RequestConfirmationCodeForm, User,
    UserLoginForm,
    UserRegistrationForm, userSchema
} from "@/types/index.ts";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData)
        console.log("🚀 ~ authenticateUser ~ data: ", data);
        localStorage.setItem('AUTH_TOKEN', data)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }

}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }

}

export async function updatePasswordWithToken({formData, token}: {
    formData: NewPasswordForm,
    token: ConfirmToken['token']
}) {
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }

}

export async function getUser() {
    console.log('Hola desde getuser')
    try {
        const {data} = await api<User>('/auth/user')
    
        return data
    } catch (e) {
        if (isAxiosError(e) && e.response)
            throw new Error(e.response.data.error)
    }
}