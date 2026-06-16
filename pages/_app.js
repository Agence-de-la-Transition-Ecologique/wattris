import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'
import localFont from 'next/font/local'

import { GlobalStyle } from 'utils/styles'

import { StyleProvider } from 'components/providers/StyleProvider'
import { ModalProvider } from 'components/providers/ModalProvider'
import { DataProvider } from 'components/providers/DataProvider'

const marianne = localFont({
  src: [
    {
      path: '../public/fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
      display: 'swap',
    },
    {
      path: '../public/fonts/Marianne-Medium.woff2',
      weight: '500',
      style: 'normal',
      display: 'swap',
    },
    {
      path: '../public/fonts/Marianne-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
      display: 'swap',
    }
  ],
})

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryParamProvider className={marianne.className} adapter={NextAdapter}>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <DataProvider>
            <ModalProvider>
              <GlobalStyle />
              <Component {...pageProps} />
            </ModalProvider>
          </DataProvider>
        </StyleProvider>
      </QueryClientProvider>
    </QueryParamProvider>
  )
}

export default MyApp
