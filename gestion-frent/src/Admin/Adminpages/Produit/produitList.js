import React, { useEffect } from "react";
import NavbarAdmin from "../../AdminComponent/Header/NavbarAdmin";
import Sidbar from "../../AdminComponent/Sidbar/Sidbar";
// import "./AdminHome.css";
import { useState } from "react";
// import "../../pages/loginUser/login/login.css";
// import { Link } from "react-router-dom";
import axios from "axios";
// import "../../../pages/loginUser/style copy.css";
import swal from "sweetalert";
export default function ProduitList() {
  // varivale value input
    const [Code, setCode] = useState("");
    const [Desionation, setDesionation] = useState("");
    const [Qauntity, setqauntity] = useState("");
    const [Qauntity_min, setqauntity_min] = useState("");
    const [categorys,setCategory] = useState("");
    const [marques,setMarques] = useState("");
    const [Fournisseur, setFournisseur] = useState(1);



    console.log(Code);
    console.log(Desionation);
    console.log(Qauntity);
    console.log(Qauntity_min);


  // end value input
  const [errorCode, seterrorCode] = useState(null);
  const [errorqauntity, seterrorqauntity] = useState(null);
  const [errorDesionation, seterrorDesionation] = useState(null);
  const [errorQauntity_min, seterrorQauntity_min] = useState(null);

  // varivale validation form
  const [MCode, setMCode] = useState("");
  const [MCDesionation, setMCDesionation] = useState("");
  const [Mqauntity, setMqauntity] = useState("");
  const [Mqauntity_min, setMqauntity_min] = useState("");

  // end varivale validation form
  // varivale validation form


  const [Accept, setError] = useState(false);

  async function SendData(e) {
    let flag = false;
    e.preventDefault();
    setError(true);
    try {
      if (Code === "" || Desionation === "" || Qauntity==="" ||  Qauntity_min === "") {
        flag = false;
        if (Code === "") {
          setMCode("plesee enter  Code");
          seterrorCode(false);
        } else {
          setMCode("");
          seterrorCode(true);
        }

          if (Desionation === "") {
            setMCDesionation("plesee enter  Desionation");
            seterrorDesionation(false);
          } else {
            setMCDesionation("");
            seterrorDesionation(true);
          }


          if (Qauntity === "") {
            setMqauntity("plesee enter Codee Qauntity");
            seterrorqauntity(false);
          } else {
            setMqauntity("");
            seterrorqauntity(true);
          }

             if (Qauntity_min === "") {
               setMqauntity_min("plesee enter  Qauntity_min");
               seterrorQauntity_min(false);
             } else {
               setMqauntity_min("");
               seterrorQauntity_min(true);
             }

      } else {
        flag = true;
       
      }
      if (flag) {
        let formData = {
          Code: Code,
          Desionation: Desionation,
          Qauntity: Qauntity,
          Qauntity_min: Qauntity_min,
          categorie_id: categorys,
          marque: marques,
          Fournisseur: Fournisseur,
        };

        let res = await axios.post(
          "http://127.0.0.1:8000/api/produit/store",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        //   console.log("formData"),

        //   console.log(formData)
        );
        // .then(t=>console.log(t));
        if (res.status === 200) {
          //   window.localStorage.setItem("email", email);
          swal("success!", "res.data.message", "success");
          FetchProduit();

        //   window.location.pathname = "/HomeAdmin";
        console.log(res.data.message);
        }
      }
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 442) {
        swal("failde!", "error ", "warning");
      }
    }
  }
  const [Produit, setProduit] = useState([]);

  useEffect(() => {
    FetchProduit();
  }, []);
  const FetchProduit = ()=>{
     axios.get("http://127.0.0.1:8000/api/produit/index").then((res) => {
      console.log(res.data.message);
      setProduit(res.data);
    });
  }
//   console.log(Produit);
  const [category, setcategory] = useState([]);
  // function list data
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    axios.get("http://127.0.0.1:8000/api/category/index").then((res) => {
      setcategory(res.data);
    });
  };
