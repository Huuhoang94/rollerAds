import React, { useEffect,useState } from "react";
import "../styles/Header.css";
import WallatIcon from "../assets/wall.svg";
import MenuIcon from "../assets/menu.svg";
import { CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AdminHeader = ({ routename, onLogout }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái menu thả xuống
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    // Function to update current time every second
    document.title= "Campaings . RollerAds"
    
    const updateTime = () => {
      const date = new Date();
      const options = {
        timeZone: "UTC", // Set timezone to UTC
        day: "2-digit", // Display day with leading zero
        month: "short", // Display month as abbreviation
        hour: "2-digit", // Display hours
        minute: "2-digit", // Display minutes
        hour12: false, // Use 24-hour format
      };
      setCurrentTime(date.toLocaleTimeString("en-US", options));
    };

    // Update time initially and set interval to update it every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
    
  }, []);

  // Xử lý mở/đóng menu thả xuống
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Điều hướng đến trang Profile
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Xử lý đăng xuất và điều hướng về trang Login
  //const handleLogout = () => {
    // Xóa trạng thái đăng nhập (có thể cần xóa token nếu có)
    //localStorage.removeItem("userEmail");
    //setIsLogedIn(true)
    //navigate("/"); // Điều hướng về trang Login
  //};

  return (
    <div className="headerContainer">
      <div className="headerLeftcontaienr">
        <div className="iconContainerheader">
          <img src={MenuIcon} alt="" />
        </div>
        <div>
          <h2 className="titlehaeder">{routename}</h2>
        </div>
      </div>
      <div className="headerRightcontaienr">
        
        <div className="userecontainer" onClick={toggleDropdown}>
          <UserIcon className="creditcardionc" />
          {isDropdownOpen && (
            <div className="dropdownMenu">
              <button onClick={handleProfileClick}>
                <a class="menuitemsingle">Profile</a>
              </button>  
              <button onClick={onLogout}>
                <a class="menuitemsingle">Logout</a>
              </button> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
