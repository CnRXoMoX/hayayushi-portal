import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, Box } from '@chakra-ui/react'

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
        <link href="https://db.onlinewebfonts.com/c/2da952d097bffd198ec0f0aa3fdd6804?family=JejuHallasan" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Orbitron" />
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
        <link href="https://fonts.googleapis.com/css2?family=Jockey+One" rel="stylesheet" />
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