import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import db from "../../db/firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useContext } from "react";
import {CartContext} from '../Context/index';
import {UserContext} from '../ContextUser';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { Snackbar } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Person3Icon from '@mui/icons-material/Person3';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';export function ConfirmationDialogRaw({ open, chekoutClose, setOpen }) {

const { cart, vaciarCarrito } = useContext(CartContext);
const { crearUsuario } = useContext(UserContext);

const [finalizada, setFinalizada] = useState(false);
function handleClose() {
        setFinalizada(false);
        window.location.reload();

}

const [inputNombre, setInputNombre] = useState("");
const [inputTel, setInputTel] = useState("");
const [inputEmail, setInputEmail] = useState("");
const [inputValida, setInputValida] = useState("");
const [documentId, setDocumentId] = useState(null);
const [inputPassword, setInputPassword] = useState(null);


 const createItem = async (e) => {
    if (inputEmail !== inputValida) {
      alert("Emails no coinciden. Verificar");
      return;
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(inputEmail)) {
      alert("Correo inválido");
      return;
    }
    
    const itemsCollectionRef = collection(db, "ordenes");
    const carrito = {};
    carrito.nombre = inputNombre,
    carrito.email = inputEmail,
    carrito.fecha = new Date().toString();
    cart.forEach(item => {
      carrito[item.id] = {
        title: item.title,
        price: item.price,
        cantidad: item.cantidad
      };
    });
    const documentRef = await addDoc(itemsCollectionRef, carrito);
    setDocumentId(documentRef.id);
    setInputNombre("");
    setInputEmail("");
    setInputValida("");
    setInputTel("");
    setOpen(false);
    vaciarCarrito();
    setFinalizada(true);
    crearUsuario(inputEmail, inputPassword)
  };

  React.useEffect(() => {
    if (!open) {
    //   setSelectedValue(value);
    }
  }, [open]);




  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    onClose(selectedValue);
  };

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

  return (
    <>
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Confirmación de compra</DialogTitle>
      <DialogContent dividers>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="Nombre y apellido">
        Nombre y apellido
        </InputLabel>
        <Input
          id="Nombre-y-apellido"
          fullWidth
          value={inputNombre}
          onChange={(e) => setInputNombre(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Person3Icon />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
    <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
          >
    <FormControl variant="standard">
        <InputLabel htmlFor="Teléfono">
        Teléfono
       </InputLabel>
        <Input
          id="telefono"
          value={inputTel}
          onChange={(e) => setInputTel(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <LocalPhoneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
    <InputLabel htmlFor="Email">Email</InputLabel>
     <Input
          id="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          }
        />
      </FormControl>


      </Box>
      <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > :not(style)': { m: 1 },
            }}
            >
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="repetir-email">Repetir email</InputLabel>
        <Input
          id="repetir-email"
          value={inputValida}
          label="Repetir email"
          onChange={(e) => setInputValida(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      </Box>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
    <InputLabel htmlFor="password">Crea una contraseña</InputLabel>
     <Input
          id="password"
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <EnhancedEncryptionIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      </DialogContent>
      <DialogActions>
      <Button autoFocus onClick={handleCancel}>
        Cancelar
      </Button>
      <Button variant="contained" onClick={createItem}>Confirmar</Button>
      </DialogActions>
      </Dialog>
      
      <Snackbar
      open={finalizada}
      autoHideDuration={5000}
      message={"Compra procesada con éxito. Su nro de orden es: "+documentId}
      onClose={handleClose}
    /> 

    </>
  )
}

export default ConfirmationDialogRaw;