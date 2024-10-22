import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Tracking = ({onLogout}) => {
  useEffect(() => {
    document.title = "Tracking . RollerAds";
  }, []);
  return (
    <div className="trackingContainer">
      <Header routename="Tracking" onLogout={onLogout}/>
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
    </div>
  );
};

export default Tracking;
