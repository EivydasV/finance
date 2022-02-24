import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Box from '@mui/material/Box'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../styles/mui/theme'
import createEmotionCache from '../styles/mui/createEmotionCache'
import Header from '../components/Header'
import { AuthProvider } from '../context/AuthContext'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000/api/v1/'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
          <Header />
          <Box paddingTop={12}>
            <Component {...pageProps} />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
