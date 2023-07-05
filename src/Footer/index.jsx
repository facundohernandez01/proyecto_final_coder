import React, {useContext, useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer({handleClickOpen, open}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{  backgroundColor: '#212121', height: 300, bootom: 0 }}
    >      
<Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex', lg: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
        CoderStore
        </Typography>
          
        </Toolbar>
      </Container>

    </AppBar>


    </Box>
  );
}
export default Footer;






  
