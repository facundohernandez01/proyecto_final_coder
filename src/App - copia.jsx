import { Route, Routes } from "react-router-dom";
import {UserContext} from '././ContextUser/index';
import React, { useContext, useEffect } from "react";
import ItemListContainer from "./ItemListContainer";
import Cart from './Cart'
import Form from "./Form";
import { Box, Grid, Container, Button, AppBar } from '@mui/material';
import ResponsiveAppBar from './NavBar/index.jsx'
import { useState } from "react";
import ItemDetail from "./ItemDetail";
import Page404 from './Page404.jsx'
import Slider from './Slider'
import Logueo from "./Logueo";
import { AdminForm } from "./Admin/Index";
import Footer from './Footer'
import './index.css'


function App() {
  const { usuario, setUsuario } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {usuario ? (
      <>
  <Container>   
   <ResponsiveAppBar handleClickOpen={handleClickOpen}/>

        <Cart handleClose={handleClose} open={open} />

        <Grid container spacing={2} >
        <Box sx={{ width: '100%',
        paddingTop: 10
        }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 0 }}>
        <Routes>
        <Route exact path='/form' element={<Form/>}/>
        <Route path='/' element={<><Slider/><ItemListContainer/></>}/>
        <Route path='/categoria/:categoria' element={
        <>
        <Box display="static" sx={{backgroundColor:'#bd0000', top: 300, paddingTop: 30, heigth: 300}}>
        </Box>

        <Slider/>
        <ItemListContainer/>
        </>
        }
        />
        <Route path="/produc
        tos/:id" element={<ItemDetail />} />
        <Route path="/admin" element={<AdminForm/>} />
        <Route path="/error404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />

        </Routes>
        </Grid>
        </Box>
        </Grid> 
    </Container>
  <Footer/>
    </>

    ) : ( 
      <>
     <Logueo setUsuario={setUsuario} />
      </>
          )}
          </>
  );
}

export default App;
