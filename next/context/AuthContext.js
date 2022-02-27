import React, { useContext, useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(false)
  const [error, setError] = useState(null)
  const [serverError, setServerError] = useState(false)
  const [validationError, setValidationError] = useState(null)

  const router = useRouter()
  const me = async () => {
    setLoading(true)
    try {
      const res = await axios.get('user/me')
      setCurrentUser(res.data)
    } catch (e) {
      if (e.response.status !== 401) {
        setServerError(true)
      }
    }
    setLoading(false)
  }
  const signUp = async (values) => {
    setLoading(true)
    try {
      const res = await axios.post('user', values)
      setValidationError(null)
      setError(null)
      router.replace(`/login?message=${res.data.message}`)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  const login = async (values) => {
    setLoading(true)

    try {
      await axios.post('user/login', values)
      await me()
      router.replace(`/`)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }
  const createPlusFinance = async (values) => {
    setLoading(true)
    try {
      await axios.post('finance/create-plus', values)
      router.replace(`/`)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }
  const createMinusFinance = async (values) => {
    setLoading(true)
    try {
      await axios.post('finance/create-minus', values)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    try {
      await axios.post('user/logout')
      setCurrentUser(null)
      router.replace('/login')
    } catch (e) {
      if (e.response.status !== 401) {
        setError(e)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    setInitialLoading(true)
    me()
    setInitialLoading(false)
  }, [])

  useEffect(() => {
    if (error?.response?.status.toString().startsWith('5')) {
      setServerError(true)
    }
    console.log({ error })
    if (error?.response?.status === 422) setValidationError(error.response.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  console.log(currentUser)
  const value = {
    currentUser,
    login,
    signUp,
    logout,
    loading,
    error,
    validationError,
    createPlusFinance,
    createMinusFinance,
  }
  if (serverError) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <Typography
          variant='h1'
          fontWeight='fontWeightMedium'
          letterSpacing={2}
          color='error'
        >
          Something went wrong on the server side
        </Typography>
      </Box>
    )
  }
  return (
    <AuthContext.Provider value={value}>
      {initialLoading ? (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Typography
            variant='h2'
            fontWeight='fontWeightMedium'
            letterSpacing={2}
          >
            DEMO
          </Typography>
          <CircularProgress size={100} />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
