import { Informer } from '@consta/uikit/Informer'

import { parseError } from '@/utils/error'

const ErrorInformer = ({ error }: { error: unknown }) => {
  return (
    <Informer
      status="alert"
      view="filled"
      title="Возникла ошибка"
      label={parseError(error)}
    />
  )
}

export default ErrorInformer
