import axios, { AxiosRequestConfig } from "axios"

export const customAxios = axios.create({
    baseURL: "https://ai-geek.top/api",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
})

export async function post(url: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
    return await customAxios.post(url, data, config)
}