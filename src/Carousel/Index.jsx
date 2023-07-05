import ItemList from "../ItemList/index";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/index";
import { useParams, useLocation } from "react-router-dom";
import { Grid, Typography, Divider } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Slider from "react-slick";
import {Button, Box} from "@mui/material"

const Carousel = () => {
  const { ItemsList } = useContext(CartContext);
  const { categoria } = useParams();
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // nuevo estado para indicar si se está cargando
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    setProductos(ItemsList.filter((producto) => producto.categoria == "smartphones" || producto.categoria == "tablets"));
    setDestacados(ItemsList.filter((producto) => producto.categoria == "tvsmart"));

  }, [ItemsList]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', backgroundColor: "#fff"}}>
      <Divider sx={{marginBottom: "10px"}}>
      <Typography variant="h4" color="primary.dark" component="h4">Tech</Typography>
      </Divider>
      <Slider {...settings}>
        {productos.map((item) => (
          <Box sx={{transform:"scale(0.9)"}} key={item.id}>
            <ItemList item={item} />
          </Box>
        ))}
      </Slider>
   
      <Divider sx={{marginTop: "30px", marginBottom: "10px"}}>
      <Typography variant="h4" color="primary.dark" component="h4">Destacados</Typography>
      </Divider>
      <Slider {...settings}>
        {destacados.map((item) => (
          <div key={item.id}>
            <ItemList item={item} />
          </div>
        ))}
      </Slider>
    </Box>
    
  );
};



export default Carousel;
