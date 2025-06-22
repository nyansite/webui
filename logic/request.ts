import axios from "axios"

const _axios = axios.create({
    baseURL: "https://ai-geek.top/api"
})

export async function get(url: string, config: Record<string, any>) {
    const resp = await _axios.get(url, config)
    return resp.data
}

export async function post(url: string, data?: Record<string, any>, config?: Record<string, any>) {
    const resp = await _axios.post(url, data, config)
    return resp.data
}