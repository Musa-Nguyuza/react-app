import React from 'react';
import { Box, Drawer, Typography, IconButton, Divider, Toolbar, AppBar, Button, Grid,
  useTheme,useMediaQuery
 } from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../assets/logo-full.png'
import {Link, useNavigate } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
//import { jwtDecode } from "jwt-decode";



const drawerWidth = 280;

export default function SidebarLayout({children, captureHeading}) {
  const theme = useTheme();
  const navigate = useNavigate();

  
const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/',{replace:true});
  };

  
// const [timeLeft, setTimeLeft] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     const decoded = jwtDecode(token);
//     const expiryTime = decoded.exp * 1000;

//     const updateCountdown = () => {
//       const now = Date.now();
//       const diff = expiryTime - now;
//       if (diff <= 0) {
//         setTimeLeft('Expired');
//         localStorage.removeItem('token');
//       } else {
//         const minutes = Math.floor(diff / 60000);
//         const seconds = Math.floor((diff % 60000) / 1000);
//         setTimeLeft(`${minutes}m ${seconds}s`);
//       }
//     };

//     updateCountdown();
//     const interval = setInterval(updateCountdown, 1000);
//     return () => clearInterval(interval);
//   }, []);




  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const checkSize = ( isMd || isLg || isXl);
  
  
  return (
    <Box sx={{ display: 'flex', minHeight:'100vh' }}>
      {/* This is my header */}
      <AppBar position="fixed" elevation={1} sx={{ width:checkSize? `calc(100% - ${drawerWidth}px)`: "100%", ml: drawerWidth , height:'95px', bgcolor:"White"}}>
        <Toolbar sx={{justifyContent:checkSize? 'center':"start" , marginTop:'2%'}}>

          {!checkSize&& 
          <Link to={"/"} style={{height:"70%", width:'20%',marginRight:'15%'}}>
          <Box component="img" src={Logo} alt="Logo" 
          sx={{ width: "100%", height: '100%',
          cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }
            } 
            /> </Link>
          }
          <Typography variant="h6" noWrap sx={{color:'black'}}>
            {captureHeading}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* This is a Sidebar */}
      {(isMd || isLg || isXl) && 
      <Drawer
        variant="permanent"
        sx={{
          width:checkSize ? drawerWidth:"0vw",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth,height:checkSize ?"100vh":"97px"
            , boxSizing: 'border-box' },
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>

          <Box component="img" src={Logo} alt="Logo" sx={{ width: 200, height: '90%' }} />

        </Toolbar>

        <Divider />

        {/* dide bar content */}
        
        <Box sx={{ px: 2, py: 2, height:'100%'}} >
          <Typography variant="h6" sx={{ mb:2 }}>
                Options
            </Typography>

          <Grid container spacing={2}>

            <Grid item size={{md:12}}>
                <Button LinkComponent={Link} to='/homepage' variant='oulined' sx={{
                color:'black',
                bgcolor:'whitesmoke',
                '&:hover':{
                    bgcolor:'rgba(196, 196, 196, 0.47)',
                    color:'rgba(0, 0, 0, 0.42)'
                }
            }} fullWidth replace>
                <HomeIcon sx={{position:"absolute", left:"25%"}}/> Home
            </Button>
            </Grid>


            <Grid item size={{md:12}}>
            <Button onClick={()=> window.history.back()} variant='oulined' sx={{
                color:'black',
                bgcolor:'whitesmoke',
                '&:hover':{
                    bgcolor:'rgba(196, 196, 196, 0.47)',
                    color:'rgba(0, 0, 0, 0.42)'
                }
            }} fullWidth replace>
                <ArrowBackTwoToneIcon sx={{position:"absolute", left:"25%"}}/> Back
            </Button>
            </Grid>

            <Grid item size={{md:12}} sx={{mt: 70}}>
            <Button onClick={handleLogout} variant='oulined' sx={{
                color:'black',
                bgcolor:'whitesmoke',
                '&:hover':{
                    bgcolor:'rgba(196, 196, 196, 0.47)',
                    color:'rgba(0, 0, 0, 0.42)'
                }
            }} fullWidth replace>
                <LogoutOutlinedIcon sx={{position:"absolute", left:"25%"}}/> Logout
            </Button>
            </Grid>

          </Grid>

        </Box>


      </Drawer> }

      {/* Main content area */}
      <Box component="main" mt={{sm:8}} sx={{display:'flex',flexDirection:'column',height:'auto',flex: 1, p: 3, bgcolor:'rgba(214, 214, 214, 0.23)'}}>

        {children}

      </Box>
    </Box>
  );
}
