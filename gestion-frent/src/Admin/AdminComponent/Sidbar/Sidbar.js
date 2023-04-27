import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';
export default function Sidbar() {
  let droit = window.localStorage.getItem("status");
  return (
    <nav className="nav-Admin ">
      <div class="logo-name">
        <div class="logo-image">
          <img
            src={require("./image/D611E5AB-F26F-4C96-A89D-AE2D36381D52_4_5005_c-removebg-preview.png")}
          />
        </div>
      </div>

      <div class="menu-items">
        <ul class="nav-links">
          {droit === "chaf de magasigne" ? (
            <li>
              <Link to="/produitlist">
                {/* <i class="fa-solid fa-user"></i> */}
                <img
                  src={require("./image/produit.png")}
                  className="icons-sidebar"
                  alt=""
                />
                <span class="link-name">Article</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/HomeAdmin">
                  <img
                    src={require("./image/home.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name">Accueil</span>
                </Link>
              </li>
              <li>
                <Link to="/listServices">
                  <img
                    src={require("./image/home.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name">Services</span>
                </Link>
              </li>
              <li>
                <Link to="/ListDevision">
                  <img
                    src={require("./image/home.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name">Division</span>
                </Link>
              </li>

              <li>
                <Link to="/category">
                  <img
                    src={require("./image/categories.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name"> Catègorie </span>
                </Link>
              </li>
              <li>
                <Link to="/marque">
                  <img
                    src={require("./image/categories.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name"> Marque </span>
                </Link>
              </li>

              <li>
                <Link to="/listdemonde">
                  <img
                    src={require("./image/clipboard.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name"> Demande</span>
                </Link>
              </li>
              <li>
                <Link to="/Fournisseur">
                  <img
                    src={require("./image/packages.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name"> Fournisseur</span>
                </Link>
              </li>
              <li>
                <a href="#">
                  <img
                    src={require("./image/delivery.png")}
                    className="icons-sidebar"
                    alt=""
                  />
                  <span class="link-name"> Livraison</span>
                </a>
              </li>
            </>
          )}
        </ul>

        <ul class="logout-mode">
          <li>
            <a href="#">
              {/* <i class="uil uil-signout"></i> */}
              <i class="fa-solid fa-user"></i>
              <span class="link-name">Dèconnexion</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
