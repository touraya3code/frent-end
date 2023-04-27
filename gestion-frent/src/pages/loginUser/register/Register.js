// import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../component/Header";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import axios from "axios";
import "./Register.css";
import "../style copy.css";
import { useState } from "react";
export default function Register() {
  const [errorName, seterroName] = useState(null);
  const [errorEmail, seterroEmail] = useState(null);
  const [errorPassword, seterroPassword] = useState(null);
  const [errorCPassword, seterroCPassword] = useState(null);
    const [exist, setExist] = useState("");



  const [send, setSend] = useState(false);
  const navigate = useNavigate("");

  const [errorMessage, seterrorMessage] = useState(false);
  let [NameMessage, setNameMessage] = useState("");
  let [EmailMessage, setEmailMessage] = useState("");
  let [PasswordMesaage, setPasswordMesaage] = useState("");
  let [CpasswordMesaage, setCpasswordMesaage] = useState("");

  // const result = false;
  console.log(NameMessage);
  const patternName = /^[A-Za-z]{3}$/;
  const patternEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
  // const patternPassword =
  //   /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const patternPassword = /^[A-Za-z]{3}$/;
  const [values, setvalues] = useState({
    name: "",
    password: "",
    email: "",
    confirmP: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrorMessage(true);
    try {
    if (
       values.name === "" ||
      !patternName.test(values.name) ||
       patternName.test(values.name)
    ) {
      if (values.name === "") {
        setNameMessage("please required");
        seterroName(false);
      } else if (!patternName.test(values.name)) {
        setNameMessage("please valide");
        seterroName(false);
      } else if (patternName.test(values.name)) {
        setNameMessage("");
        seterroName(true);
      }
    }
    if (
      values.email === "" ||
      !patternEmail.test(values.email) ||
      patternEmail.test(values.email)
    ) {
      if (values.email === "") {
        setEmailMessage("please required email");
        seterroEmail(false);
      } else if (!patternEmail.test(values.email)) {
        setEmailMessage("please email");
        seterroEmail(false);
      } else if (patternEmail.test(values.email)) {
        setEmailMessage("");
        seterroEmail(true);
      }
    }
    if (
       values.password === "" ||
      !patternPassword.test(values.password) ||
       patternPassword.test(values.password)
    ) {
      if (values.password === "") {
        setPasswordMesaage("please required");
        seterroPassword(false);
      } else if (!patternPassword.test(values.password)) {
        setPasswordMesaage("please valide password");
        seterroPassword(false);
        console.log("errorPassword");
        console.log(errorPassword);
      } else {
        setPasswordMesaage("");
        seterroPassword(true);
      }
    }
    // console.log(errorPassword);

    
    if (values.password !== values.confirmP || values.confirmP === "") {
      setCpasswordMesaage("please confirm pssaword");
      seterroCPassword(false);
    } else {
      setCpasswordMesaage("");
      seterroCPassword(true);
    }



    if (
      patternPassword.test(values.password) &&
      patternEmail.test(values.email) &&
      patternPassword.test(values.password) &&
      values.password === values.confirmP

    ) {
      setSend(true);
    }
       if (send) {
         axios
           .post("http://127.0.0.1:8000/api/register", values)
           .then((res) => {
             if (res.status === 200) {
               swal("Good job!", "good", "success");
               navigate("/login");
             }
           });
       }
  }catch(error){
  if (error) {
        console.log("email deje exists");
      } 
    }
  
  };
  const HndleonChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });

    // {name:"sara",password:"dddjdjd",email:"fjfjfjf"}
    //... bach yhafid 3la name wzid 3liha passord also yhfid 3la name w pssword wzid 3lihom email ...
  };

  console.log(values.name);

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
                <form onSubmit={handleSubmit}>
                  <div class="form-row">
                    <div
                      class={`col form-group mb-3 position-relative  ${
                        errorName
                          ? "succes"
                          : errorName == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        name="name"
                        class="form-control"
                        onChange={HndleonChange}
                        placeholder="Nom"
                        value={values.name}
                      />
                      <div id="username">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <i class="fa-solid fa-circle-check"></i>
                        {errorMessage && NameMessage !== "" && (
                          <small className="text-danger">{NameMessage}</small>
                        )}
                      </div>
                    </div>

                    <div
                      class={`col form-group mb-3 position-relative ${
                        errorEmail
                          ? "succes"
                          : errorEmail == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        name="email"
                        class="form-control"
                        onChange={HndleonChange}
                        // onBlur={handleFucus}
                        placeholder="email"
                        value={values.email}

                        // focused={focused.toString()}
                      />
                      <i class="fa-solid fa-circle-exclamation"></i>
                      <i class="fa-solid fa-circle-check"></i>
                      {errorMessage && EmailMessage !== "" && (
                        <small className="text-danger">{EmailMessage}</small>
                      )}
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
                        name="password"
                        class="form-control"
                        onChange={HndleonChange}
                        // onBlur={handleFucus}
                        placeholder="password"
                        value={values.password}
                      />
                      <i class="fa-solid fa-circle-exclamation"></i>
                      <i class="fa-solid fa-circle-check"></i>
                      {errorMessage && PasswordMesaage !== "" && (
                        <small>{PasswordMesaage}</small>
                      )}
                    </div>
                    <div
                      class={`col form-group mb-3 position-relative ${
                        errorCPassword
                          ? "succes"
                          : errorCPassword == false
                          ? "warning"
                          : ""
                      } `}
                    >
                      <input
                        type="password"
                        name="confirmP"
                        class="form-control"
                        onChange={HndleonChange}
                        placeholder="conferme password"
                        value={values.confirmP}
                      />
                      <i class="fa-solid fa-circle-exclamation"></i>
                      <i class="fa-solid fa-circle-check"></i>
                      {errorMessage && CpasswordMesaage !== "" && (
                        <small>{CpasswordMesaage}</small>
                      )}
                    </div>
                  </div>
                  <div class="form-group mt-3 position-relative ">
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
}
