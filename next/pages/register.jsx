import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import NextLink from "next/link"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

export default function RegisterSide() {
  const handleSubmit = (values, actions) => {
    console.log(values)
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email().max(55).required(),
    firstName: Yup.string().max(25).min(3).required(),
    lastName: Yup.string().max(25).min(3).required(),
    password: Yup.string().required().min(8).max(30),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  })
  return (
    <Grid container component="main" sx={{ height: "100vh", marginTop: -4 }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirmation: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={RegisterSchema}
            >
              {({ touched, errors }) => {
                return (
                  <Form>
                    <Field
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="First Name"
                      name="firstName"
                    />
                    <Field
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Last Name"
                      name="lastName"
                    />
                    <Field
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Email"
                      name="email"
                    />
                    <Field
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <Field
                      error={
                        touched.passwordConfirmation &&
                        !!errors.passwordConfirmation
                      }
                      helperText={
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation
                      }
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Confirm Password"
                      name="passwordConfirmation"
                      type="password"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      color="secondary"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Form>
                )
              }}
            </Formik>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NextLink href="/login" passHref>
                  <Link href="#" variant="body2">
                    {"Already have an account? Login"}
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
