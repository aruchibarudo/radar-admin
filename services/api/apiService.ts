import { RequestOptions } from '@/services/api/types'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

class ApiService {
  static async request<TResponse = unknown, TRequest = unknown>(
    endpoint: string,
    { body, method = 'GET', headers = {}, next }: RequestOptions<TRequest> = {},
  ): Promise<TResponse> {
    const config: RequestInit = {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body:
        body !== undefined
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
    }

    try {
      const authToken = null
      const url = new URL(`${baseUrl}${endpoint}`)

      const headers = {
        ...config.headers,
        ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      }

      const response = await fetch(url, {
        ...config,
        headers,
        next: { ...next },
        cache: 'no-cache',
      })

      if (!response.ok) {
        const errorBody = await response.text()

        if (response.status === 401) {
          throw new Error('Unauthorized')
        }

        try {
          const errorData = JSON.parse(errorBody)
          const errorMessage =
            errorData.message || 'Server responded with an error'
          throw new Error(errorMessage)
        } catch (err) {
          console.error('api err', err)
          throw new Error(errorBody || 'Server responded with an error')
        }
      }

      return response.status === 200
        ? response.body &&
          response.headers.get('Content-Type')?.includes('application/json')
          ? await response.json()
          : {}
        : null
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  static get<TResponse = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions<null>, 'body' | 'method'>,
  ) {
    return this.request<TResponse, null>(endpoint, {
      ...options,
      method: 'GET',
    })
  }

  static post<TResponse = unknown, TRequest = unknown>(
    endpoint: string,
    options?: RequestOptions<TRequest>,
  ) {
    return this.request<TResponse, TRequest>(endpoint, {
      ...options,
      method: 'POST',
    })
  }

  static patch<TResponse = unknown, TRequest = unknown>(
    endpoint: string,
    options?: RequestOptions<TRequest>,
  ) {
    return this.request<TResponse, TRequest>(endpoint, {
      ...options,
      method: 'PATCH',
    })
  }

  static delete<TResponse = unknown>(
    endpoint: string,
    options?: RequestOptions<null>,
  ) {
    return this.request<TResponse, null>(endpoint, {
      ...options,
      method: 'DELETE',
    })
  }

  static put<TResponse = unknown, TRequest = unknown>(
    endpoint: string,
    options?: RequestOptions<TRequest>,
  ) {
    return this.request<TResponse, TRequest>(endpoint, {
      ...options,
      method: 'PUT',
    })
  }
}

export default ApiService
