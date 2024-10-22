import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminProfile = ({onLogout}) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  useEffect(() => {
    document.title = "Profile . RollerAds";
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };
  const handleSavePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    // Kiểm tra các điều kiện
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const userEmail = localStorage.getItem("userEmail");

      // Gửi yêu cầu đến backend để cập nhật mật khẩu
      const response = await axios.post("https://roller-ads-3c2a4cbff3d9.herokuapp.com/change-password", {
        email: userEmail,
        oldPassword,
        newPassword,
      }, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });

      alert(response.data.message); // Hiển thị thông báo thành công
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };
  
  return (
    <div className="createtivepagehere">
      <AdminHeader routename="Admin / Profile" onLogout={onLogout} />
      <br></br>
      <h3>Password</h3>
      <br></br>
      <div className="passwordSection">
        <div className="input-container">
          <label>Old Password *</label>
          <input
            type="password"
            className="custominput"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            placeholder=""
          />
          
        </div>
        <div className="input-container">
          <label>New Password *</label>
          <input
            type="password"
            className="custominput"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            placeholder=""
          />
          
        </div>
        <div className="input-container">
          <label>Confirm Password *</label>
          <input
            type="password"
            className="custominput"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            placeholder=""
          />
          
        </div>
        
        <br></br>
        <button className="saveChangesPassButton" onClick={handleSavePassword}>Save changes</button>
        
      </div>
    </div>
  );
};

export default AdminProfile;
