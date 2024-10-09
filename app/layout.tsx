'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

import './globals.css'

import ModalProvider from '@/components/ui/modal/ModalProvider'
import SnackbarProvider from '@/components/ui/snackbar/SnackbarProvider'
import { Children } from '@/types/nextParams'

const queryClient = new QueryClient()

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body>
        <div className="container p-4">
          <Theme preset={presetGpnDefault}>
            <QueryClientProvider client={queryClient}>
              <ModalProvider>
                <SnackbarProvider>{children}</SnackbarProvider>
              </ModalProvider>
            </QueryClientProvider>
          </Theme>
        </div>
      </body>
    </html>
  )
}
