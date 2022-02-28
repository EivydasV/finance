import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'
import { Formik, Field, Form } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(new Date())
  const [snackBar, setSnackBar] = useState(false)
  const { createPlusFinance, loading, error, done } = useAuth()

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleSubmit = (values, actions) => {
    createPlusFinance(values)
    setSnackBar(true)
    console.log(values)
  }

  const createIncomeSchema = Yup.object().shape({
    amount: Yup.number().min(1).required(),
    date: Yup.date().required(),
  })

  return (
    <div>
      <Snackbar
        open={snackBar}
        autoHideDuration={1000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert
          onClose={() => setSnackBar(false)}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error ? error : 'successfully created'}
        </Alert>
      </Snackbar>
      <Button
        size='large'
        variant='outlined'
        color='success'
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Create Income
      </Button>

      <Dialog
        open={open}
        fullWidth
        PaperProps={{
          style: {
            background: '#006064',
          },
        }}
      >
        <DialogTitle>Create Income</DialogTitle>
        <Formik
          initialValues={{ date: new Date().toISOString(), amount: 0 }}
          onSubmit={handleSubmit}
          validationSchema={createIncomeSchema}
        >
          {({ touched, errors, setFieldValue }) => {
            console.log(errors)
            return (
              <>
                <Form>
                  <DialogContent>
                    <Field
                      error={touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      as={TextField}
                      margin='dense'
                      label='Amount'
                      name='amount'
                      fullWidth
                      type='number'
                      variant='standard'
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label='Date'
                        value={value}
                        onChange={(value) => {
                          handleChange(value)
                          setFieldValue('date', value.toISOString())
                        }}
                        renderInput={(params) => (
                          <Field
                            helperText={touched.date && errors.date}
                            as={TextField}
                            {...params}
                            variant='standard'
                            fullWidth
                            name='date'
                            margin='dense'
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color='secondary'>
                      Cancel
                    </Button>
                    <LoadingButton
                      // onClick={handleClose}
                      variant='contained'
                      disableElevation
                      type='submit'
                      loading={loading}
                    >
                      Submit
                    </LoadingButton>
                  </DialogActions>
                </Form>
              </>
            )
          }}
        </Formik>
      </Dialog>
    </div>
  )
}
