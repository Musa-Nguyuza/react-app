import React from 'react';
import Box from '@mui/material/Box'
import './Homepage.css'
import logo from '../../../assets/logo-full.png'
import Homebuttons from '../homeButtons/Homebuttons';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, useTheme, useMediaQuery } from '@mui/material';


const Homepage =() => {

    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));
    const checkSize = (isLg || isXl);

    




    const appName = "RISK EXECUTION APP"
    return (

    <>
        <div className="main" style={{overflowY: checkSize ? "hidden":"scroll"}}>
            {checkSize?
            <Box sx={{
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start", 
                alignItems: "center",
                padding: 2,
                margin: "0px",
                backdropFilter: "blur(10px)",
                background: "rgba(61, 54, 54, 0.43)",
                borderRadius: 0,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                }}>

               <Box component="img" src={logo} alt="Logo" 
               sx={{ width:"40%", height: '9%', alignSelf:'flex-start' }} />
               <Typography sx={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "white",
                    flexGrow: 1,     // takes available space
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center",
                }}>{appName}</Typography>

               <Box component={Container}>
                <Homebuttons/>
               </Box>
                
                

            </Box> :
                <>
                
                <Box sx={{
                width: "70vw",
                minHeight: "60x",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start", // Align items at the start
                alignItems: "center",
                padding: 2,
                margin: "auto",
                backdropFilter: "blur(10px)",
                background: "rgba(61, 54, 54, 0.43)",
                borderRadius: 3,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
            }}>
                <Box component="img" src={logo} alt="Logo" 
                sx={{ width:"60%", height: '17%', alignSelf:"center",mb:10}} />

                
               <Typography
                    sx={{
                    fontSize: {sm:"2rem"},
                    fontWeight: "bold",
                    color: "white",
                    flexGrow: 1,     // takes available space
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center"
                }}

               >{appName}</Typography>

               <Box component={Container}>
                <Homebuttons/>
               </Box>
                
            </Box>
            </>
            }
            
        </div>
    </>
    );

};

export default Homepage