import React, {useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {NextAdapter} from 'next-query-params'
import {QueryParamProvider} from 'use-query-params'
import localFont from 'next/font/local'
import {GoogleTagManager} from '@next/third-parties/google'
import {GlobalStyle} from 'utils/styles'
import {StyleProvider} from 'components/providers/StyleProvider'
import {ModalProvider} from 'components/providers/ModalProvider'
import {DataProvider} from 'components/providers/DataProvider'

const marianne = localFont({
    src: [
        {
            path: '../public/fonts/Marianne-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/Marianne-Light_Italic.woff2',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../public/fonts/Marianne-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Marianne-Regular_Italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../public/fonts/Marianne-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/Marianne-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../public/fonts/Marianne-Bold_Italic.woff2',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../public/fonts/Marianne-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        }
    ],
})

function MyApp({Component, pageProps}) {
    const [queryClient] = useState(() => new QueryClient())
    const gtmId = process.env.NEXT_PUBLIC_ID_GTM || 'GTM-5BVCVHL7'

    return (
        <>
            <GoogleTagManager gtmId={gtmId}/>
            <QueryParamProvider className={marianne.className} adapter={NextAdapter}>
                <QueryClientProvider client={queryClient}>
                    <StyleProvider>
                        <DataProvider>
                            <ModalProvider>
                                <GlobalStyle/>
                                <Component {...pageProps} />
                            </ModalProvider>
                        </DataProvider>
                    </StyleProvider>
                </QueryClientProvider>
            </QueryParamProvider>
        </>
    )
}

export default MyApp
