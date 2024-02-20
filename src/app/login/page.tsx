"use client";

import { useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  FormControl,
} from "@mui/material";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import "./login.css";

// const PaperConte = styled(Paper)(({ theme }) => ({
// 	width: 400,
// 	height: 500,
// 	padding: theme.spacing(2),
// 	...theme.typography.body2,
// 	textAlign: "center",
//     alignItems: "center",
//     alignContent: "center"
// }));
export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="w-screen h-screen m-auto">
      <Grid
        container
        rowSpacing={2}
        className="mt-40 bg-blue-300 max-w-lg m-auto max-h-min backdrop-blur-sm rounded-xl shadow-md shadow-slate-700 py-8"
      >
        <Grid xs={4} sx={{ textAlign: "center" }}></Grid>
        <Grid xs={4} sx={{ textAlign: "center" }}>
          <Typography
            fontSize={60}
            sx={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Login
          </Typography>
          <div className="input">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Username
              </InputLabel>
              <Input
                endAdornment={<InputAdornment position="end"></InputAdornment>}
                fullWidth
              />
            </FormControl>
          </div>

          <div className="input-box">
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <div className="remember-forgot">
            {/* <Button size="medium" color="white">Forgot Password?</Button> */}
          </div>

          <Button variant="contained" size="medium" className="mt-4">
            Login
          </Button>
        </Grid>
        <Grid xs={4} sx={{ textAlign: "center" }}></Grid>
      </Grid>
    </div>
  );
}