//list the marque produit
useEffect(() => {
  fetchmarque();
}, []);
const [marque, setmarque] = useState([]);
const fetchmarque = async () => {
  axios.get("http://127.0.0.1:8000/api/marque/index").then((res) => {
    setmarque(res.data);
  })
}
  //list the fournisseur
    const [fournisseur, setfournisseur] = useState([]);
    // function list data
    useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/fournisseur/index").then((res) => {
        setfournisseur(res.data);
        console.log(fournisseur);
      });
    }, []);

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
              <span class="text">List Article</span>
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
                              Ajouter un article
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
                            errorCode
                              ? "succes"
                              : errorCode == false
                              ? "warning"
                              : ""
                          }`}
                                >
                                  <input
                                    name="Code"
                                    type="number"
                                    class="form-control"
                                    onChange={(e) => {
                                      setCode(e.target.value);
                                    }}
                                    placeholder="Code article"
                                    value={Code}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && MCode !== "" && (
                                      <small style={{ color: "red" }}>
                                        {MCode}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                <div
                                  class={`col form-group mb-3 position-relative"
                          ${
                            errorDesionation
                              ? "succes"
                              : errorDesionation == false
                              ? "warning"
                              : ""
                          }`}
                                >
                                  <input
                                    name="Code"
                                    class="form-control"
                                    onChange={(e) => {
                                      setDesionation(e.target.value);
                                    }}
                                    placeholder=" Desionation"
                                    value={Desionation}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && MCDesionation !== "" && (
                                      <small style={{ color: "red" }}>
                                        {MCDesionation}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                <div
                                  class={`col form-group mb-3 position-relative"
                          ${
                            errorqauntity
                              ? "succes"
                              : errorqauntity == false
                              ? "warning"
                              : ""
                          }`}
                                >
                                  <input
                                    name="Qauntity"
                                    type="number"
                                    class="form-control"
                                    max="100000"
                                    min="1"
                                    onChange={(e) => {
                                      setqauntity(e.target.value);
                                    }}
                                    placeholder="Qauntity"
                                    value={Qauntity}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && Mqauntity !== "" && (
                                      <small style={{ color: "red" }}>
                                        {Mqauntity}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                <div
                                  class={`col form-group mb-3 position-relative"
                          ${
                            errorQauntity_min
                              ? "succes"
                              : errorQauntity_min == false
                              ? "warning"
                              : ""
                          }`}
                                >
                                  <input
                                    name="Code"
                                    type="number"
                                    class="form-control"
                                    max="100000"
                                    min="1"
                                    onChange={(e) => {
                                      setqauntity_min(e.target.value);
                                    }}
                                    placeholder="Qauntity min "
                                    value={Qauntity_min}
                                  />
                                  <div className="username_admine">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <i class="fa-solid fa-circle-check"></i>
                                    {Accept && Mqauntity_min !== "" && (
                                      <small style={{ color: "red" }}>
                                        {Mqauntity_min}{" "}
                                      </small>
                                    )}
                                  </div>
                                </div>
                                <select
                                  class="form-select mb-3"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    setCategory(e.target.value);
                                  }}
                                >
                                  <option value="1">choisir un category</option>

                                  {category.map((element) => (
                                    <>
                                      <option value={element.id}>
                                        {element.nom_category}
                                      </option>
                                    </>
                                  ))}
                                </select>
                                <select
                                  class="form-select mb-3"
                                  aria-label="Default select example"
                                  onChange={(e) => setMarques(e.target.value)}
                                >
                                  <option selected>Choisir marque</option>

                                  {marque.map((e) => (
                                    <>
                                      <option value={e.id}>
                                        {e.nom_marque}
                                      </option>
                                    </>
                                  ))}
                                </select>
                                {/* end login */}
                              </div>
                              <select
                                class="form-select mb-3"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setCategory(e.target.value);
                                }}
                              >
                                <option value="1">
                                  choisir un fournisseur
                                </option>

                                {fournisseur.map((element) => (
                                  <>
                                    <option value={element.id}>
                                      {element.nom}
                                    </option>
                                  </>
                                ))}
                              </select>
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
                    <th>code</th>
                    <th>designation</th>
                    <th>qauntity</th>
                    <th>marque</th>

                    {/* <th>qauntity min</th> */}
                    {/* <th>date</th> */}
                    <th>status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Produit.map((iteam) => (
                    <>
                      <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="ms-3">
                              <p class="fw-bold mb-1">{iteam.code_produit}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p class="fw-normal mb-1">{iteam.designation}</p>
                        </td>

                        <td>{iteam.qauntity}</td>

                        <td>{iteam.marque}</td>

                        <td>{iteam.status}</td>

                        <td>
                          <div className="d-flex">
                            <div className="col-6">
                              <button
                                type="button"
                                class="btn btn-info btn-sm btn-rounded"
                              >
                                Edit
                              </button>
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
