import { createTheme } from '@mui/material/styles'
import { red, blue, cyan } from '@mui/material/colors'
// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: cyan,
    error: {
      main: red.A400,
    },
  },
})

export default theme
