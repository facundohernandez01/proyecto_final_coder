import { CartContext } from "../Context";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  CardContent,
  Typography,
  Skeleton,
  Snackbar,
  CardMedia,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import db from "../../db/firebase-config";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { app } from "../fb";



function ItemList({ item }) {
  const { addCart, loading } = useContext(CartContext);
  const [opened, setOpened] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const favsRef = collection(db, "favs");

  const [firebaseFavorites, setFirebaseFavorites] = useState([]);


  useEffect(() => {
    // Obtener el userId actual (asumiendo que se tiene el userId almacenado en el estado del contexto)
    const userId = app.auth().currentUser.uid;
    
    // Obtener los documentos de Firebase que corresponden a los favoritos del usuario actual
    favsRef.where("userId", "==", userId).get().then((querySnapshot) => {
      const favs = [];
      querySnapshot.forEach((doc) => {
        favs.push(doc.data().productId);
      });
      setFirebaseFavorites(favs);
    }).catch((error) => {
      console.error("Error al obtener los favoritos de Firebase:", error);
    });
  }, [app.auth().currentUser.uid]);

  
  const handleClick = () => {
    let value = 1;
    addCart(item.id, value);
    setOpened(true);
  };

  const handleClose = (event, reason) => {
    setOpened(false);
  };

  useEffect(() => {
    setIsFavorite(
      favorites.includes(item.id) ||
      firebaseFavorites.includes(item.id) ||
      localStorage.getItem(`favorite_${item.id}`) === 'true'
    );
  }, [favorites, firebaseFavorites, item.id]);

  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <>
      {loading && (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      )}
      {loading ? (
        <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
      ) : (
        <Grid key={item.title} item xs={12} md={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{ display: "inline" }}
                component="img"
                height="140"
                sx={{ width: 250, height: 180 }}
                image={item.image_url}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ overflow: "hidden", height: "25px" }}
                >
                  {item.title}
                </Typography>
                <Typography>${item.price}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ overflow: "hidden", height: "20px" }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => handleClick(item.id)}>Add to cart</Button>
                        <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="favs"/>}
            checked={isFavorite}
            
            onChange={() => {
              setIsFavorite(!isFavorite);
              if (!isFavorite) {
                addToFavorites(item.id);
                localStorage.setItem(`favorite_${item.id}`, 'true');
                
                // Agregar el favorito a Firebase
                favsRef.add({ userId: currentUser.id, productId: item.id }).then(() => {
                  console.log("Favorito agregado a Firebase");
                }).catch((error) => {
                  console.error("Error al agregar el favorito a Firebase:", error);
                });
              } else {
                removeFromFavorites(item.id);
                localStorage.removeItem(`favorite_${item.id}`);
                
                // Eliminar el favorito de Firebase
                favsRef.where("userId", "==", currentUser.id)
                  .where("productId", "==", item.id)
                  .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      doc.ref.delete().then(() => {
                        console.log("Favorito eliminado de Firebase");
                      }).catch((error) => {
                        console.error("Error al eliminar el favorito de Firebase:", error);
                      });
                    });
                  }).catch((error) => {
                    console.error("Error al obtener el favorito a eliminar de Firebase:", error);
                  });
              }
            }}
            
          />

              <Link to={`/productos/${item.id}`}>
                <Button variant="contained"> Ver</Button>
              </Link>
            </CardActions>
          </Card>

          <Snackbar
            open={opened}
            autoHideDuration={1000}
            message="Producto añadido al carrito"
            onClose={handleClose}
          />
        </Grid>
      )}
    </>
  );
}

export default ItemList;
