import React from 'react'
import { Link } from 'react-router-dom';
import "../demonde/demonde.css"
export default function SuivreDemonde() {
  return (
    <div className="demonde_section">
      <nav class="navbar ">
        <div class="container">
          <img
            src={require("../../pages/image/D611E5AB-F26F-4C96-A89D-AE2D36381D52_4_5005_c-removebg-preview.png")}
            style={{ width: "90px", height: "90px" }}
          />
          <div>
            <div className=" action_container me-3">
              <button class="text-white" style={{ backgroundColor: "#24b96f" }}>
                <Link to="/demonde">retour à la page home</Link>
              </button>
            </div>
            <div className=" action_container">
              <button class="text-white" style={{ backgroundColor: "#24b96f" }}>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div class="container px-3 my-5 clearfix">
        <div class="card">
          <div class="card-header bg-info text-white">
            <h2>Suivre les demande </h2>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered m-0">
                <thead>
                  <tr className="text-center">
                    <th
                      class="text-center py-3 px-4"
                      style={{ width: "100px" }}
                    >
                      Designation article &amp; code
                    </th>
                    <th class="text-right py-3 px-4" style={{ width: "100px" }}>
                      Numer ètab
                    </th>
                    <th
                      class="text-center py-3 px-4"
                      style={{ width: "120px" }}
                    >
                      Quantity
                    </th>
                    <th class="text-right py-3 px-4" style={{ width: "40px" }}>
                      status
                    </th>
                    <th
                      class="text-center align-middle py-3 px-0"
                      style={{ width: "40px" }}
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td class="p-4">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <h5>toner</h5>
                          <p class="text-muted">56434</p>
                        </div>
                      </div>
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      6
                    </td>
                    <td class="align-middle p-4">
                      <input
                        type="text"
                        class="form-control text-center"
                        value="2"
                      />
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      <button class="btn btn-danger">attende</button>
                    </td>
                    <td class="text-center align-middle px-0">
                      <Link className="text-danger">
                        <i class="fa-solid fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td class="p-4">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <h5>toner</h5>
                          <p class="text-muted">56434</p>
                        </div>
                      </div>
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      6
                    </td>
                    <td class="align-middle p-4">
                      <input
                        type="text"
                        class="form-control text-center"
                        value="2"
                      />
                    </td>
                    <td class="text-right font-weight-semibold align-middle p-4">
                      <button class="btn btn-danger">attende</button>
                    </td>
                    <td class="text-center align-middle px-0">
                      <Link className="text-danger">
                        <i class="fa-solid fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
