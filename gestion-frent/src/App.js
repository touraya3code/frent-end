import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Register from "./pages/loginUser/register/Register";
import Login from "./pages/loginUser/login/Login";
import AdminHome from "./Admin/Adminpages/AdminHome";
import Creecompte from "./pages/loginUser/register/regist";
// import Creecompte from "./pages/loginUser/register/regist";
// import ForgetPassword from "./pages/loginUser/ForgetPassword/ForgetPassword";
import Demonde from "./pages/demonde/demonde";
import Category from "./Admin/Adminpages/Category/Category";
import Listdemonde from "./Admin/Adminpages/demonde/ListdemondeA";
import ProduitList from "./Admin/Adminpages/Produit/produitList";
import Fournisseur from "./Admin/Adminpages/Fournisseur/Fournisseur";
import UpdateCategroy from "./Admin/Adminpages/Category/Update";
import ListServices from "./Admin/Adminpages/Services/ListServices";
import ListDevision from "./Admin/Adminpages/Devesion/ListDevesion";
import ListMarque from "./Admin/Adminpages/Marque/ListMarque";
import UpdateServece from "./Admin/Adminpages/Services/EditService";
import UpdateUser from "./pages/loginUser/UpdateUser";
import SuivreDemonde from "./pages/SuivreDemonde/SuivreDemonde";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" exact element={<Home />} />
        <Route path="/listdemonde" exact element={<Listdemonde />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/Creecompte" element={<Creecompte />} />
        <Route path="/demonde" element={<Demonde />} />
        {/* route part admine */}
        <Route path="/HomeAdmin" element={<AdminHome />} />
        {/* category */}
        <Route path="/category" element={<Category />} />
        <Route path="/updatecategory/:id" element={<UpdateCategroy />} />
        {/* category */}
        <Route path="/marque" element={<ListMarque />} />
        {/* <Route path="/updatecategory/:id" element={<UpdateCategroy />} /> */}
        {/* produit */}
        <Route path="/produitlist" element={<ProduitList />} />
        {/* Fournisseur */}
        <Route path="/Fournisseur" element={<Fournisseur />} />
        {/* route part serveces */}
        <Route path="/listServices" element={<ListServices />} />
        {/* route part devision */}
        <Route path="/listDevision" element={<ListDevision />} />
        <Route path="/updateServices/:id" element={<UpdateServece />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/suivreDemonde" element={<SuivreDemonde />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
