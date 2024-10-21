import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

export type Refetch = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
}
