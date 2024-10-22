import React from "react";
import "../styles/sidebar.css";
import MyLog from "../assets/ads.svg";
import HelpIcon from "../assets/help.svg";
import RatesIcon from "../assets/rates.svg";
import ImageIcon from "../assets/image.svg";
import TradeIcon from "../assets/trade.svg";
import StatsIcon from "../assets/stats.svg";
import MickIcon from "../assets/mick.svg";
import MoneyIcon from "../assets/money.svg";
import { NavLink } from "react-router-dom";
import {
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  GlobeAsiaAustraliaIcon,
  MegaphoneIcon,
  NewspaperIcon,
  PhotoIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const AdminSideBar = () => {
  return (
    <div className="sidebarcontainer">
      <div className="logocontainer">
        <img
          src="https://my.rollerads.com/img/ra_logo_dark.d49d937b.svg"
          className="mylogoweb"
          alt=""
        />
      </div>
      <div className="menuitemscontainer">

        <div className="rr">
          <NavLink
            to="/admin/users"
            className="menuitemsingle"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "#2b2c35" : "",
                color: isActive ? "#bac3ff" : "",
              };
            }}
          >
            Users
            {/* <p>Campaings</p> */}
          </NavLink>
        </div>
        <div className="rr">
          <NavLink
            className="menuitemsingle"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "#2b2c35" : "",
                color: isActive ? "#bac3ff" : "",
              };
            }}
            to="/admin/campaigns"
          >
            Campaigns
            {/* <p>Reports</p> */}
          </NavLink>
        </div>
        <div className="rr">
          <NavLink
            className="menuitemsingle"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "#2b2c35" : "",
                color: isActive ? "#bac3ff" : "",
              };
            }}
            to="/admin/transactions"
          >
            Transactions
            {/* <p>Reports</p> */}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
