import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#fff',
    },
    favs: {
      main: 'red',
    },
    cartBadge:{
      main: '#172772',
    },
    footer:{
      main: '#172772',
    },
    error: {
      main: red.A400,
    },
  },


});





export default theme;
