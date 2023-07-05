import { Route, Routes, useLocation, useNavigate, useNavigation } from "react-router-dom";
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
import CompSlider from './Slider'
import Logueo from "./Logueo";
import Footer from './Footer'
import './index.scss'
import Whatsapp from "./Footer/whatsapp"
import Carousel from "./Carousel/Index"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QRCodeGenerator from "./CodQR"

function App() {
  const { usuario, setUsuario } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

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
         <ResponsiveAppBar handleClickOpen={handleClickOpen} setSearchResults={setSearchResults} />
         {location.pathname == "/" || location.pathname == "/home" ? (<><CompSlider /> </>) : null}
      
  <Container>   
        <Cart handleClose={handleClose} open={open} />
        <Grid container spacing={2} >
        <Box sx={{ width: '100%',
        paddingTop: 10
        }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 0 }}>
        <Routes>
        <Route exact path='/form' element={<Form/>}/>
        <Route path='/home'  
        element={
        searchResults.length > 0 || searchResults !== "" ? <ItemListContainer  searchResults={searchResults} setSearchResults={setSearchResults}/> : <Carousel/>
        } 
        />        <Route path='/'  
        element={
        searchResults.length > 0 || searchResults !== "" ? <ItemListContainer  searchResults={searchResults} setSearchResults={setSearchResults}/> : <Carousel/>
        } 
        />
        <Route path='/categoria/:categoria' element={<ItemListContainer searchResults={searchResults}/>}/>
        <Route exact path="/productos/:id" element={<ItemDetail/>}/>
        <Route path="/error404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/qr" element={<QRCodeGenerator />} />

        </Routes>
        </Grid>
        </Box>
        </Grid> 
    </Container>
  <Footer/>
  <Whatsapp/>
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
