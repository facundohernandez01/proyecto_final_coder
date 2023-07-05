  import * as React from 'react';
  import Badge from '@mui/material/Badge';
  import { styled } from '@mui/material/styles';
  import IconButton from '@mui/material/IconButton';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import {CartContext} from '../Context/index';
  import {useContext} from "react";

  const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }));
  
  
  const CartWidget = () => {
    const {getSumaCart} = useContext(CartContext);
    const {ItemsList} = useContext(CartContext);



    return (
        <StyledBadge badgeContent={getSumaCart()} color="primary">
          <ShoppingCartIcon  color="secondary" />
        </StyledBadge>
       )
  }
  
export default CartWidget


