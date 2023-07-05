import React, { useState } from "react";
import { uploadFile } from "../storage";
import { Input, Button, InputLabel, Box} from "@mui/material";
import Form from '../Form/index'

export const AdminForm = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [ready, setReady] = useState(false);
  const [imageready, setimageReady] = useState(false);
  const [urlimg, setURL] = useState(null);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmitMulti = async (e) => {
    e.preventDefault();
    try {
      if (files.length > 0) {
        // Iterar sobre la lista de archivos y subirlos uno por uno
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const result = await uploadFile(file);
          console.log(result);
          setReady([true]);
        }
      } else {
        console.error("No se seleccionaron archivos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const  url = await uploadFile(image); // Sube la imagen y espera a que termine
      setURL(url);      
      setimageReady(true);
    }
  };

  return (
    <>

      {!imageready ? (
        <div>
  
          {!image ? (
          <>
          <InputLabel>Imagen principal del producto</InputLabel> 
      
            <Button variant="contained" component="label">
              Subir
              <input
                hidden
                accept="image/*"
                type="file"
                id=""
                onChange={handleChange}
              />
            </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleUpload}>
              Confirmar?
            </Button>
          )}
         
        </div>
      ) : (
        <>
        <Box>
          <Button variant="outlined" color="primary" disabled>
            Listo
          </Button>
          </Box>
          <img className="img_ppal_admin" src={urlimg}></img>
        </>
      )}

      <form onSubmit={handleSubmitMulti}>
        {!ready ? (
<>
<InputLabel>Imagenes adicionales</InputLabel> 
          <Button variant="contained" component="label">
            {files.length > 0 ? (
              <Button type="submit" variant="contained">
                {ready ? "Listo" : "Confirmar?"}
              </Button>
            ) : (
              "Subir"
            )}
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              id="file"
              onChange={handleFileChange}
            ></input>
          </Button>
          </>
        ) : (
          <Button variant="outlined" color="primary" disabled>
            Listo
          </Button>
        )}
      </form>    
     <Form  urlimg={urlimg}/>
    </>
  );
};
