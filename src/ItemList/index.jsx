import { CartContext } from "../Context";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  CardContent,
  Typography,
  CardMedia,
  Card,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import db from "../../db/firebase-config";
import { app } from "../fb";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function ItemList({ item }) {
  const { addCart, loading } = useContext(CartContext);
  const [opened, setOpened] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (item && item.id) {
      const checkIfFavorite = async () => {
        const q = query(
          collection(db, "favs"),
          where("productId", "==", item.id),
          where("userId", "==", app.auth().currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
          setIsFavorite(true);
        }
      };
      checkIfFavorite();
    }
  }, [app.auth().currentUser.uid, item]);
  

  const handleClick = () => {
    let value = 1;
    addCart(item.id, value);
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <>

        <Card>
        <CardActionArea>
        <Link to={`/productos/${item.id}`}>

              <CardMedia
                style={{ display: "inline" }}
                component="img"
                height="140"
                sx={{ width: 250, height: 180 }}
                image={item.image_url}
              /></Link>
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
              checkedIcon={<Favorite color="favs" />}
              checked={isFavorite}
              onChange={() => {
                setIsFavorite(!isFavorite);
                if (!isFavorite) {
                  addToFavorites(item.id);
                } else {
                  removeFromFavorites(item.id);
                }
              }}
            />

            <Link component={Link} to={"/productos/" + item.id}>
              <Button variant="contained"> Ver</Button>
            </Link>
          </CardActions>
        </Card>

    </>
  );
}

export default ItemList;
