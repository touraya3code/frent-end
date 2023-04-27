import React, { useEffect } from "react";
import NavbarAdmin from "../AdminComponent/Header/NavbarAdmin";
import Sidbar from "../AdminComponent/Sidbar/Sidbar";
import "./AdminHome.css";
import { useState } from "react";
import "../../pages/loginUser/login/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import "../../pages/loginUser/register/Register.css";
import swal from "sweetalert";
export default function AdminHome() {
  // varivale value input
  const [login, setName] = useState("");
  const [matricule, setmatricule] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [droit, setDroit] = useState();


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
  const rgExpMmatricule = /^[0-9]{2}$/;
  const rgExpassword = /[a-z]{3}$/;
  const [Accept, setError] = useState(false);

  async function SendData(e) {
    let flag = true;
    e.preventDefault();
    setError(true);
    try {
      if (
        rgExplogin.test(login) &&
        rgExpassword.test(password) &&
        rgExpMmatricule.test(matricule) &&
        password === Cpassword
      ) {
        flag = true;
      } else if (
        login === "" ||
        matricule === "" ||
        password === "" ||
        password !== Cpassword
      ) {
        flag = false;
        //start email

        //end email /////////////////////////// /////////////////////////// ///////////////////////////
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
        //matricule /////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////
        if (matricule === "") {
          setMmatricule("S'il Vous plait entrer matricule");
          seterroMatricule(false);
        } else if (!rgExpMmatricule.test(matricule)) {
          setMmatricule("plese valide matricule");
          seterroMatricule(false);
        } else {
          setMmatricule("");
          seterroMatricule(true);
        }

        //password//////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////

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
      } else if (
        !rgExplogin.test(login) ||
        !rgExpassword.test(password) ||
        !rgExpMmatricule.test(matricule)
      ) {
        flag = false;
      }

      if (flag) {
        let formData = {
          login: login,
          password: password,
          matricule: matricule,
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
          window.localStorage.setItem("status", droit);
          window.localStorage.setItem("matricule", matricule);

          swal("success!", "register success", "success");
          window.location.pathname = "/HomeAdmin";
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 442) {
        swal("failde!", "matricule déja exist ", "warning");
      }
    }
  }
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/register/index").then((res) => {
      console.log(res.data.message);
      setUsers(res.data);
    });
  },[]);
  console.log(Users);

    const [devesion, setDevesion] = useState([]);
    // function list data
    useEffect(() => {
      fetchCategory();
    }, []);

    const fetchCategory = async () => {
      axios.get("http://127.0.0.1:8000/api/divesion/index").then((res) => {
        setDevesion(res.data);
      });
    };

  return (
    <div>
      <Sidbar />
      <section class="dashboard">
        <NavbarAdmin />
        <div class="dash-content">
          <div class="overview">
            <div class="title">
              <div className="icons_2">
                <i class="uil uil-tachometer-fast-alt"></i>
              </div>
              <span class="text">Accueil</span>
            </div>

            <div class="boxes">
              <div class="box box1">
                <i class="uil uil-thumbs-up"></i>
                <span class="text">Tout les Agents</span>
                <span class="number">50,120</span>
              </div>
              <div class="box box2">
                <i class="uil uil-comments"></i>
                <span class="text">Tout les demande</span>
                <span class="number">20,120</span>
              </div>
              <div class="box box3">
                <i class="uil uil-share"></i>
                <span class="text">Tout les articles</span>
                <span class="number">10,120</span>
              </div>
            </div>
          </div>

          <div class="activity">
            <div class="title">
              <nav class="navbar navbar-expand  active bg-light w-100 bg-white">
                <div class="container-fluid">
                  <div
                    class="collapse navbar-collapse  d-flex "
                    id="navbarSupportedContent"
                  >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                      <li class="nav-item ">
                        <button
                          type=""
                          className="btn btn-info me-3 text-white  fs-5"
                        >
                          execle
                        </button>
                      </li>
                      <li class="nav-item">
                        <button
                          type=""
                          className="btn btn-info me-3 text-white fs-5"
                        >
                          pdf
                        </button>
                      </li>
                      <li class="nav-item">
                        <button
                          type=""
                          className="btn btn-info text-white fs-5"
                        >
                          word
                        </button>
                      </li>
                    </ul>
                    <form class="d-flex" role="search">
                      <input
                        class="form-control me-2"
                        type="search"
                        placeholder="search"
                        aria-label="Search"
                      />
                      <button class="btn btn-outline-success" type="submit">
                        Recherche
                      </button>
                    </form>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      class="btn btn-primary ms-3 fs-5"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      +
                    </button>

                    {/* <!-- Modal --> */}
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Modal title
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form onSubmit={SendData}>
                              <div class="form-row">
                                {/* start login */}

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
                                    placeholder="login"
                                    value={login}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && Mlogin !== "" && (
                                      <small style={{ color: "red" }}>
                                        {Mlogin}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                {/* end login */}

                                <div
                                  class={` col form-group mb-3 position-relative ${
                                    errormatricule
                                      ? "succes"
                                      : errormatricule == false
                                      ? "warning"
                                      : ""
                                  } `}
                                >
                                  <input
                                    name="number"
                                    class="form-control"
                                    // onBlur={handleFucus}
                                    placeholder="matricule"
                                    value={matricule}
                                    onChange={(e) => {
                                      setmatricule(e.target.value);
                                    }}

                                    // focused={focused.toString()}
                                  />
                                  <div className="username">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && Mmatricule !== "" && (
                                      <small style={{ color: "red" }}>
                                        {Mmatricule}
                                      </small>
                                    )}
                                    {exist === "" ? (
                                      ""
                                    ) : (
                                      <small style={{ color: "red" }}>
                                        {exist}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                <select
                                  class="form-select mb-3"
                                  aria-label="Default select example"
                                >
                                  {devesion.map((dev) => (
                                    <option value={dev.id}>
                                      {dev.nom_divesion}
                                    </option>
                                  ))}
                                </select>

                                <select
                                  class="form-select mb-3"
                                  aria-label="Default select example"
                                  onChange={(e) => setDroit(e.target.value)}
                                >
                                  <option selected>choisir droit</option>
                                  <option value="user">user</option>
                                  <option value="admin">admin</option>
                                  <option value="chaf de divesion">
                                    chaf de divesion
                                  </option>
                                  <option value="chaf de services">
                                    chaf de services
                                  </option>
                                  <option value="chaf de magasigne">
                                    chaf de magasigne
                                  </option>
                                </select>
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
                                    // onBlur={handleFucus}
                                    placeholder="mot de passe"
                                    value={password}
                                    onChange={(e) => {
                                      setpassword(e.target.value);
                                    }}
                                  />
                                  <div className="username">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && Mpassword !== "" && (
                                      <small style={{ color: "red" }}>
                                        {Mpassword}
                                      </small>
                                    )}
                                  </div>
                                </div>
                                <div
                                  class={`col form-group  position-relative mb-3${
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
                                    placeholder="confirmer mot de passe"
                                    value={Cpassword}
                                    onChange={(e) => {
                                      setCpassword(e.target.value);
                                    }}
                                  />
                                  <div className="username">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && MCpassword !== "" && (
                                      <small style={{ color: "red" }}>
                                        {MCpassword}
                                      </small>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div class="form-group  position-relative mt-3">
                                <button
                                  type="submit"
                                  class="btn btn-info text-white btn-block"
                                  style={{ width: "100%" }}
                                >
                                  Ajouter
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div class="activity-data">
              <table class="table align-middle mb-0 bg-white">
                <thead class="bg-light">
                  <tr>
                    <th>Login</th>
                    <th>matricule</th>
                    <th>Service</th>
                    <th>Devision</th>
                    <th>Droit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((iteam) => (
                    <>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="ms-3">
                              <p class="fw-bold mb-1">{iteam.login}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p class="fw-normal mb-1">{iteam.matricule}</p>
                        </td>

                        <td>service</td>

                        <td>Active</td>

                        <td>{iteam.status}</td>

                        <td>
                          <div className="row">
                            <div className="col-6">
                              <Link
                                to={`/updateUser/${iteam.id}`}
                                class="btn btn-primary ms-3"
                              >
                                edit
                              </Link>
                            </div>
                            <div className="col-6">
                              <button
                                type="button"
                                class="btn btn-danger btn-sm btn-rounded"
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
