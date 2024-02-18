import React from "react";
import { Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./style.css"
export const Navbar = () => {
	// const theme = useTheme();
	window.onscroll = function (e) {
		var scrollY = window.scrollY || document.documentElement.scrollTop;
		var navbar = document.querySelector(".navbar");
		var height = -navbar.clientHeight;
		navbar.style.transition = "transform 0.1s";

		scrollY <= Math.max(this.lastScroll, 50) ||
		window.innerWidth <= 1200 ||
		this.loaded === undefined
			? (navbar.style.transform = "translateY(0px)")
			: (navbar.style.transform = "translateY(" + height + "px)");

		this.lastScroll = scrollY;
		this.loaded = true;
	};

	return (
		<Toolbar
			sx={{
				paddingTop: 2,
				userSelect: "none",
				paddingBottom: 1,
				width: "100%",
				position: "fixed",
				zIndex: 1100,
			}}
			className="navbar"
		>
			<Typography
				fontSize="40"
				fontWeight="450"
				fontFamily={"Bebas Neue"}
				sx={{
					cursor: "pointer",
					flexGrow: 1,
					"&:hover": {
						color: "#ebebeb",
					},
					["@media (max-width:2px)"]: {
						paddingBottom: "1rem",
					},
					fontSize: 40,
					color: "#ebebeb",
				}}
			>
				<Link
					to="/"
					style={{ textDecoration: "none", color: "#ebebeb" }}
					ignoreCancelEvents={true}
				>
					Focus Up!
				</Link>
			</Typography>
			<Typography
				fontFamily={"Bebas Neue"}
				sx={{
					cursor: "pointer",
					flexGrow: 1,
					userSelect: "none",
					"&:hover": {
						color: "#c7d8ed",
					},
					["@media (max-width:2px)"]: {
						paddingBottom: "1rem",
					},
					fontSize: 20,
				}}
			>
				<Link
					to="/checklist"
					style={{ textDecoration: "none", color: "#ebebeb" }}
				>
					Checklist
				</Link>
			</Typography>
			<Typography
				fontFamily={"Bebas Neue"}
				sx={{
					cursor: "pointer",
					flexGrow: 1,
					userSelect: "none",
					"&:hover": {
						color: "#c7d8ed",
					},
					["@media (max-width:2px)"]: {
						paddingBottom: "1rem",
					},
					fontSize: 20,
				}}
			>
				<Link
					to="/focus"
					style={{ textDecoration: "none", color: "#ebebeb" }}
				>
					Focus
				</Link>
			</Typography>
			<Typography
				fontFamily={"Bebas Neue"}
				sx={{
					cursor: "pointer",
					flexGrow: 1,
					userSelect: "none",
					"&:hover": {
						color: "#c7d8ed",
					},
					["@media (max-width:2px)"]: {
						paddingBottom: "1rem",
					},
					fontSize: 20,
				}}
			>
				<Link
					to="/about"
					style={{ textDecoration: "none", color: "#ebebeb" }}
				>
					About
				</Link>
			</Typography>
			{/* <Typography
				fontFamily={"Bebas Neue"}
				sx={{
					cursor: "pointer",
					flexGrow: 1,
					userSelect: "none",
					"&:hover": {
						color: "#c7d8ed",
					},
					["@media (max-width:2px)"]: {
						paddingBottom: "1rem",
					},
					fontSize: 20,
				}}
			>
				<Link
					to="/resources"
					style={{ textDecoration: "none", color: "#ebebeb" }}
				>
					Resources
				</Link>
			</Typography> */}
		</Toolbar>
	);
};
