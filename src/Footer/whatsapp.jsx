import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useMediaQuery from '@mui/material/useMediaQuery';


const Whatsapp = ()=> {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div>
            <a
                href="https://wa.me/0543400498587/?text=Welcome to Techblog369 Team"
                className="whatsapp_float"
                target="_blank"
                body="hello world"
                rel="noopener noreferrer"
            >
                <i className="fa fa-whatsapp whatsapp-icon"></i>
                <WhatsAppIcon sx={{ fontSize: isMobile ? '10vw' : '3vw', backgroundColor: "#25d366", color:"white", borderRadius: "50vw",   boxShadow: "2px 2px 3px #999" }} />
            </a>
        </div>
    )
 }
 
 export default Whatsapp