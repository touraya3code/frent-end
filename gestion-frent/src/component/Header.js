import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg ">
        <a
          class="nav-link"
          aria-current="page"
          href="#"
          style={{ width: "80px", height: "80px" }}
        >
          <img
            src={require("../images/D611E5AB-F26F-4C96-A89D-AE2D36381D52_4_5005_c-removebg-preview.png")}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </a>
      </nav>
    </div>
  );
}
