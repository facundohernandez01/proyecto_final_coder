import * as React from 'react';
import { Grid, Container, Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function CompSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true
  };



  

  return (
    <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden', backgroundColor: "#eee", marginTop:"120px" }}>

    <Slider {...settings}>
    <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://http2.mlstatic.com/D_NQ_903043-MLA54431889158_032023-OO.webp" alt="imagen1" />
      </div>
      <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://http2.mlstatic.com/D_NQ_769172-MLA54486294183_032023-OO.webp" alt="imagen2" />
      </div>
      <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://http2.mlstatic.com/D_NQ_827677-MLA54561868078_032023-OO.webp" alt="imagen2" />
      </div>
    </Slider>

    </Box>
  );
}
