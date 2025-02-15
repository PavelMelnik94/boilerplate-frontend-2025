import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { IHttpClient, IHttpError, IHttpResponse, IRequestConfig } from './types'

import { logger } from '@/utils/logger'
import axios from 'axios'

let client: AxiosInstance | null = null
let baseURL: string = '' /* Anchor */
let defaultTimeout: number = 10000 /* Anchor */

function configureHttpClient(config: { baseURL: string, timeout?: number }): void {
  baseURL = config.baseURL
  defaultTimeout = config.timeout ?? 10000

  client = axios.create({
    baseURL,
    timeout: defaultTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  setupInterceptors(client)
}

function setupInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config) => {
      logger.info(`🌐 HTTP Request: ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    async (error) => {
      logger.error('Request error:', error)
      return Promise.reject(normalizeError(error))
    },
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      logger.info(`✅ HTTP Response: ${response.status} ${response.config.url}`)
      return response
    },
    async (error) => {
      logger.error('Response error:', error)
      return Promise.reject(normalizeError(error))
    },
  )
}

function getClient(): AxiosInstance {
  if (!client) {
    throw new Error('HTTP Client not configured. Call configureHttpClient() first.')
  }
  return client
}

function convertConfig(config?: IRequestConfig): AxiosRequestConfig {
  return {
    headers: config?.headers,
    params: config?.params,
    timeout: config?.timeout,
    withCredentials: config?.withCredentials,
  }
}

function normalizeResponse<T>(response: AxiosResponse<T>): IHttpResponse<T> {
  const headers: Record<string, string> = {}
  const isValidHeaderName = (key: string): boolean => /^[a-z0-9-]+$/i.test(key)

  Object.entries(response.headers).forEach(([key, value]) => {
    if (value !== undefined && isValidHeaderName(key)) {
      const headerValue: string = Array.isArray(value) ? value.join(', ') : String(value)
      headers[key.toLowerCase()] = headerValue
    }
  })

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers,
  }
}

function normalizeError(error: unknown): IHttpError {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.response?.status,
      code: error.code,
    }
  }

  return {
    message: 'Unknown error occurred',
  }
}

async function get<T = Record<string, unknown>>(url: string, config?: IRequestConfig): Promise<IHttpResponse<T>> {
  const response = await getClient().get<T>(url, convertConfig(config))
  return normalizeResponse<T>(response)
}

async function post<T = Record<string, unknown>>(
  url: string,
  data?: unknown,
  config?: IRequestConfig,
): Promise<IHttpResponse<T>> {
  const response = await getClient().post<T>(url, data, convertConfig(config))
  return normalizeResponse<T>(response)
}

async function put<T = Record<string, unknown>>(
  url: string,
  data?: unknown,
  config?: IRequestConfig,
): Promise<IHttpResponse<T>> {
  const response = await getClient().put<T>(url, data, convertConfig(config))
  return normalizeResponse<T>(response)
}

async function patch<T = Record<string, unknown>>(
  url: string,
  data?: unknown,
  config?: IRequestConfig,
): Promise<IHttpResponse<T>> {
  const response = await getClient().patch<T>(url, data, convertConfig(config))
  return normalizeResponse<T>(response)
}

async function del<T = Record<string, unknown>>(url: string, config?: IRequestConfig): Promise<IHttpResponse<T>> {
  const response = await getClient().delete<T>(url, convertConfig(config))
  return normalizeResponse<T>(response)
}

async function head<T = Record<string, unknown>>(url: string, config?: IRequestConfig): Promise<IHttpResponse<T>> {
  const response = await getClient().head<T>(url, convertConfig(config))
  return normalizeResponse<T>(response)
}

export { configureHttpClient }
export const httpClient: IHttpClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  head,
}
