

import React, { useEffect } from "react";
import NavbarAdmin from "../../Admin/AdminComponent/Header/NavbarAdmin";
 import Sidbar from "../../Admin/AdminComponent/Sidbar/Sidbar";
// import "./AdminHome.css";
// import "../../pages/loginUser/login/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import "../../pages/loginUser/register/Register.css";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useState } from "react";
export default function UpdateUser() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [nom, setNom] = useState([]);
  const [matricule, setMatricule] = useState([]);
  const [droit, setDroit] = useState([]);



  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/show/${id}`)
      .then(({ data }) => {
        const { login, matricule, status } = data.user;
        //nom_category; name colum of back end
        setNom(login);
        setMatricule(matricule);
        setDroit(status);
        console.log(data.user);
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  }, []);

  //update category

  const Update = (e) => {
    e.preventDefault();
    let formdata = {
      nom: nom,
      matricule: matricule,
      droit: droit,
    };
    axios
      .post("http://127.0.0.1:8000/api/user/update/" + id, formdata)
      .then((data) => {
        swal("success!", "modefier success", "success");
        window.location.pathname = "/HomeAdmin";
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
            <div class="col-md-12  ">
              <div class="card register">
                <header class=" text-center p-3 f-bold text-info">
                  <h2>CONNEXION</h2>
                </header>
                <article class="card-body">
                  <form onSubmit={Update}>
                    <div class="form-row ">
                      <div className="col form-group mb-3 ">
                        <input
                          type="text"
                          class="form-control "
                          placeholder="login"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                        />
                      </div>

                      <div className="col form-group mb-3 ">
                        <input
                          type="number"
                          class="form-control "
                          placeholder="matricule"
                          value={matricule}
                          onChange={(e) => setMatricule(e.target.value)}
                        />
                      </div>

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
                        <option value="chaf de magasigne">chaf de magasigne</option>
                      </select>
                    </div>

                    <div class="form-group mt-3">
                      <button
                        type="submit"
                        class="btn btn-info text-white"
                        style={{ width: "100%" }}
                        // onClick={sign_up}
                      >
                        Modifier
                      </button>
                    </div>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
