type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type ApiError = {
  detail?: string
}

export interface RequestOptions<TRequest> {
  body?: TRequest
  method?: HttpMethod
  headers?: Record<string, string>
  next?: { tags?: string[]; revalidate?: false | 0 | number }
}
