// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Storefronts from "./pages/Storefronts";
import Auctions from "./pages/Auctions";
import Admin from "./pages/Admin";

ReactDOM.render(
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storefronts" element={<Storefronts />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  </Router>,
  document.getElementById("root")
);