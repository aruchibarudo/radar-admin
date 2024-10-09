import { SnackBarItemProps } from '@consta/uikit/SnackBar'

export enum SnackbarActionType {
  Add = 'add',
  Remove = 'remove',
}

export type SnackbarItem = Pick<SnackBarItemProps, 'message' | 'status' | 'key'>

export type SnackbarAddProps = Pick<SnackBarItemProps, 'message' | 'status'>

export type SnackbarContextProps = {
  addSnackbar: ({ message, status }: SnackbarAddProps) => void
}

export type SnackbarReducerProps = {
  state: SnackbarItem[]

  action: {
    item: SnackbarItem
    type: SnackbarActionType
  }
}
