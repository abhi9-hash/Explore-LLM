import "./App.css";
import React from "react";
import Header from "./components/layout/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/screens/home/Home.js";
import ModelDetails from "./components/screens/model-details/ModelDetails.js";
import Models from "./components/screens/model-list/Models.js";
import ModelForm from "./components/screens/create-model/ModelForm";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/model/:id" element={<ModelDetails />} />
        <Route exact path="/models" element={<Models />} />
        <Route exact path="/model/create" element={<ModelForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
