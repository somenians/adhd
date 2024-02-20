"use client";

import { Toolbar } from "@mui/material";
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
      <p
        className="text-slate-100 text-5xl cursor-pointer flex-grow h-10"
        style={{ fontFamily: "Bebas Neue" }}
      >
        <Link href="/">Focus Up!</Link>
      </p>
      <p
        className="text-slate-100 text-xl cursor-pointer flex-grow"
        style={{ fontFamily: "Bebas Neue" }}
      >
        <Link
          href="/checklist"
          style={{ textDecoration: "none", color: "#ebebeb" }}
        >
          Checklist
        </Link>
      </p>
      <p
        className="text-slate-100 text-xl cursor-pointer flex-grow"
        style={{ fontFamily: "Bebas Neue" }}
      >
        <Link
          href="/focus"
          style={{ textDecoration: "none", color: "#ebebeb" }}
        >
          Focus
        </Link>
      </p>
      <p
        className="text-slate-100 text-xl cursor-pointer flex-grow"
        style={{ fontFamily: "Bebas Neue" }}
      >
        <Link
          href="/about"
          style={{ textDecoration: "none", color: "#ebebeb" }}
        >
          About
        </Link>
      </p>
    </Toolbar>
  );
};
