"use client";

import { Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useEffect } from "react";

export const Navbar = () => {
  // const theme = useTheme();
  useEffect(() => {
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
  }, []);

  return (
    <Toolbar className="navbar pt-2 pb-1 w-full fixed z-50 select-none flex justify-evenly align-middle">
      <Typography
        fontSize="40"
        fontWeight="500"
        fontFamily={"Bebas Neue"}
        className="text-slate-100 text-5xl cursor-pointer flex-grow h-10"
      >
        <Link href="/">Focus Up!</Link>
      </Typography>
      <Typography
        fontFamily={"Bebas Neue"}
        className="text-slate-100 text-xl cursor-pointer flex-grow"
      >
        <Link
          href="/checklist"
          style={{ textDecoration: "none", color: "#ebebeb" }}
        >
          Checklist
        </Link>
      </Typography>
      <Typography
        fontFamily={"Bebas Neue"}
        className="text-slate-100 text-xl cursor-pointer flex-grow"
      >
        <Link
          href="/focus"
          style={{ textDecoration: "none", color: "#ebebeb" }}
        >
          Focus
        </Link>
      </Typography>
      <Typography
        fontFamily={"Bebas Neue"}
        className="text-slate-100 text-xl cursor-pointer flex-grow"
      >
        <Link
          href="/about"
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
