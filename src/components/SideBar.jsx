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

const SideBar = () => {
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
        <div className="">
          <NavLink
            className="newcompainhere"
            to="/campaigns/new"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "#2b2c35" : "",
                border: isActive ? "2px solid #bac3ff" : "",
              };
            }}
          >
            <PlusIcon className="plussss" />New Campaign
            {/* <p>New Campaing</p> */}
          </NavLink>
        </div>
        <br />

        <div className="rr">
          <NavLink
            to="/campaigns"
            className="menuitemsingle"
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                backgroundColor: isActive ? "#2b2c35" : "",
                color: isActive ? "#bac3ff" : "",
              };
            }}
          >
            <MegaphoneIcon className="plusss" />
            Campaign
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
            to="/reports"
          >
            <ArrowTrendingUpIcon className="plusss" />Reports
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
            to="/tracking"
          >
            <GlobeAsiaAustraliaIcon className="plusss" />Tracking
            {/* <p>Tracking</p> */}
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
            to="/finance"
          >
            <CurrencyDollarIcon className="plusss" />Finance
            {/* <p>Finance</p> */}
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
            to="/creatives"
          >
            <PhotoIcon className="plusss" />Creatives
            {/* <p>Creatives</p> */}
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
            to="/rates"
          >
            <NewspaperIcon className="plusss" />Rates
            {/* <p>Rates</p> */}
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
            to="/helpcenter"
          >
            <QuestionMarkCircleIcon className="plusss" />Help Center
            {/* <p>Help Center</p> */}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
