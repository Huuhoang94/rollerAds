import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Rates = ({onLogout}) => {
  useEffect(() => {
    document.title = "Rates . RollerAds";
  }, []);
  return <div className="ratespagecontaienr">
     <Header routename="Rates" onLogout={onLogout}/>
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
  </div>;
};

export default Rates;
