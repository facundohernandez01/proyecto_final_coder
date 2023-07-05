import React, { useEffect, useState, useContext } from 'react'
import { CartContext } from "../Context"
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import db from "../../db/firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


const Item = styled(Paper)(({ theme }) => ({

  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemDetail = () => {
  const {  addCart } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const [ItemsList, setItem] = useState({});
  const [loading, setIsLoading] = useState(true);

  const getItem = async (id) => {
    const itemDocRef = doc(db, "ItemList", id);
    const itemDoc = await getDoc(itemDocRef);
    if (itemDoc.exists()) {
      setItem(itemDoc.data());
    } else {
      console.log("El ítem no existe");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250); // Cambia el número de milisegundos según el tiempo que quieras mostrar el loading
  }, []);

  useEffect(() => {
    getItem(id);
  }, [id]);

    const [value, setValue] = useState(1);

    const handleChange = (event) => {
      setValue(event.target.value);
    };


  return (
    <>


  <Grid container spacing={4} sx={{py: 5}}>
      <Grid item xs={12} md={6} lg={7} >
      {loading ? (
      <Skeleton sx={{ height: 290, width: 500, minWidth:500}} animation="wave" variant="rectangular" />
      ) : ( 
        <Item >
        <img sx={{maxWidth: 40}} src={ItemsList.image_url}></img>
       </Item>
            )}
     </Grid> 
     <Grid item xs={12} md={4} lg={5}
     align='left'
     >
    {loading ? (
      <Item>
      <Skeleton sx={{ width: 250, minWidth:250}}/>
      <Skeleton sx={{ width: 250, minWidth:250}} animation="wave" />
      <Skeleton sx={{ width: 250, minWidth:250}} animation={false} />
      <Skeleton sx={{ height:150, width: 250, minWidth:250}} animation={false} />

      </Item>
      ) : ( 
       <Item>
       <Typography variant="h5" color="primary.dark" component="h2">
        {ItemsList.title}
        </Typography>
       {ItemsList.description}
       <Typography variant="h4" color="primary.dark" component="h2">
        $ {ItemsList.price}
        </Typography>
       <Box
         component="form"
         sx={{
           '& .MuiTextField-root': { m: 1, width: '25ch' },
         }}
         noValidate
         autoComplete="off"
       > 
      <TextField
       id="cantidades"
       label="Cantidad"
       value={value}
       type="number"
       onChange={handleChange}
       InputLabelProps={{
         shrink: true,
       }}
     />     
 <Item>
 <Button onClick={() => addCart(id,value)} variant="contained">Añadir al carrito</Button>
 <Button onClick={() => navigate(-1)} variant="contained" color="secondary">← Volver</Button>
 </Item>

 </Box>
       </Item>
 )}

     </Grid>
   </Grid>
</>
  );
};

export default ItemDetail;
