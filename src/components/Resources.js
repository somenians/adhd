import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import "./style.css";
import { Fade, Hinge, JackInTheBox, Zoom, Bounce } from "react-awesome-reveal";

export const Resources = () => {
	return (
		<section className="resources">
			<Grid container rowSpacing={2}>
				<Grid xs={4} sx={{ textAlign: "center" }}></Grid>
				<Grid xs={4} sx={{ textAlign: "center" }}>
					<Typography
						fontSize={60}
						sx={{ fontFamily: "Bebas Neue, sans-serif" }}
					>
						Resources
					</Typography>
				</Grid>
				<Grid xs={4} sx={{ textAlign: "center" }}></Grid>
			</Grid>
		</section>
	);
};
