import React, { useEffect,useState } from "react";
import "../styles/Header.css";
import WallatIcon from "../assets/wall.svg";
import MenuIcon from "../assets/menu.svg";
import { CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Header = ({ routename, onLogout }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái menu thả xuống
  const navigate = useNavigate(); // Hook điều hướng
  const [userBalance, setUserBalance] = useState("");

  useEffect(() => {
    document.title = "Profile . RollerAds";
    const userEmail = localStorage.getItem("userEmail"); // Lấy email từ localStorage

    if (!userEmail) {
      // Nếu không có email trong localStorage, điều hướng về trang đăng nhập
      window.location.href = "/";
      return;
    }

    // Gửi yêu cầu lấy thông tin người dùng
    const fetchUserBalance = async () => {
      try {
        const response = await axios.get(`https://roller-ads-app-247fc36661ce.herokuapp.com/user-balance/${userEmail}`, {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        setUserBalance(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserBalance();
  }, []);

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
  const handleFinanceClick = () => {
    navigate("/finance");
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
        <div className="timecontainer">{currentTime}  (UTC)</div>
        <div className="balanceContainer" onClick={handleFinanceClick} style={{ cursor: "pointer" }}>
          <img src={WallatIcon} alt="" />
          <span>Balance: ${userBalance.balance}</span>
        </div>
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

export default Header;
