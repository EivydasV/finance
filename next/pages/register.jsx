import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'

import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'

export default function RegisterSide() {
  const { currentUser, signUp, validationError, loading } = useAuth()
  console.log(validationError)
  const router = useRouter()
  const handleSubmit = (values, actions) => {
    signUp(values)
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email().max(55).required(),
    firstName: Yup.string().max(25).min(3).required(),
    lastName: Yup.string().max(25).min(3).required(),
    password: Yup.string().required().min(8).max(30),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirmation: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={RegisterSchema}
            >
              {({ touched, errors }) => {
                return (
                  <Form>
                    <Field
                      error={
                        (touched.firstName && !!errors.firstName) ||
                        !!validationError?.body?.firstName?._errors[0]
                      }
                      helperText={
                        (touched.firstName && errors.firstName) ||
                        validationError?.body?.firstName?._errors[0]
                      }
                      as={TextField}
                      margin='normal'
                      fullWidth
                      label='First Name'
                      name='firstName'
                    />
                    <Field
                      error={
                        (touched.lastName && !!errors.lastName) ||
                        !!validationError?.body?.lastName?._errors[0]
                      }
                      helperText={
                        (touched.lastName && errors.lastName) ||
                        validationError?.body?.lastName?._errors[0]
                      }
                      as={TextField}
                      margin='normal'
                      fullWidth
                      label='Last Name'
                      name='lastName'
                    />
                    <Field
                      error={
                        (touched.email && !!errors.email) ||
                        !!validationError?.body?.email?._errors[0]
                      }
                      helperText={
                        (touched.email && errors.email) ||
                        validationError?.body?.email?._errors[0]
                      }
                      as={TextField}
                      margin='normal'
                      fullWidth
                      label='Email'
                      name='email'
                    />
                    <Field
                      error={
                        (touched.password && !!errors.password) ||
                        !!validationError?.body?.password?._errors[0]
                      }
                      helperText={
                        (touched.password && errors.password) ||
                        validationError?.body?.password?._errors[0]
                      }
                      as={TextField}
                      margin='normal'
                      fullWidth
                      label='Password'
                      name='password'
                      type='password'
                    />
                    <Field
                      error={
                        (touched.passwordConfirmation &&
                          !!errors.passwordConfirmation) ||
                        !!validationError?.body?.passwordConfirmation
                          ?._errors[0]
                      }
                      helperText={
                        (touched.passwordConfirmation &&
                          errors.passwordConfirmation) ||
                        validationError?.body?.passwordConfirmation?._errors[0]
                      }
                      as={TextField}
                      margin='normal'
                      fullWidth
                      label='Confirm Password'
                      name='passwordConfirmation'
                      type='password'
                    />
                    {validationError && (
                      <Alert severity='error'>{validationError.message}</Alert>
                    )}

                    <LoadingButton
                      loading={loading}
                      type='submit'
                      fullWidth
                      color='secondary'
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
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
                <NextLink href='/login' passHref>
                  <Link href='#' variant='body2'>
                    {'Already have an account? Login'}
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
