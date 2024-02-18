import React from "react";
import { Grid, Stack, Typography, Box, Paper, styled, IconButton, Button} from "@mui/material";

import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// import "./style.css";
import { Fade, Hinge, JackInTheBox, Zoom, Bounce } from "react-awesome-reveal";
import "./Login.css";

// const PaperConte = styled(Paper)(({ theme }) => ({
// 	width: 400,
// 	height: 500,
// 	padding: theme.spacing(2),
// 	...theme.typography.body2,
// 	textAlign: "center",
//     alignItems: "center",
//     alignContent: "center"
// }));
export const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

	return (
		<section className="login">
            <div id="wrapper">
                <Grid container rowSpacing={2}>
                    <Grid xs={4} sx={{ textAlign: "center" }}></Grid>
                    <Grid xs={4} sx={{ textAlign: "center" }}>
                        <Typography
                            fontSize={60}
                            sx={{ fontFamily: "Bebas Neue, sans-serif" }}
                        >
                            Login
                        </Typography>
                        <div className="input-box">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Username</InputLabel>
          <Input
            
            endAdornment={
              <InputAdornment position="end">
                
                  
              
              </InputAdornment>
            }
          />
        </FormControl>
                        </div>

                        <div className="input-box">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ?  <Visibility />: <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
                        </div>

                        <div className="remember-forgot">
                          {/* <Button size="medium" color="white">Forgot Password?</Button> */}
                            
                        </div>

                        <Button variant="contained" size="medium">
          Login
        </Button>
                    </Grid>
                    <Grid xs={4} sx={{ textAlign: "center" }}></Grid>
                </Grid>
            </div>
		</section>
	);
};