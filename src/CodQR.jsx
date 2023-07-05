import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import AppBar from "@mui/material/AppBar";
import {TextField, Toolbar, Box} from "@mui/material"

function QRCodeGenerator() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  return (

    <>
    
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25vh",
    marginLeft: "40%",
    justifyContent: "center"
  }}
    >
    <AppBar sx={{ position: "fixed", padding: "0px", height: "59px", }}>
    <Toolbar>
      <TextField
        value={inputValue}
        placeholder="Ingresar URL para generar el QR"
        onChange={handleInputChange}
        sx={{ backgroundColor: "#fff", width: "40%", marginLeft: "30%", marginRight: "30%" }}
      />
    </Toolbar>
  </AppBar>

        <QRCode value={inputValue} size={250}/>
 
    </Box>
    </>
  )
}
export default QRCodeGenerator;