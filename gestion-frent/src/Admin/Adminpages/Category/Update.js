


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
import { useParams } from "react-router-dom";
export default function UpdateCategroy() {
 let {id} = useParams()
//  const [data,setData] = useState([])
 const [nom, setNom] = useState([]);

   useEffect(() => {
      axios
      .get(`http://127.0.0.1:8000/api/category/show/${id}`)
      .then(({data}) => {
        const { nom_category } = data.category;
        //nom_category; name colum of back end
        setNom(nom_category);
        // console.log(data.category);
      }).catch(({response:{data}})=>{
        console.log(data.message)
      });
   }, []);

   //update category
 
    const Update = (e)=>{
        e.preventDefault();
        let formdata = {
         nom: nom,
      };
           axios
             .post("http://127.0.0.1:8000/api/category/update/" + id, formdata)
             .then((data) => {
             swal("success!", "modefier success", "success");
             window.location.pathname = "/category";


             }).catch(({response})=>{
                if(response.status === 422){
                    console.log(response.data.errors)
                }else{
                    console.log(response.data.message);

                }
             })
    }

   
   
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
                          placeholder="nom catègorie"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                        />
                      </div>
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
