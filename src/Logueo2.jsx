import React, { useState, useEffect } from "react";
import { UserContext } from "./ContextUser";
import { useContext } from "react";
import db from "../db/firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {TextField, Box, Button} from "@mui/material";
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';

const Logueo = (props) => {
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
    <div>
      <h1> {isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '45ch' },
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
      <form onSubmit={submitHandler}>
        <Grid container>
        <Grid item xs={12} sm={6}>
      <TextField
            id="emailField"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Email"
          />
          </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            id="passwordField"
            label="password"
            variant="outlined"
            type="password"
            placeholder="Password"
          />
          </Grid>
          </Grid>
          {isRegistrando ? (
              <div>
                
              <TextField
                id="Nombre"
                label="Nombre"
                variant="outlined"
                type="text"
                value={inputNombre}
                placeholder="Nombre"
                onChange={(e) => setInputNombre(e.target.value)}
              />
              <TextField
                id="Apellido"
                label="Apellido"
                variant="outlined"
                type="text"
                value={inputApellido}
                placeholder="Apellido"
                onChange={(e) => setInputApellido(e.target.value)}
              />
            </div>
) : ("")}
      <Grid item xs={12} lg={12} sx={{padding: 2, marginInline: 3, borderBottom: 1}}>
        <Button fullWidth variant="contained" type="submit">
          {" "}
          {isRegistrando ? "Regístrate" : "Inicia sesión"}{" "}
        </Button>

      <Button  fullWidth variant="text" onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando
          ? "¿Ya tienes cuenta? ¡Inicia sesión"
          : "¿No tienes cuenta? ¡Regístrate gratis!"}
      </Button>

      </Grid>
      </form>

<p>{loginFail}</p>


      </Box>
    </div>
  );
};


export default Logueo;
