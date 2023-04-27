import React from "react";
import "./demonde.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useEffect } from "react";

export default function Demonde() {

  const navigate = useNavigate();

  let [code, setcode] = useState("sélectionner le code produit");
  let [desSelect, setDesSelect] = useState(
    "sélectionner  désignation de  produit"
  );
  console.log(code);

  //send code select to back end
  const [id, setId] = useState();
  const handleCode = (index) => {
    setcode(index);
    //  e.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/api/demonde/verifier${index}`)
      .then((res) => {
        //  setInfo();
        //  console.log(res.data.message.status);
        setDesSelect(res.data.message.designation);
      });
  };

  let [dropselect, setdropselect] = useState(false);
  const handlecontent = (code) => {
    console.log("code");
    console.log(code);

    if (!dropselect) {
      setdropselect(true);
      console.log(code);
    } else {
      setdropselect(false);
    }
  };
  console.log(dropselect);

  // let updateCode = (code) => {
  //   setcode(code);
  // };

  const [input_list, setinputList] = useState([
    { designation: "", code: "", qauntity: "", numeroÈtab: "" },
  ]);

  const addNewRow = () => {
    setinputList([
      ...input_list,
      { designation: "", code: "", qty: "", NumeroEta: "" },
    ]);
  };
  const handleinputchange = (e, i) => {
    const { name, value } = e.target;
    const list = [...input_list];
    list[i][name] = value;
    setinputList(list);
  };
  console.log(input_list);

  const handleremove = (index) => {
    const list = [...input_list];
    list.splice(index, 1);
    setinputList(list);
  };
  const Handledemonde = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/demonde/store", { input_list })
      .then((res) => {
        setinputList([{ designation: "", code: "", qty: "", NumeroEta: "" }]);
        // console.log(res.data.message);
        if (res.status === 200) {
          swal(
            "succès",
            " Votre demande a été soumise avec succès. Veuillez attendre que votre demande soit traitée",
            "success"
          );
          navigate("/demonde");
        }
      });
  };
  // all produit

  const [article, setarticle] = useState([]);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/produit/index").then((res) => {
      console.log(res.data.message);
      setarticle(res.data);
    });
  }, []);

    const Lougout = () => {
      window.localStorage.removeItem("status");
      window.localStorage.removeItem("matricule");
      window.location.pathname = "/";
    };
  return (
    <div className="demonde_section">
      <main>
        <nav class="navbar ">
          <div class="container">
            <img
              src={require("../../pages/image/D611E5AB-F26F-4C96-A89D-AE2D36381D52_4_5005_c-removebg-preview.png")}
              style={{ width: "90px", height: "90px" }}
            />
            <div>
              <div className=" action_container me-3">
                <button
                  class="text-white"
                  style={{ backgroundColor: "#24b96f"}}

                >
                  
                  <Link to="/suivreDemonde">Suivre les demande</Link>
                </button>
              </div>
              <div className=" action_container">
                <button
                  class="text-white"
                  style={{ backgroundColor: "#24b96f" }}
                  onClick={() => Lougout()}
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </div>
        </nav>
        <h2 className="text-center text-info fs-2  p-3 m-0">
          {" "}
          Créer une démonde
        </h2>

        <section class="section-contact">
          <div class="container_demonde container">
            <div id="container_demonde" class="container-fluid">
              <table class="_table ">
                <thead>
                  <tr>
                    <th>Code Article</th>
                    <th>Designation</th>
                    <th>Numero ètab</th>
                    <th>Quantity</th>
                    <th width="45px">
                      <div class="action_container">
                        {
                          <button class="succes " onClick={addNewRow}>
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        }
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {input_list.map((x, i) => (
                    <tr key={i}>
                      <td>
                        <div class="wrapper">
                          <div
                            class="select-btn"
                            onClick={() => handlecontent(x.id)}
                          >
                            <span>{code}</span>

                            <i
                              class={`fa-solid fa-angle-down  
                            ${dropselect ? "btnRotate" : ""}
                            
                            `}
                            ></i>
                          </div>

                          <div
                            class={`content ${
                              dropselect ? "active" : "desctive"
                            }`}
                          >
                            <div class="search">
                              <i class="fa-solid fa-magnifying-glass "></i>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Search"
                                onChange={(e) => setQuery(e.target.value)}
                              />
                            </div>
                            <div class="options select-box">
                              <select
                                onChange={(e) => handleinputchange(e, i)}
                                class="form-select border border-0"
                                name="code"
                                multiple
                                aria-label="multiple select example"
                              >
                                {article
                                  .filter((articl) =>
                                    articl.code_produit
                                      .toString()
                                      .toLowerCase()
                                      .includes(query)
                                  )
                                  .map((produit, i) => (
                                    <option
                                      value={code}
                                      className="mb-3 p-3"
                                      onClick={() =>
                                        handleCode(produit.code_produit)
                                      }
                                      // (e) =>
                                      //   setcode(produit.code_produit)
                                      // }
                                    >
                                      {produit.code_produit}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="wrapper">
                          <div class="select-btn" onClick={handlecontent}>
                            <span>{desSelect}</span>

                            <i
                              class={`fa-solid fa-angle-down  
                            ${dropselect ? "btnRotate" : ""}
                            
                            `}
                            ></i>
                          </div>

                          <div
                            class={`content ${
                              dropselect ? "active" : "desctive"
                            }`}
                          >
                            <div class="search">
                              <i class="fa-solid fa-magnifying-glass "></i>
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Search"
                                onChange={(e) => setQuery(e.target.value)}
                              />
                            </div>

                            <div class="options select-box">
                              <select
                                onChange={(e) => handleinputchange(e, i)}
                                class="form-select border border-0"
                                name="designation"
                                multiple
                                aria-label="multiple select example"
                              >
                                {article
                                  .filter((articl) =>
                                    articl.designation
                                      .toLowerCase()
                                      .includes(query)
                                  )
                                  .map((produit, i) => (
                                    <option
                                      value={produit.designation}
                                      className="mb-3 p-3 fs-5"
                                      onClick={(e) =>
                                        setDesSelect(produit.designation)
                                      }
                                    >
                                      {produit.designation}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          class="form_control"
                          name="numeroÈtab"
                          onChange={(e) => handleinputchange(e, i)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          name="qauntity"
                          class="form_control"
                          onChange={(e) => handleinputchange(e, i)}
                        />
                      </td>
                      <td>
                        <div class="action_container">
                          {input_list.length !== i && (
                            <button
                              class="delete"
                              onClick={() => handleremove(i)}
                            >
                              <i class="fa-solid fa-close"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end action_container">
                <button
                  className=" mt-3 float-right text-white"
                  style={{ backgroundColor: "#24b96f" }}
                  onClick={Handledemonde}
                >
                  Demande
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
