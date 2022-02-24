import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddIcon from '@mui/icons-material/Add'
import { Formik, Field, Form } from 'formik'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import * as Yup from 'yup'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)
  const [age, setAge] = React.useState('')
  const [value, setValue] = React.useState(new Date())

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (values, actions) => {
    console.log(values)
  }

  const createIncomeSchema = Yup.object().shape({
    amount: Yup.number().min(1).required(),
    date: Yup.date().required(),
  })

  return (
    <div>
      <Button
        size='large'
        variant='outlined'
        color='success'
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
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
                    <Button onClick={handleClose} color='secondary'>
                      Cancel
                    </Button>
                    <Button
                      // onClick={handleClose}
                      variant='contained'
                      disableElevation
                      type='submit'
                    >
                      Submit
                    </Button>
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
