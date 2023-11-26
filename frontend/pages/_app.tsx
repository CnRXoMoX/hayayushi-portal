import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import NavBar from '@/components/navbar/navbar'
import ChakraTheme from '@/styles/chakra-theme'
import { AuthProvider } from '@/context/AuthProvider'
import AuthChecks from '@/context/AuthChecks'
import { useAuth } from '@/context/AuthProvider'

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={ChakraTheme}>
      <Head>
        <meta charSet='utf-8' />
        <link rel="icon" href="@/public/favicon.png" />
        <title>Hayayushi Job Portal</title>
      </Head>
      <AuthProvider>
        <AuthChecks>
            <NavBar />
            <Component {...pageProps} />
        </AuthChecks>
      </AuthProvider>
    </ChakraProvider>
)

export default App