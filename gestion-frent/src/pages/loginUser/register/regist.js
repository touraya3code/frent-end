import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Header from "../../../component/Header";
import swal from "sweetalert";
const Creecompte = () => {
  // varivale value input
  const [login, setName] = useState("");
  const [matricule, setmatricule] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  
  // end value input
  const [errorlogin, seterroLogin] = useState(null);
  const [errorPassword, seterroPassword] = useState(null);
  const [errorCPassword, seterroCPassword] = useState(null);
  const [errormatricule, seterroMatricule] = useState(null);

  // varivale validation form
  const [Mlogin, setLogin] = useState("");
  const [Mpassword, Msetpassword] = useState("");
  const [MCpassword, MCsetpassword] = useState("");
  const [Mmatricule, setMmatricule] = useState("");

  const [exist, setExist] = useState("");

  // end varivale validation form
  // varivale validation form
  const rgExplogin = /^[a-z]{4}$/;
  const rgExpMmatricule = /^[a-zA-z]{2}[1-9]{4,}$/;

  const rgExpassword = /[a-z]{3}$/;
  const [Accept, setError] = useState(false);

  async function SendData(e) {
    let flag = true;
    e.preventDefault();
    setError(true);
    try {
      if (
        (
          rgExplogin.test(login) &&
          rgExpassword.test(password) &&
          rgExpMmatricule.test(matricule)&&
          password === Cpassword)
      )
     {
        flag = true;
      } else if (
        login === "" ||
        matricule === "" ||
        password === "" ||
        password !== Cpassword
      ) {
        flag = false;
        //start email

        //end email
        if (login === "") {
          setLogin("S'il Vous plait entrer login");
          seterroLogin(false);
        } else if (!rgExplogin.test(login)) {
          setLogin("plese valide login");
          seterroLogin(false);
        } else {
          setLogin("");
          seterroLogin(true);
        }
             if (matricule === "") {
               setMmatricule("S'il Vous plait entrer matricule");
               seterroMatricule(false);
             } else if (!rgExplogin.test(login)) {
               setMmatricule("plese valide matricule");
               seterroMatricule(false);
             } else {
               setMmatricule("");
               seterroMatricule(true);
             }
        //end login
        if (password === "") {
          Msetpassword("S'il Vous plait entrer password");
          seterroPassword(false);
        } else if (!rgExpassword.test(password)) {
          Msetpassword("plese valide password");
          seterroPassword(false);
        } else {
          Msetpassword("");
          seterroPassword(true);
        }
        //end pssword
        if (password !== Cpassword) {
          MCsetpassword("confirm password non valide");
          seterroCPassword(false);
        } else if (password === Cpassword) {
          MCsetpassword("");
          seterroCPassword(true);
        }
      } else if (!rgExplogin.test(login) || !rgExpassword.test(password)) {
        flag = false;
        // if (!rgExpEmail.test(email)) {
        //   MSetEmail("email not valide");
        // }
        // if (!rgExplogin.test(login)) {
        //   MsetName("login not valide");

        // }
        // if (!rgExpassword.test(password)) {
        //   Msetpassword("password not valide");
        // }
      }

      if (flag) {
        let formData = {
          login: login,
          password: password,
          matricule:matricule
        };

        let res = await axios.post(
          "http://127.0.0.1:8000/api/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // .then(t=>console.log(t));
        if (res.status === 200) {
          swal("success!", "register success", "success");
          window.location.pathname = "/login";
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 442) {
        swal("failde!", "email deja exist", "warning");
      }
    }
  }
  return (
    <div>
      <Header />

      <div className="container mt-5 mb-5   ">
        <div class="row  d-flex  justify-content-between ">
          <div className="col-md-6  col-sm-12">
            <img
              style={{ height: "100%", width: "100%" }}
              src={require("../../image/undraw_Programming_re_kg9v (2).png")}
              alt=""
              className="image_hidden"
            />
          </div>
          <div class="col-md-5 col-sm-12  ">
            <div class="card register">
              <header class="p-3 text-center f-bold text-info">
                <h1>Register</h1>
              </header>
              <article class="card-body ">
                <form onSubmit={SendData}>
                  <div class="form-row">
                    <div
                      class={`col form-group mb-3 position-relative"
                          ${
                            errorlogin
                              ? "succes"
                              : errorlogin == false
                              ? "warning"
                              : ""
                          }`}
                    >
                      <input
                        name="login"
                        class="form-control"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        placeholder="login ddd"
                        value={login}
                      />
                      <div id="username">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <i class="fa-solid fa-circle-check"></i>
                        {Accept && Mlogin !== "" && (
                          <small style={{ color: "red" }}>{Mlogin} </small>
                        )}
                      </div>
                    </div>

                    <div
                      class={` col form-group mb-3 position-relative${
                        seterroLogin
                          ? "succes"
                          : seterroLogin == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        name="text"
                        class="form-control"
                        // onBlur={handleFucus}
                        placeholder="matricule"
                        value={matricule}
                        onChange={(e) => {
                          setmatricule(e.target.value);
                        }}

                        // focused={focused.toString()}
                      />
                      <i class="fa-solid fa-circle-exclamation"></i>
                      <i class="fa-solid fa-circle-check"></i>
                      {Accept && Mmatricule !== "" && (
                        <small style={{ color: "red" }}>{Mmatricule}</small>
                      )}
                      {exist === "" ? (
                        ""
                      ) : (
                        <small style={{ color: "red" }}>{exist}</small>
                      )}
                    </div>

                    <div
                      class={`col form-group mb-3 position-relative ${
                        errormatricule
                          ? "succes"
                          : errormatricule == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        // onBlur={handleFucus}
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                      <div id="username">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <i class="fa-solid fa-circle-check"></i>
                        {Accept && Mlogin !== "" && (
                          <small style={{ color: "red" }}>{Mlogin} </small>
                        )}
                      </div>
                    </div>
                    <div
                      class={`col form-group mb-3 position-relative ${
                        errorPassword
                          ? "succes"
                          : errorPassword == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        type="password"
                        name="confirmP"
                        class="form-control"
                        placeholder="conferme password"
                        value={Cpassword}
                        onChange={(e) => {
                          setCpassword(e.target.value);
                        }}
                      />
                      <i class="fa-solid fa-circle-exclamation"></i>
                      <i class="fa-solid fa-circle-check"></i>
                      {Accept && errorCPassword !== "" && (
                        <small style={{ color: "red" }}>{errorCPassword}</small>
                      )}
                    </div>
                  </div>
                  <div class="form-group mt-3 ">
                    <button
                      type="submit"
                      class="btn btn-info text-white btn-block"
                      style={{ width: "100%" }}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </article>
              <div class=" card-body text-center">
                Have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creecompte;
