import App from "./App.jsx";
import "./index.css";
import Header from "./components/Header.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useState, useEffect } from "react";
import AdminUser from "./pages/AdminUser.jsx";
import AdminSideBar from "./components/AdminSideBar.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import AdminCampaigns from "./pages/AdminCampaigns.jsx";
import AdminTransactions from "./pages/AdminTransactions.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";

const InitializeApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Quản lý trạng thái đăng nhập
  const [role, setRole] = useState(""); // Quản lý vai trò của người dùng
  const navigate = useNavigate(); // Điều hướng dựa trên vai trò

  // Kiểm tra trạng thái đăng nhập khi khởi chạy ứng dụng
  
  useEffect(() => {
    const savedRole = localStorage.getItem("role"); // Lấy vai trò đã lưu từ localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn"); // Lấy trạng thái đăng nhập từ localStorage

    if (loggedInStatus === "true" && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);
  

  const handleLogin = (userRole) => {
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
    setRole(userRole); // Lưu vai trò của người dùng
    localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem("role", userRole); // Lưu vai trò vào localStorage

    if (userRole === "admin") {
      navigate("/admin/users"); // Điều hướng đến trang admin
    } else {
      navigate("/"); // Điều hướng đến trang người dùng
    }
  };

  const handleLogout = () => {
    //console.log("Logout is triggered!"); // Kiểm tra xem hàm có được gọi không
    setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập
    setRole(""); // Xóa vai trò
    localStorage.removeItem("userEmail"); // Nếu bạn lưu thông tin trong localStorage, xóa nó
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem("role"); // Xóa vai trò khỏi localStorage
    navigate("/"); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="main-container">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} /> // Truyền hàm đăng nhập xuống LoginPage
      ) : (
        <>
          {role === "admin" ? (
            <>
              <div className="sidebar">
                <AdminSideBar />
              </div>
              <div className="content">
                <Routes>
                  <Route path="/admin/users" element={<AdminUser onLogout={handleLogout}/>} />
                  <Route path="/admin/campaigns" element={<AdminCampaigns onLogout={handleLogout}/>} />
                  <Route path="/admin/transactions" element={<AdminTransactions onLogout={handleLogout}/>} />
                  <Route path="/admin/profile" element={<AdminProfile onLogout={handleLogout}/>} />
                </Routes>
              </div>
            </>
          ) : (
            <>
              <div className="sidebar">
                <SideBar />
              </div>
              <div className="content">
                
                <Routes>
                  <Route path="/" element={<App onLogout={handleLogout}/>} />
                  <Route path="/campaigns" element={<App onLogout={handleLogout}/>} />
                  <Route path="/reports" element={<Reprots onLogout={handleLogout}/>} />
                  <Route path="/tracking" element={<Tracking onLogout={handleLogout}/>} />
                  <Route path="/finance" element={<Finance onLogout={handleLogout}/>} />
                  <Route path="/creatives" element={<Creatives onLogout={handleLogout}/>} />
                  <Route path="/rates" element={<Rates onLogout={handleLogout}/>} />
                  <Route path="/helpcenter" element={<HelpCenter onLogout={handleLogout}/>} />
                  <Route path="/campaigns/new" element={<NewCampaign onLogout={handleLogout}/>} />
                  <Route path="/campaigns/:id" element={<EditCompaing onLogout={handleLogout}/>} />
                  <Route path="/profile" element={<UserProfile onLogout={handleLogout}/>} />
                </Routes>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
/*
const InitializeApp = () => {
  const [islogedIn, setIsLogedIn] = useState(true);
  return (
    <div className="main-container">
      {islogedIn ? (
        <LoginPage setIsLogedIn={setIsLogedIn} />
      ) : (
        <>
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/campaigns" element={<App />} />
              <Route path="/reports" element={<Reprots />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/creatives" element={<Creatives />} />
              <Route path="/rates" element={<Rates />} />
              <Route path="/helpcenter" element={<HelpCenter />} />
              <Route path="/campaigns/new" element={<NewCompaing />} />
              <Route path="/campaings/:id" element={<EditCompaing />} />
            </Routes>
          </div>
        </>
      )}
      {islogedIn ? (
        <LoginPage setIsAdminLogedIn={setIsLogedIn} />
      ) : (
        <>
          <div className="content">
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};
*/
export default InitializeApp;
