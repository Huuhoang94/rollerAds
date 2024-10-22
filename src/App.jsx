import React, { useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import CompainContainer from "./components/compainsContainer";
import { Link } from "react-router-dom";
const App = ({ onLogout }) => {
  useEffect(() => {
    document.title = "Rates . RollerAds";
  }, []);
  return (
    <div className="maincontainer">
      <div className="contentconatiner">
        <Header routename="Campaigns" onLogout={onLogout}/>
        <div className="sommingConatiner">
          <p className="tagline">
            🔥Smoking hot! Check out a new profitable offer from CpaRoll —{" "}
            <span>
              <Link to="https://platform.cparoll.com/offers/890">
                AVG Mobile Security WW
              </Link>{" "}
            </span>
            {"  "}
            for Android and iOS. Performs strong on our traffic.
          </p>
          <p style={{ cursor: "pointer" }}>Dismiss</p>
        </div>
        <CompainContainer />
       
      </div>
    </div>
  );
};

export default App;
