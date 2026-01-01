import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const debugBaseUrl: string = 'http://localhost:8080/api'
const prodBaseUrl: string = 'https://ai-geek.top/api'

export const customAxios = axios.create({
  baseURL: prodBaseUrl,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export async function post(url: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
  return await customAxios.post(url, data, config)
}
