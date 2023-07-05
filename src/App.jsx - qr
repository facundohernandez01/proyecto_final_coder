import { Route, Routes, useLocation, useNavigate, useNavigation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Box, Grid, Container, Button, AppBar } from '@mui/material';
import Page404 from './Page404.jsx'
import './index.scss'
import Whatsapp from "./Footer/whatsapp"
import QRCodeGenerator from "./CodQR"

function App() {


  return (
<>
  <Container>   
        <Grid container spacing={2} >
        <Box sx={{ width: '100%',
        paddingTop: 20
        }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 0 }}>
        <Routes>
        <Route path="/error404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<QRCodeGenerator />} />

        </Routes>
        </Grid>
        </Box>
        </Grid> 
    </Container>
  <Whatsapp/>
  </>

  );
}

export default App;
