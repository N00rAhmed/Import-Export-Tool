import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./App";
import Mongo from "./Mongo";
import MongoSQL from "./MongoSQL";

function Routers() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mongo" element={<Mongo />} />
        <Route path="/mongosql" element={<MongoSQL />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
