import React, { useEffect } from "react";
import NavbarAdmin from "../../AdminComponent/Header/NavbarAdmin";
import Sidbar from "../../AdminComponent/Sidbar/Sidbar";
// import "./AdminHome.css";
import { useState } from "react";
// import "../../pages/loginUser/login/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import "../../pages/loginUser/register/Register.css";
import swal from "sweetalert";
export default function Fournisseur() {
  const [Id, setId] = useState("");
  // console.log(Id);
  // varivale value input
  const [Nom, setNom] = useState("");
  // end value input
  const [errorNom, seterrorNom] = useState(null);
  // varivale validation form
  const [MNom, setMNom] = useState("");
  // end varivale validation form
  // varivale validation form
  const [Accept, setError] = useState(false);

  /// function send data
  async function SendData(e) {
    let flag = false;
    e.preventDefault();
    setError(true);
    try {
      if (Nom === "") {
        flag = false;
        if (Nom === "") {
          setMNom("plesee enter nome f");
          seterrorNom(false);
        } else {
          setMNom("");
          seterrorNom(true);
        }
      } 
      else {
           flag = true;
         }
      if (flag) {
        let formData = {
          Nom: Nom,
        };

        let res = await axios.post(
          "http://127.0.0.1:8000/api/fournisseur/store",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // .then(t=>console.log(t));
        if (res.status === 200) {
          //   window.localStorage.setItem("email", email);
          swal("success!", "register success", "success");
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 442) {
        swal("failde!", "matricule déja exist ", "warning");
      }
    }
  }
  const [fournisseur, setfournisseur] = useState([]);
  // function list data
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/fournisseur/index").then((res) => {
      setfournisseur(res.data);
    });
  }, []);

  // start update category
  async function update(e) {
    let flag = true;
    // let img = image.type;
    e.preventDefault();

    try {
      let formdata = {
        nom: Nom,
      };
      // if (flag) {

      if (Nom !== "") {
        let res = await axios.post(
          "http://127.0.0.1:8000/api/fournisseur/update/" + Id,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // .then(t=>console.log(t.response));
        if (res.status === 200) {
          window.location.pathname = "/dash/Categorie";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // end update category
  ///////////////////////function show data ////////////////////////////////////////
  const [nom_one, setnom_one] = useState("");
  useEffect(() => {
    fetchCtegory();
  }, []);
  const fetchCtegory = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/fournisseur/show/${Id}`)
      .then((res) => {
        console.log(res.data);
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
              <span class="text">Les fournisseur</span>
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
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button class="btn btn-outline-success" type="submit">
                        Search
                      </button>
                    </form>
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      class="btn btn-primary ms-3"
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
                            errorNom
                              ? "succes"
                              : errorNom == false
                              ? "warning"
                              : ""
                          }`}
                                >
                                  <input
                                    name="Nom"
                                    class="form-control"
                                    onChange={(e) => {
                                      setNom(e.target.value);
                                    }}
                                    placeholder="Nom f"
                                    value={Nom}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && MNom !== "" && (
                                      <small style={{ color: "red" }}>
                                        {MNom}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                {/* end login */}
                              </div>
                              <div class="form-group  position-relative mt-3">
                                <button
                                  type="submit"
                                  class="btn btn-info text-white btn-block"
                                  style={{ width: "100%" }}
                                >
                                  Register
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
                    <th>Id</th>
                    <th>Nom</th>
                    <th>date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fournisseur.map((iteam) => (
                    <>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="ms-3">
                              <p class="fw-bold mb-1">{iteam.id}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="ms-3">
                              <p class="fw-bold mb-1">{iteam.nom}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="ms-3">
                              <p class="fw-bold mb-1">{iteam.created_at}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="row">
                            <div className="col-6">
                              <button
                                type="button"
                                class="btn btn-primary ms-3"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={(e) => setId(iteam.id)}
                              >
                                edit
                              </button>

                              <div
                                class="modal fade"
                                id="editModal"
                                tabindex="-1"
                                aria-labelledby="exampleModalLabeledit"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="exampleModalLabeledit"
                                      >
                                        Edit Category
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <form onSubmit={update}>
                                        <div class="form-row">
                                          {/* start login */}

                                          <div
                                            class={`col form-group mb-3 position-relative"
                          ${
                            errorNom
                              ? "succes"
                              : errorNom == false
                              ? "warning"
                              : ""
                          }`}
                                          >
                                            <input
                                              name="Nom"
                                              class="form-control"
                                              value={nom_one}
                                              onChange={(e) =>
                                                setnom_one(e.target.value)
                                              }
                                              placeholder="Nom Category"
                                            />
                                            <div className="username_admine">
                                              <i class="fa-solid fa-circle-exclamation"></i>
                                              <i class="fa-solid fa-circle-check"></i>
                                              {Accept && MNom !== "" && (
                                                <small style={{ color: "red" }}>
                                                  {MNom}{" "}
                                                </small>
                                              )}
                                            </div>
                                          </div>

                                          {/* end login */}
                                        </div>
                                        <div class="form-group  position-relative mt-3">
                                          <button
                                            type="submit"
                                            class="btn btn-info text-white btn-block"
                                            style={{ width: "100%" }}
                                          >
                                            Register
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
