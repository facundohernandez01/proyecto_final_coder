import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from "./ContextUser";
import { useContext } from "react";
import db from "../db/firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Logueo(props) {
  const { crearUsuario, iniciarSesion, uid, loginFail } = useContext(UserContext);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [inputNombre, setInputNombre] = useState("");
  const [inputApellido, setInputApellido] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;
  
    if (isRegistrando) {
      const uid = await crearUsuario(correo, password); // espera a que se resuelva la promesa y obtén el UID
      const userData = {
        nombre: inputNombre,
        apellido: inputApellido,
        uid: uid,
      };
      const itemsCollectionRef = collection(db, "usuariosDatos");
      await addDoc(itemsCollectionRef, userData);
    }
  
    if (!isRegistrando) {
      iniciarSesion(correo, password);
    }
  };
  

  return (
      <Grid container component="main" sx={{ height: '100vh'  }}>
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
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
            <Typography component="h1" variant="h5">
             {isRegistrando ? "Regístrate" : "Inicia sesión"}
            </Typography>
            <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1  }} 
>

<TextField
      id="emailField"
      label="Email"
      variant="outlined"
      type="email"
      placeholder="Email"
      margin="normal"
      required
      fullWidth
      autoFocus

    />

  <TextField
      id="passwordField"
      label="Contraseña"
      variant="outlined"
      fullWidth
      type="password"
      placeholder="Password"
    />

    {isRegistrando ? (
        <div>
          
        <TextField
          id="Nombre"
          label="Nombre"
          variant="outlined"
          margin="normal"
          type="text"
          value={inputNombre}
          required
          fullWidth
          placeholder="Nombre"
          onChange={(e) => setInputNombre(e.target.value)}
        />
        <TextField
          id="Apellido"
          label="Apellido"
          margin="normal"
          variant="outlined"
          type="text"
          required
          fullWidth
          value={inputApellido}
          placeholder="Apellido"
          onChange={(e) => setInputApellido(e.target.value)}
        />
      </div>
) : ("")}
  <Button 
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                >
    {" "}
    {isRegistrando ? "Regístrate" : "Inicia sesión"}{" "}
  </Button>

<Button  fullWidth variant="text" onClick={() => setIsRegistrando(!isRegistrando)}>
  {isRegistrando
    ? "¿Ya tienes cuenta? ¡Inicia sesión"
    : "¿No tienes cuenta? ¡Regístrate gratis!"}
</Button>

{loginFail ?  <Alert severity="error">{loginFail}</Alert> : ""}


              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}