import { createContext, Reducer, useReducer } from 'react'

import { SnackBar } from '@consta/uikit/SnackBar'

import { ModalContext } from '@/components/ui/modal/ModalProvider'
import {
  SnackbarActionType,
  SnackbarAddProps,
  SnackbarContextProps,
  SnackbarReducerProps,
} from '@/components/ui/snackbar/types'
import { snackbarReducer } from '@/components/ui/snackbar/utils'
import { Children } from '@/types/nextParams'

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
)
ModalContext.displayName = 'SnackbarContext'

const SnackbarProvider = ({ children }: Children) => {
  const [items, dispatchItems] = useReducer<
    Reducer<SnackbarReducerProps['state'], SnackbarReducerProps['action']>
  >(snackbarReducer, [])

  const addSnackbar = ({ message, status }: SnackbarAddProps) => {
    const key = items.length + 1
    const item = {
      key,
      message,
      status,
    }

    dispatchItems({ type: SnackbarActionType.Add, item })
  }

  return (
    <SnackbarContext.Provider
      value={{
        addSnackbar,
      }}
    >
      {children}

      <div className="fixed bottom-2 right-2">
        <SnackBar
          onItemClose={(item) =>
            dispatchItems({ type: SnackbarActionType.Remove, item })
          }
          getItemAutoClose={() => 5}
          items={items}
        />
      </div>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
