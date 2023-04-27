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
export default function Category() {
  // varivale value input
  const [Nom, setNom] = useState("");
  // end value input
  const [errorNom, seterrorNom] = useState(null);
  // varivale validation form
  const [MNom, setMNom] = useState("");
  const [exist, setExist] = useState("");
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
          setMNom("plesee enter nome category");
          seterrorNom(false);
        } else {
          setMNom("");
          seterrorNom(true);
        }
      } else {
        flag = true;
      }
      if (flag) {
        let formData = {
          Nom: Nom,
        };

        let res = await axios.post(
          "http://127.0.0.1:8000/api/category/store",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // .then(t=>console.log(t));
        if (res.status === 200) {
          //   window.localStorage.setItem("email", email);
          swal("success!", "add success", "success");
          fetchCategory()
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 442) {
        swal("failde!", "matricule déja exist ", "warning");
      }
    }
  }
  const [category, setcategory] = useState([]);
  // function list data
  useEffect(() => {
    fetchCategory()
  }, []);

  const fetchCategory = async()=>{
   axios.get("http://127.0.0.1:8000/api/category/index").then((res) => {
     setcategory(res.data);
   });
  }


  // end  category
  ///////////////////////function show data ////////////////////////////////////////
       const handlDelete = (id) => {
         axios
           .delete("http://127.0.0.1:8000/api/category/delete/" + id)
           .then((data) => {
             swal("success!", "delete success", "success");
             window.location.pathname = "/category";
           })
           .catch(({ response }) => {
             if (response.status === 422) {
               console.log(response.data.errors);
             } else {
               console.log(response.data.message);
             }
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
              <span class="text">les category</span>
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
                                    placeholder="Nom Category"
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
                  {category.map((iteam) => (
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
                              <p class="fw-bold mb-1">{iteam.nom_category}</p>
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
                              <Link
                                to={`/updatecategory/${iteam.id}`}
                                //{`updatecategory/${iteam.id}`}
                                class="btn btn-primary ms-3"
                              >
                                edit
                              </Link>
                            </div>
                            <div className="col-6">
                              <button
                                type="button"
                                class="btn btn-danger btn-sm btn-rounded"
                                onClick={() => handlDelete(iteam.id)}
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
