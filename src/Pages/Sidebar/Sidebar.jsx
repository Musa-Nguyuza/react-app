import React, { useState } from 'react';
import {
  Box, Drawer, Typography, IconButton, Divider, Toolbar, AppBar, Button, Grid,
  useTheme, useMediaQuery
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../assets/logo-full.png'
import { Link, useNavigate } from 'react-router-dom'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Menu, X } from 'lucide-react'

const drawerWidth = 280;

export default function SidebarLayout({ children, captureHeading }) {
  const theme = useTheme();
  const navigate = useNavigate();
   const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };




  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const checkSize = (isMd || isLg || isXl);

  if (checkSize)
  {
    toggleDrawer(false);
  }


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* This is my header */}
      <AppBar position="fixed" elevation={1} sx={{ width: checkSize ? `calc(100% - ${drawerWidth}px)` : "100%", ml: drawerWidth, height: '95px', bgcolor: "White" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: checkSize ? 'center' : 'space-between', alignContent: 'center', marginTop: '2%' }}>

          {!checkSize &&
            <Link to={"/"} style={{ height: "70%", width: '30%' }}>
              <Box component="img" src={Logo} alt="Logo"
                sx={{
                  width: { xs: "100%", sm: '200px' }, height: { xs: '70%', sm: '40px' },
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }
                }
              /> </Link>
          }
          <Typography variant="h6" sx={{ color: 'black', textWrap: { xs: 'wrap', textAlign: 'center' }, fontSize:{xs:15,sm:18, md:20} }}>
            {captureHeading}
          </Typography>
          <Box sx={{ display: checkSize ? 'none' : 'flex', width: '30%', color: 'black', alignContent: 'right', justifyContent: 'right' }}>
            <Menu onClick={toggleDrawer(true)} className='cursor-pointer'/>
          </Box>
        </Toolbar>
      </AppBar>



      {/* This is my hidden side menu */}
     {!checkSize && <Drawer
      open={open}
      onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: '100vw', height: "100vh", bgcolor:'rgb(200,210,208,0.1)',
            backdropFilter:'blur(2px)'
            , boxSizing: 'border-box'
          },
        }}
      onClick={toggleDrawer(false)}>
        {/* <Box sx={{position:'absolute', right:'10px', mt:3, color:'white', bgcolor:'white', p:2, borderRadius:'50%'}}>
          <X onClick={toggleDrawer(false)} className='cursor-pointer text-blue-600'/>
        </Box> */}
        <Box sx={{bgcolor:'white',minHeight:'500px', height:'100vh', width:240, border:'1px solid red', position:'relative'}}> 
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, height: '100px' }}>

            <Box component="img" src={Logo} alt="Logo" sx={{ width: 200, height: 50 }} />

          </Toolbar>

          <Divider />

          {/* dide bar content */}

          <Box sx={{ px: 2, py: 2 }} >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Options
            </Typography>

            <Grid container spacing={2}>

              <Grid item size={12}>
                <Button LinkComponent={Link} to='/homepage' variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <HomeIcon sx={{ position: "absolute", left: "25%" }} /> Home
                </Button>
              </Grid>


              <Grid item size={12}>
                <Button onClick={() => window.history.back()} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <ArrowBackTwoToneIcon sx={{ position: "absolute", left: "25%" }} /> Back
                </Button>
              </Grid>

              {/* <Grid item size={12} sx={{ mt: 70 }}>
                <Button onClick={handleLogout} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <LogoutOutlinedIcon sx={{ position: "absolute", left: "25%" }} /> Logout
                </Button>
              </Grid> */}

            </Grid>
                 
          </Box>
                
                <Button onClick={handleLogout} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  position:'absolute',
                  bottom:'10px',
                  width:'90%',
                  left:'5%',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }}  replace>
                  <LogoutOutlinedIcon sx={{ position: "absolute", left: "25%" }} /> Logout
                </Button>
        </Box>
      </Drawer> }





      {/* This is a Sidebar */}
      {(isMd || isLg || isXl) &&
        <Drawer
          variant="permanent"
          sx={{
            width: checkSize ? drawerWidth : "0vw",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              minHeight:'100px',
              width: drawerWidth, height: checkSize ? "100vh" : "97px"
              , boxSizing: 'border-box'
            },
          }}
        >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, height: '120px' }}>

            <Box component="img" src={Logo} alt="Logo" sx={{ width: 200, height: 50 }} />

          </Toolbar>

          {/* <Divider /> */}

          {/* dide bar content */}

          <Box sx={{ px: 2, py: 2, height: '100%' }} >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Options
            </Typography>

            <Grid container spacing={2}>

              <Grid item size={{ md: 12 }}>
                <Button LinkComponent={Link} to='/homepage' variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <HomeIcon sx={{ position: "absolute", left: "25%" }} /> Home
                </Button>
              </Grid>


              <Grid item size={{ md: 12 }}>
                <Button onClick={() => window.history.back()} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <ArrowBackTwoToneIcon sx={{ position: "absolute", left: "25%" }} /> Back
                </Button>
              </Grid>

              {/* <Grid item size={{ md: 12 }} sx={{ mt: 70, mb: 2 }}>
                <Button onClick={handleLogout} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} fullWidth replace>
                  <LogoutOutlinedIcon sx={{ position: "absolute", left: "25%" }} /> Logout
                </Button>
              </Grid> */}

            </Grid>

          </Box>
                <Button onClick={handleLogout} variant='oulined' sx={{
                  color: 'black',
                  bgcolor: 'whitesmoke',
                  mb:'10px',
                  width:'90%',
                  ml:2,
                  '&:hover': {
                    bgcolor: 'rgba(196, 196, 196, 0.47)',
                    color: 'rgba(0, 0, 0, 0.42)'
                  }
                }} replace>
                  <LogoutOutlinedIcon sx={{ position: "absolute", left: "25%" }} /> Logout
                </Button>

        </Drawer>}

      {/* Main content area */}
      <Box component="main" sx={{ display: 'flex', mt: 8, flexDirection: 'column', height: 'auto', flex: 1, p: 3, bgcolor: 'rgba(214, 214, 214, 0.23)' }}>

        {children}

      </Box>
    </Box>
  );
}
