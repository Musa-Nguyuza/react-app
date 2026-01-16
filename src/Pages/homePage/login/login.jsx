import React, { useState } from 'react';
import Box from '@mui/material/Box'
import '../home/Homepage.css';
import logo from '../../../assets/logo-full.png'
import { Container, Typography, useTheme, useMediaQuery, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



const Login = () => {

    const appName = "RISK EXECUTION APP"
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const checkSize = (isMd || isLg || isXl);
    const [btnText, setBtnText] = useState("Login");



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState('');
    const navigate = useNavigate();



    const handleLogin = async () => {
        try {
            setBtnText("Loading...");
            const res = await axios.post('https://riskapp-backend.onrender.com/api/login', { username, password });
            localStorage.setItem('token', res.data.token);


            navigate("/homepage", { replace: true })
        } catch (err) {
            setBtnText("Login");
            if (err.response && err.response.data && err.response.data.message) {
                seterror(err.response.data.message);
            } else {
                seterror("Something went wrong. Please try again.");
            }
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };


    return (

        <>
            <div className="main main_main" style={{ overflowY: checkSize ? "hidden" : "scroll", scrollbarWidth: 'none'}}>
                {checkSize ?
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
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    }}>

                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{
                                width: { xs: "70%", sm: "50%", md: "40%", lg: "30%" }, // responsive widths
                                height: "auto", // keeps aspect ratio intact
                                alignSelf: "flex-start",
                                maxWidth: "200px", // optional: prevents it from getting too huge
                            }}
                        />


                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: '20%',

                        }} >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",  // extra-small screens
                                        sm: "2rem",    // small screens
                                        md: "2.5rem",  // medium screens
                                        lg: "3rem",    // large screens
                                    },
                                    fontWeight: "bold",
                                    color: "white",
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center", // ensures proper alignment on small screens
                                }}
                            >
                                {appName}
                            </Typography>


                            <Grid container sx={{ color: 'white', width: '80%' }}>
                                <Grid item size={{ sm: 12 }}>
                                    <Typography>Username</Typography>
                                    <TextField

                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                    borderWidth: '2px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'blue',
                                                },
                                            },
                                            input: {
                                                color: 'white',
                                            },

                                        }}
                                        variant="outlined"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item size={{ sm: 12 }} mt={5}>
                                    <Typography>Password</Typography>
                                    <TextField
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                    borderWidth: '2px',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'blue',
                                                },
                                            },
                                            input: {
                                                color: 'white',
                                            },

                                        }}
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Typography sx={{ color: 'red', bgcolor: 'rgba(1, 1, 1, 0.47)' }}>{error}</Typography>
                            <Button variant="contained" color="primary"
                                sx={{
                                    py: { xs: 1.5, md: 2.5 },   // smaller padding on small screens
                                    fontSize: { xs: '0.9rem', md: '1.1rem' }, // responsive text size
                                    borderRadius: 2,
                                    width: '80%',
                                    mt: 4,
                                    backgroundColor: 'white',
                                    color: 'black',
                                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgb(116, 111, 121)',
                                        transform: 'translateY(-4px)',
                                        color: 'white',
                                        boxShadow: '0 8px 20px rgba(52, 53, 54, 0.5)',
                                    },
                                }}

                                onClick={handleLogin}>
                                {btnText}
                            </Button>
                        </Box>



                    </Box> :
                    <>

                        <Box sx={{
                            width: {sm:"70vw", xs:"100vw"},
                            height: "auto",
                            py:2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "Center",
                            alignItems: "center",
                            backdropFilter: "blur(10px)",
                            background: "rgba(61, 54, 54, 0.43)",
                            borderRadius: 3,
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                        }}>
                            <Box component="img" src={logo} alt="Logo"
                                sx={{ width: "60%", height: '17%', alignSelf: "center", mb: 10 }} />


                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",

                            }}>

                                <Typography
                                    sx={{
                                        fontSize: "1.8rem",
                                        fontWeight: "bold",
                                        color: "White",
                                        flexGrow: 1,     // takes available space
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>{appName}</Typography>

                                <Grid container sx={{ color: 'white', px: 4, display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Grid item size={{ sm: 12 }}>
                                        <Typography>Username</Typography>
                                        <TextField

                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'white',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'blue',
                                                    },
                                                },
                                                input: {
                                                    color: 'white',
                                                },

                                            }}
                                            variant="outlined"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item size={{ sm: 12 }} mt={2}>
                                        <Typography>Password</Typography>
                                        <TextField
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'white',
                                                        borderWidth: '2px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'blue',
                                                    },
                                                },
                                                input: {
                                                    color: 'white',
                                                },

                                            }}
                                            type="password"
                                            variant="outlined"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Typography sx={{ color: 'red', bgcolor: 'rgba(1, 1, 1, 0.47)' }}>{error}</Typography>
                                <Button variant="contained" color="primary"
                                    sx={{
                                        py: { xs: 1.5, md: 2.5 },   // smaller padding on small screens
                                        fontSize: { xs: '0.9rem', md: '1.1rem' }, // responsive text size
                                        borderRadius: 2,
                                        width: '80%',
                                        mt: 4,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgb(116, 111, 121)',
                                            transform: 'translateY(-4px)',
                                            color: 'white',
                                            boxShadow: '0 8px 20px rgba(52, 53, 54, 0.5)',
                                        },
                                    }}

                                    onClick={handleLogin}>
                                    Login
                                </Button>
                            </Box>



                        </Box>
                    </>
                }

            </div>
        </>
    );

};

export default Login