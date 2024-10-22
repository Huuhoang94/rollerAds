import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserProfile = ({onLogout}) => {
  const [userData, setUserData] = useState({
    email:"",
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    address: "",
    phone: ""
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  useEffect(() => {
    document.title = "Profile . RollerAds";
    const userEmail = localStorage.getItem("userEmail"); // Lấy email từ localStorage

    if (!userEmail) {
      // Nếu không có email trong localStorage, điều hướng về trang đăng nhập
      window.location.href = "/";
      return;
    }

    // Gửi yêu cầu lấy thông tin người dùng
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://roller-ads-app-247fc36661ce.herokuapp.com/user-profile/${userEmail}`, {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        console.log(response.data);
        setUserData(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
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
      const response = await axios.post("https://roller-ads-app-247fc36661ce.herokuapp.com/change-password", {
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
  const handleSaveProfile = async () => {
    try {
      //userData.email = userEmail;
      const response = await axios.post("https://roller-ads-app-247fc36661ce.herokuapp.com/update-profile", userData, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="createtivepagehere">
      <Header routename="Profile" onLogout={onLogout}/>
      <br></br>
      <h3>User data</h3>
      <br></br>
      <div className="profileSection">
      <div className="input-container">
        <label>First Name</label>
          <input
            type="text"
            className="custominput"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Last Name</label>
          <input
            type="text"
            className="custominput"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-container">
          <label>Country</label>
          <input
            type="text"
            className="custominput"
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-container">
          <label>City</label>
          <input
            type="text"
            className="custominput"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-container">
          <label>Address</label>
          <input
            type="text"
            className="custominput"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Phone</label>
          <input
            type="text"
            className="custominput"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-container">
         <label>Email</label>
          <input
            type="email"
            name="email"
            className="custominput"
            value={userData.email}
            readOnly
            required
          />
        </div>
        <br></br>
        <button className="saveChangesButton" onClick={handleSaveProfile}>Save changes</button>
      </div>

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

export default UserProfile;
