import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reprots from "./pages/Reprots.jsx";
import Tracking from "./pages/Tracking.jsx";
import Finance from "./pages/Finance.jsx";
import Creatives from "./pages/Creatives.jsx";
import Rates from "./pages/Rates.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import NewCampaign from "./pages/NewCampaign.jsx";
import SideBar from "./components/SideBar.jsx";
import EditCompaing from "./pages/EditCompaing.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import InitializeApp from "./InitializeApp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InitializeApp />
    </BrowserRouter>
  </React.StrictMode>
);
