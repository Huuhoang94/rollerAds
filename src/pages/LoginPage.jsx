import { useState } from "react";
import axios from "axios";
import wallSVG from "../assets/wall.svg";
import bank_logo from "../assets/bank_logo.svg";
import Tab from "../components/Tabs";
import { useNavigate } from "react-router-dom";

//email: 'phuong@gmail.com',
//password: 'PHUONG_123',

//email: admin@gmail.com
//password: admin

const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("Login");

  const [email_login, setEmail_login] = useState("");
  const [password_login, setPassword_login] = useState("");
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleInputFocus = (e) => {
    if (e.target.value === "Required") {
      e.target.value = "";
    }
  };
  
    // Xử lý đăng ký
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const newErrors1 = {};
    if (!firstName) newErrors1.firstName = "Please enter your first name.";
    if (!lastName) newErrors1.lastName = "Please enter your last name.";
    if (!country) newErrors1.country = "Please enter your country.";
    if (!city) newErrors1.city = "Please enter your city.";
    if (!address) newErrors1.address = "Please enter your address.";
    if (!email) newErrors1.email = "Please enter your email address.";
    if (!phone) newErrors1.phone = "Please enter your phone number.";
    if (!password) newErrors1.password = "Please enter your password.";
    setErrors(newErrors1);

    if (Object.keys(newErrors1).length === 0) {
      try {
        const response = await axios.post("https://roller-ads-app-247fc36661ce.herokuapp.com/signup", {
          email,
          password,
          firstName,
          lastName,
          country,
          city,
          address,
          phone,
        }, {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        alert(response.data.message);
        window.location.reload();
        //setActiveTab("Login");
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed.");
      }
    }
  };

  // Xử lý đăng nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email_login) newErrors.email_login = "Please enter your email address.";
    if (!password_login) newErrors.password_login = "Please enter your password.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("https://roller-ads-app-247fc36661ce.herokuapp.com/login", {
          email_login,
          password_login,
        }, {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        //alert(response.data.message);

        // Lưu email vào localStorage khi đăng nhập thành công
        localStorage.setItem("userEmail", email_login);

        const { role } = response.data; // Lấy vai trò từ phản hồi API
        onLogin(role); // Gọi hàm onLogin với vai trò user hoặc admin

        //alert(response.data.message);
        //setIsLogedIn(false);
      } catch (error) {
        alert(error.response?.data?.message || "Login failed.");
        //const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
        //setError(errorMessage); // Hiển thị lỗi lên giao diện
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img
          src="https://my.rollerads.com/img/ra_logo_dark.d49d937b.svg"
          className="mylogoweb"
          alt=""
        />
      </div>
      <div>
        <h1
          style={{
            marginBottom: "50px",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          Welcome to RollerAds
        </h1>
      </div>
      <div style={{ width: "100%", display: "flex", justifyItems: "center" }}>
        <div className="tabs-container" style={{ width: "100%" }}>
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabName="Login"
          />
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabName="Sign Up"
          />
        </div>
      </div>
      <div className="login-form-container">
        {activeTab === "Login" && (
          <section className="login-section">
            <div className="form-section">
              <h3 style={{ marginBottom: "25px" }}>Sign in to platform</h3>
              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="email"
                    value={email_login}
                    onChange={(e) => setEmail_login(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="E-Mail:"
                    className="custominput"
                    //style={{ borderColor: errors.email_login ? "red" : "" }}
                  />
                  <span className="requiredText">Required</span>                  
                </div>
                {errors.email_login && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.email_login}</p>}
              </div>{" "}
              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="password"
                    value={password_login}
                    onChange={(e) => setPassword_login(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Password:"
                    className="custominput"
                    //style={{ borderColor: errors.password_login ? "red" : "" }}
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.password_login && <p style={{ color: "red", fontSize: "12px" }}>{errors.password_login}</p>}
              </div>{" "}
            </div>
            <div
              className="buttons"
              onClick={handleLoginSubmit}
              //onClick={() => {
                //setIsLogedIn(false);
              //}}
            >
              <div className="button-container">
                {" "}
                <img src={wallSVG} alt="" /> <span>Login</span>
              </div>
            </div>
          </section>
        )}
        
        {activeTab === "Sign Up" && (
          <section className="signup-section">
            {/* Add Sign Up form here */}
            <div className="form-section">
              <h3 style={{ marginBottom: "25px" }}>Create your account</h3>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="First Name:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.firstName && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.firstName}</p>}
              </div>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Last Name:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.lastName && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.lastName}</p>}
              </div>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Country:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.country && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.country}</p>}
              </div>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="City:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.city && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.city}</p>}
              </div>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Address:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.address && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.address}</p>}
              </div>

              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="E-Mail:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.email && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.email}</p>}
              </div>
              
              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Phone:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.phone && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.phone}</p>}
              </div>
              
              {
                /*
              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Nickname:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
              </div>
              */
              }
              <div className="reportsdivItem">
                <div className="inputContainer">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Password:"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                {errors.password && <p style={{ color: "red", marginBottom: "25px", fontSize: "12px" }}>{errors.password}</p>}
              </div>
            </div>

            <div className="buttons" onClick={handleSignUpSubmit}>
              <div className="button-container">
                <img src={wallSVG} alt="" />
                <span>Sign Up</span>
              </div>
            </div>
          </section>
        )}
        
      </div>
    </div>
  );
};

export default LoginPage;
