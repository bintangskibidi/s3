// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Menu from "./pages/barang"; 
import Detail from "./pages/detail"; 
import Edit from "./pages/edit"; 
import Tambah from "./pages/tambah"; 
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/tambah" element={<Tambah />} />
    </Routes>
  );
};

export default App;