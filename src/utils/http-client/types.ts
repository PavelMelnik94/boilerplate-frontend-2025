export interface IHttpResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface IHttpError {
  message: string
  status?: number
  code?: string
}

export interface IRequestConfig {
  headers?: Record<string, string>
  params?: Record<string, unknown>
  timeout?: number
  withCredentials?: boolean
}

export interface IHttpClient {
  get: <T = Record<string, unknown>>(url: string, config?: IRequestConfig) => Promise<IHttpResponse<T>>
  post: <T = Record<string, unknown>>(
    url: string,
    data?: unknown,
    config?: IRequestConfig,
  ) => Promise<IHttpResponse<T>>
  put: <T = Record<string, unknown>>(url: string, data?: unknown, config?: IRequestConfig) => Promise<IHttpResponse<T>>
  patch: <T = Record<string, unknown>>(
    url: string,
    data?: unknown,
    config?: IRequestConfig,
  ) => Promise<IHttpResponse<T>>
  delete: <T = Record<string, unknown>>(url: string, config?: IRequestConfig) => Promise<IHttpResponse<T>>
  head: <T = Record<string, unknown>>(url: string, config?: IRequestConfig) => Promise<IHttpResponse<T>>
}
