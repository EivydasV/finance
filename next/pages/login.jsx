import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router'

export default function SignInSide() {
  const { login, loading, error, currentUser } = useAuth()
  const router = useRouter()
  const { message } = router.query

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
  })

  const handleSubmit = (values, actions) => {
    login(values)
  }
  useEffect(() => {
    if (currentUser) return router.replace('/')
  }, [currentUser])
  return (
    <Grid container component='main' sx={{ height: '100vh', marginTop: -4 }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
            {message && <Alert severity='success'>{message}</Alert>}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => {
                return (
                  <Form>
                    <Field
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      as={TextField}
                      margin='normal'
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                    />
                    <Field
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      as={TextField}
                      margin='normal'
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                    />
                    {error && (
                      <Alert severity='error'>
                        {error.response.data.message}
                      </Alert>
                    )}
                    <LoadingButton
                      loading={loading}
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </LoadingButton>
                  </Form>
                )
              }}
            </Formik>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NextLink href='/register' passHref>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
