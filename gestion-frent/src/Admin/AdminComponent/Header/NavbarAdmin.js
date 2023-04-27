import React from 'react';
import "./Navbar.css";
export default function NavbarAdmin() {
  return (
    <div>
      <div class="top container ">
        <i class="uil  fa-solid fa-bars"></i>
        <div class="search-box">
          <i class="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>
        {/* <img src={require("")} alt="" /> */}

        <div className="profileAdmin">
          <img
            src={require("../../../pages/image/undraw_Coding_re_iv62-removebg-preview.png")}
          />
        </div>
      </div>
    </div>
  );
}
