import ItemList from "../ItemList/index";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/index";
import { useParams, useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

const ItemListContainer = ({ searchResults, showAllItems, setSearchResults }) => {
  const { ItemsList } = useContext(CartContext);
  const { categoria } = useParams();
  const location = useLocation();
  const [productos, setProductos] = useState([ItemsList]);
  const [isLoading, setIsLoading] = useState(false); // nuevo estado para indicar si se está cargando

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true); // establece isLoading en true antes de hacer la búsqueda
      setTimeout(() => {

      if (categoria !== undefined) {
        setProductos(ItemsList.filter((producto) => producto.categoria === categoria));
      } else {
        if (searchResults) {
          setProductos(searchResults);
        }
      }
      setIsLoading(false); // establece isLoading en false después de la búsqueda
    }, 500)
    };

    loadProducts();
  }, [categoria, searchResults, ItemsList]);

  const gridProps = [
    {xs: 12, md: 3},
    {xs: 12, md: 3},
    {xs: 12, md: 3},
    {xs: 12, md: 3},

  ]
  return (
    <>
    <Grid container spacing={1}>
      {isLoading && (
      gridProps.map((props, index) => (
        <Grid key={`grid-${index}`} item xs={12} md={3}>
        <Skeleton sx={{ height:250, width: 200, marginBottom: -5}} animation="wave" />
      <Skeleton sx={{ height:15, width: 200}} animation="wave" />
      <Skeleton sx={{ height:15, width: 200}} animation="wave" />
      <Skeleton sx={{ height:15, width: 200}} animation="wave" />
      <Skeleton sx={{ height:15, width: 200}} animation="wave" />

            <Skeleton sx={{ height:250, width: 200, marginBottom: -5}} animation="wave" />
            <Skeleton sx={{ height:15, width: 200}} animation="wave" />
            <Skeleton sx={{ height:15, width: 200}} animation="wave" />
            <Skeleton sx={{ height:15, width: 200}} animation="wave" />
            <Skeleton sx={{ height:15, width: 200}} animation="wave" />
            </Grid>
        ))
      )}
      </Grid>
      {!isLoading && productos.length === 0 && <p>No se encontraron resultados para la búsqueda "{searchResults}"</p>} {/* muestra el mensaje si no se encontraron resultados */}
      {!isLoading && productos.map((item) => { {/* muestra los productos si no está cargando y hay resultados */}
        return (
        

          <Grid key={item.id} item xs={12} md={3}>
            <ItemList item={item} key={item.id} />
          </Grid>
    
        );
      })}
    </>
  );
};



export default ItemListContainer;
