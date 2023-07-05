import db from "../../db/firebase-config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../Context/index";
import {TextField, Box, Button} from "@mui/material";
import Input from '@mui/material/Input';

const Form = ({ urlimg }) => {
  const { cart, addCart, ItemList, setItems } = useContext(CartContext);

  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputCat, setInputCat] = useState("");

  const createItem = async (e) => {
    const item = {
      categoria: inputCat,
      description: inputDesc,
      image_url: urlimg,
      price: inputPrice,
      title: inputTitle,
    };
    const itemsCollectionRef = collection(db, "ItemList");
    await addDoc(itemsCollectionRef, item); //inserta el item en la colección
    const data = await getDocs(itemsCollectionRef);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //actualiza el estado de items
    setInputTitle("");
    setInputPrice("");
    setInputDesc("");
    setInputCat("");
  };


  return (
    <div>

    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '45ch' },
    }}
    noValidate
    autoComplete="off"
  >
        <div>
          <TextField
            id="outlined-basic"
            label="Título"
            variant="outlined"
            type="text"
            value={inputTitle}
            placeholder="Título"
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Precio"
            variant="outlined"
            type="number"
            value={inputPrice}
            placeholder="Precio"
            onChange={(e) => setInputPrice(e.target.value)}
          />
        </div>
     <div>
         
        </div>
        <div>
          <TextField         
            id="outlined-basic"
            label="Descripción"
            variant="outlined"
            type="text"
            value={inputDesc}
            placeholder="Desc"
            multiline
            rows={4}
            onChange={(e) => setInputDesc(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Categoria"
            variant="outlined"
            type="text"
            value={inputCat}
            placeholder="Categoria"
            onChange={(e) => setInputCat(e.target.value)}
          />
        </div>
        <Button onClick={() => createItem()} variant="outlined" color="primary">
          Publicar item
        </Button>
      </Box>
    </div>
  );
};

export default Form;
