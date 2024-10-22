import React from "react";
import SideBar from "../components/SideBar";

const CompaingsPage = () => {
  useEffect(() => {
    const savedRole = localStorage.getItem("role"); // Lấy vai trò đã lưu từ localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn"); // Lấy trạng thái đăng nhập từ localStorage

    if (loggedInStatus === "true" && savedRole) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);
  return (
    <div className="maincontainer">
      <div className="sidebar">
        <SideBar />
      </div>
      <div>Main container </div>
    </div>
  );
};

export default CompaingsPage;
