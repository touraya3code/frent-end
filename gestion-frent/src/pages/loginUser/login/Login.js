import React from "react";
import { Link } from "react-router-dom";
import "../style copy.css";
import axios from "axios";

import { useState } from "react";
import Header from "../../../component/Header";
import "./login.css";
import swal from "sweetalert";
export default function Login() {
  const [matricule, setmatricule] = useState("");
  const [password, setpassword] = useState("");
  const [Accept, setError] = useState(false);
  const [errormatricule, seterromatricule] = useState(null);
  const [errorPassword, seterroPassword] = useState(null);
  const [exist, setExist] = useState("");
  const [Mmatricule, MSetmatricule] = useState("");
  const [Mpassword, Msetpassword] = useState("");

  const sign_up = async (e) => {
    let flag = true;
    setError(true);
    e.preventDefault();
    try {
      if (matricule !== "" && password !== "") {
        flag = true;
      } else if (matricule === "" || password === "") {
        flag = false;
        if (matricule === "") {
          MSetmatricule("S'il Vous plait entrer matricule");
          seterromatricule(false);
        } else {
          MSetmatricule("");
        }
        if (password === "") {
          Msetpassword("S'il Vous plait entrer password");
          seterroPassword(false);
        }
      }
      if (flag) {
        let formData = {
          matricule: matricule,
          password: password,
        };
        let res = await axios.post(
          "http://127.0.0.1:8000/api/login/index",
          formData
        );
        if (res.status === 200) {
          window.localStorage.setItem("matricule", matricule);
          window.localStorage.setItem("password", password);
          if (res.data.message === "admin") {
            window.location.pathname = "/HomeAdmin";
          }
          if (res.data.message === "user")
            window.location.pathname = "/demonde";
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 401) {
        swal("warning!", "matricule or password not valide", "warning");
      }
    }
  };

  return (
    <div>
      <Header />
      <Link to="/HomeAdmin">dash</Link>
      <div className="container mt-5 mb-5   ">
        <div class="row  justify-content-between">
          <div className="col-md-6 col-sm-12">
            <img
              style={{ height: "100%", width: "100%" }}
              src={require("../../image/undraw_Programming_re_kg9v (2).png")}
              alt=""
              className="image_hidden"
            />
          </div>
          <div class="col-md-5  ">
            <div class="card register">
              <header class=" text-center p-3 f-bold text-info">
                <h2>CONNEXION</h2>
              </header>
              <article class="card-body">
                <form>
                  <div class="form-row">
                    <div
                      class={`col form-group mb-3  position-relative ${
                        errormatricule
                          ? "succes"
                          : errormatricule == false
                          ? "warning"
                          : ""
                      }`}
                    >
                      <input
                        type="number"
                        name="matricule"
                        class="form-control "
                        placeholder="matricule"
                        onChange={(e) => setmatricule(e.target.value)}
                      />
                      <div id="username">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <i class="fa-solid fa-circle-check"></i>
                        {Accept && Mmatricule !== "" && (
                          <small className="text-danger">{Mmatricule}</small>
                        )}
                      </div>
                    </div>
                    <div
                      class={`col form-group mb-3  position-relative ${
                        errorPassword
                          ? "succes"
                          : errorPassword == false
                          ? "warning"
                          : ""
                      }`}
                    >
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder=" mot de passe"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      <div id="username">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <i class="fa-solid fa-circle-check"></i>
                        {Accept && Mpassword !== "" && (
                          <small style={{ color: "red" }}>{Mpassword}</small>
                        )}
                        {exist === "" ? (
                          ""
                        ) : (
                          <small style={{ color: "red" }}>{exist}</small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="form-group mt-3">
                    <button
                      type="submit"
                      class="btn btn-info text-white"
                      style={{ width: "100%" }}
                      onClick={sign_up}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
