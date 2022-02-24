import { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import RemoveIcon from "@mui/icons-material/Remove"
import { Formik, Field, Form } from "formik"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import FormHelperText from "@mui/material/FormHelperText"
import LoadingButton from "@mui/lab/LoadingButton"

import * as Yup from "yup"

const choices = [
  "food",
  "beauty",
  "culture",
  "health",
  "gift",
  "transportation",
  "education",
  "household",
  "apparel",
  "other",
]

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  const [costsType, setCostsType] = useState("")
  const [value, setValue] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setCostsType(event.target.value)
  }

  const handleSubmit = (values, actions) => {
    console.log(values)
  }
  const createCostsSchema = Yup.object().shape({
    amount: Yup.number().min(1).required(),
    date: Yup.date().required(),
    costsType: Yup.string().required(),
  })

  return (
    <div>
      <Button
        size="large"
        variant="outlined"
        color="error"
        endIcon={<RemoveIcon />}
        onClick={() => setOpen(true)}
      >
        Create Costs
      </Button>

      <Dialog
        open={open}
        fullWidth
        PaperProps={{
          style: {
            background: "#006064",
          },
        }}
      >
        <DialogTitle> Create Costs</DialogTitle>
        <Formik
          initialValues={{
            date: new Date().toISOString(),
            amount: 0,
            costsType: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={createCostsSchema}
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
                      margin="dense"
                      label="Amount"
                      name="amount"
                      fullWidth
                      type="number"
                      variant="standard"
                    />
                    <FormControl
                      variant="standard"
                      fullWidth
                      error={touched.costsType && !!errors.costsType}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Costs Type
                      </InputLabel>
                      <Field
                        as={Select}
                        // value={costsType}
                        // onChange={(e) => setCostsType(e.target.value)}
                        label="Costs Type"
                        name="costsType"
                        margin="dense"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {choices.map((choice) => (
                          <MenuItem key={choice} value={choice}>
                            {choice}
                          </MenuItem>
                        ))}
                      </Field>
                      {touched.costsType && errors.costsType && (
                        <FormHelperText>{errors.costsType}</FormHelperText>
                      )}
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date"
                        value={value}
                        onChange={(value) => {
                          handleChange(value)
                          setFieldValue("date", value.toISOString())
                        }}
                        renderInput={(params) => (
                          <Field
                            helperText={touched.date && errors.date}
                            as={TextField}
                            {...params}
                            variant="standard"
                            margin="dense"
                            fullWidth
                            name="date"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                      Cancel
                    </Button>
                    <LoadingButton
                      // onClick={handleClose}
                      variant="contained"
                      disableElevation
                      type="submit"
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
