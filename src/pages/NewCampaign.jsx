import React, { useEffect, useState } from "react";
import "../styles/Newcompain.css";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import PushIcon from "../assets/pushdark.svg";
import OnclickIcon from "../assets/onclick.svg";
import InpageIcon from "../assets/inpage.svg";
import CalenderIcon from "../assets/calender.svg";
import Radiocheck from "../assets/radiocheck.svg";
import RadionUncheck from "../assets/radiouncheck.svg";
import CPCDarkOne from "../assets/cpcdarkone.svg";
import CPCDarkTwo from "../assets/cpcdarktwo.svg";
import IPPDark from "../assets/ippdark.svg";
import Tooltip from "../assets/tooltip.svg";
import ArrowDownIcon from "../assets/arrowdown.svg";
import SmielFaceSVG from "../assets/smile.svg";
import axios from "axios";
import AddIcon from "../assets/plus.svg";
import {
  FaceSmileIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
const NewCampaign = ({onLogout}) => {
  const navigate = useNavigate();
  const [format, setFormat] = useState("Push");
  const [bidModel, setBidModel] = useState("SmartCPC");
  // Hàm xử lý khi người dùng thay đổi lựa chọn cho format
  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };
  // Hàm xử lý khi người dùng thay đổi lựa chọn cho bid model
  const handleBidModelChange = (event) => {
    setBidModel(event.target.value);
  };

  const [Presets, setPresets] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowOptions = () => {
    //setShowDropdown(!showDropdown);
    setShowOptions(!showOptions);
  };
  const handlePresetsSelect = (value) => {
    setPresets(value); // Fill the input with the selected value
    setShowOptions(false); // Hide options after selection
  };

  const [targetURL, setTargetURL] = useState("");
  const [CampaignName, setCampaignName] = useState("");
  const handleInputFocus = (e) => {
    if (e.target.value === "Required") {
      e.target.value = "";
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconURL, setIconURL] = useState(null); // State lưu url ảnh icon
  const [icon, setIcon] = useState(null);
  const [imageURL, setImageURL] = useState(null); // State lưu url ảnh image
  const [image, setImage] = useState(null);

  // Hàm xử lý chọn ảnh icon
  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconURL(URL.createObjectURL(file)); // Lưu URL ảnh để hiển thị xem trước
      setIcon(file); // lưu file icon
    }
  };

  // Hàm xử lý chọn ảnh image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file)); // Lưu URL ảnh để hiển thị xem trước
      setImage(file); // Lưu file image
    }
  };

  // Xử lý chọn country
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountriesOption, setshowCountriesOption] = useState(false);
  const [countries, setCountries] = useState([
    "Cambodia",
    "Indonesia",
    "Laos",
    "Malaysia",
    "Myanmar",
    "Philippines",
    "Singapore",
    "Thailand",
    "Vietnam",
    "Brunei",
    "Timor-Leste",
  ]);
  const handleCountryOptions = () => {
    setshowCountriesOption((prev) => !prev);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setshowCountriesOption(false);
  };

  const [dailyBudget, setDailyBudget] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [isBudgetExpanded, setBudgetIsExpanded] = useState(false); // Trạng thái điều khiển ẩn/hiện
  const handleToggleBudget = () => {
    setBudgetIsExpanded(!isBudgetExpanded); // Đổi trạng thái khi nhấn nút
  };

  const myplatforms = ["Windows", "MacOS", "Android", "iOS", "Chrome", "OS"];
  const MycustomDevices = ["Mobile", "Tablet", "Desktop"];

  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]); // Lưu các thiết bị được chọn
  const [showDeviceOption, setShowDeviceOption] = useState(false);
  
  const DeviceDropdown = () => {
    setIsDeviceOpen(!isDeviceOpen);
  };
  const handleDeviceSelect = () => {
    setShowDeviceOption(!showDeviceOption);
  };
  const [deviceInputValue, setDeviceInputValue] = useState("");
  // Xử lý chọn hoặc bỏ chọn thiết bị
  const handleDeviceClick = (device) => {
    if (selectedDevices.includes(device)) {
      setSelectedDevices(selectedDevices.filter((d) => d !== device));
      setDeviceInputValue((prevValue) => prevValue.replace(device, ""));
      if(selectedDevices.length === 0) {
        setDeviceInputValue("");
      }
    } else {
      setSelectedDevices([...selectedDevices, device]);
      setDeviceInputValue((prevValue) => prevValue + " " + device);
    }
    
  };
  // Xóa thiết bị khỏi danh sách đã chọn
  const removeDevice = (device) => {
    
    setSelectedDevices(selectedDevices.filter((d) => d !== device));
    setDeviceInputValue((prevValue) => prevValue.replace(device, ""));
    if(selectedDevices.length === 0) {
      setDeviceInputValue("");
    }
  };

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Lưu các thiết bị được chọn
  const [showPlatformOption, setShowPlatformOption] = useState(false);
  
  const PlatformDropdown = () => {
    setIsPlatformOpen(!isPlatformOpen);
  };
  const handlePlatformSelect = () => {
    setShowPlatformOption(!showPlatformOption);
  };
  const [platformInputValue, setPlatformInputValue] = useState("");
  // Xử lý chọn hoặc bỏ chọn thiết bị
  const handlePlatformClick = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((d) => d !== platform));
      setPlatformInputValue((prevValue) => prevValue.replace(platform, ""));
      if(selectedPlatforms.length === 0) {
        setPlatformInputValue("");
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
      setPlatformInputValue((prevValue) => prevValue + " " + platform);
    }
    
  };
  // Xóa thiết bị khỏi danh sách đã chọn
  const removePlatform = (platform) => {
    
    setSelectedPlatforms(selectedPlatforms.filter((d) => d !== platform));
    setPlatformInputValue((prevValue) => prevValue.replace(platform, ""));
    if(selectedPlatforms.length === 0) {
      setPlatformInputValue("");
    }
  };
  /*
  const [showInputDevice, setShowInputDevice] = useState(true);
  const handleShowInputDevice = () => {
    if(selectedDevices.length > 0)
    {
      setShowInputDevice(false)
    }
    else{
      setShowInputDevice(true)
    }
  }
    */
 
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    const formData = new FormData();
    formData.append("format", format);
    formData.append("bidModel", bidModel);
    formData.append("Presets", Presets);
    formData.append("CampaignName", CampaignName);
    formData.append("targetURL", targetURL);
    formData.append("icon", icon);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("selectedCountry", selectedCountry);
    formData.append("dailyBudget", dailyBudget);
    formData.append("totalBudget", totalBudget);
    formData.append("selectedDevices", selectedDevices);
    formData.append("selectedPlatforms", selectedPlatforms);
    formData.append("email", email);
    try {
      const response = await axios.post('https://roller-ads-3c2a4cbff3d9.herokuapp.com/new-campaign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      alert(response.data.message);
      navigate('/campaigns');
      //setActiveTab("Login");
    } catch (error) {
      alert(error.response?.data?.message || "Save campaign failed.");
    }
  }
  return (
    <div className="maincontainer">
      <div className="contentconatiner">
        <Header routename="Campaigns / New campaing" onLogout={onLogout}/>
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
        <div className="boxescompainsoverallsectoin">
          <div className="sectionleftonebeyong">
            <section className="sectionone">
              <div className="sectononetop">
                <h3>Format</h3>
                <div className="boxesgridonesection">
                <label>
                  <input
                    type="radio"
                    value="Push"
                    checked={format === "Push"}
                    onChange={handleFormatChange}
                    style={{ marginRight: "5px" }}
                  />
                  Push
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    value="OnClick"
                    checked={format === "OnClick"}
                    onChange={handleFormatChange}
                    style={{ marginRight: "5px" }}
                  />
                  OnClick
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    value="In-Page"
                    checked={format === "In-Page"}
                    onChange={handleFormatChange}
                    style={{ marginRight: "5px" }}
                  />
                  In-Page
                </label>                 
                </div>
              </div>
              <div className="sectononebottom"></div>
            </section>
            <section className="sectionone">
              <div className="sectononetop">
                <h3>Bid model</h3>
                <div className="boxesgridonesection">
                  <label>
                    <input
                      type="radio"
                      value="SmartCPC"
                      checked={bidModel === "SmartCPC"}
                      onChange={handleBidModelChange}
                      style={{ marginRight: "5px" }}
                    />
                    SmartCPC
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="CPC"
                      checked={bidModel === "CPC"}
                      onChange={handleBidModelChange}
                      style={{ marginRight: "5px" }}
                    />
                    CPC
                  </label>
                </div>
              </div>
            </section>
            <section 
              className="sectionone dropdownselectotoinslist" 
              //onClick={handleToggleDropdown}
            >
              <div className="preseheadercontainer">
                <div>
                  <h3>Traffic Presets</h3>
                  <img src={Tooltip} alt="" />
                </div>
                <div style={{ cursor: "pointer" }}>
                  <img
                    src={ArrowDownIcon}
                    onClick={(e) => e.stopPropagation()}
                    alt=""
                  />
                </div>
              </div>
              <input
                type="text"
                value={Presets}
                onChange={(e) => setPresets(e.target.value)}
                placeholder="Trafic Presets"
                className="searchInput"
                onClick={handleShowOptions}
                //onClick={() => setShowOptions(true)} // Show options when input is clicked
              />
              {showOptions && (
                <div className="optionsContainer">
                  <div onClick={() => handlePresetsSelect("No Presets")}>
                    No Presets
                  </div>
                  <div
                    onClick={() =>
                      handlePresetsSelect("AR | Desktop | Software")
                    }
                  >
                    AR | Desktop | Software
                  </div>
                  <div onClick={() => handlePresetsSelect("AT | Mobile Gaming")}>
                    AT | Mobile Gaming
                  </div>
                  <div
                    onClick={() => handlePresetsSelect("AU | Mobile | Finance")}
                  >
                    AU | Mobile | Finance
                  </div>
                  <div
                    onClick={() =>
                      handlePresetsSelect("AU Mobile Utilities Aggressions")
                    }
                  >
                    AU Mobile Utilities Aggressions
                  </div>
                  {/* Add more options as needed */}
                </div>
              )}
            </section>

            <section className="sectionone prrr">
              <div className="sectononetop">
                <h3 style={{ marginBottom: "15px" }}>General</h3>
                <div className="inputContainer">
                  <input
                    type="text"
                    value={CampaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Campaign Name"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
                <div className="inputContainer">
                  <input
                    type="text"
                    value={targetURL}
                    onChange={(e) => setTargetURL(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Target URL"
                    className="custominput"
                  />
                  <span className="requiredText">Required</span>
                </div>
              </div>
            </section>
            {/* Craeteives section start form there   */}
            <section className="sectionone creativesecton">
              <h3>Creatives</h3>
              <div className="imagescontainermain">
                <div>
                  <label htmlFor="iconUpload" className="image-label">
                  {icon ? (
                    <img src={iconURL} alt="Icon" className="uploaded-image" style={{ maxWidth: "70px"}}/>
                  ) : (
                    <>
                      <p style={{ fontSize:"14px"}}>Icon</p>
                      <p className="specilstyle">192 x 192 px jpg.png,webp 2Mb max</p>
                    </>
                  )}
                </label>
                <input
                  id="iconUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleIconUpload}
                />
                </div>
                <div className="secondcontainerimgads">
                  <label htmlFor="imageUpload" className="image-label" >
                    {image ? (
                      <img src={imageURL} alt="Image" className="uploaded-image" style={{ maxHeight: "90px"}}/>
                    ) : (
                      <>
                        <p>Image</p>
                        <p className="specilstyle">360 x 240 px jpg.png,webp 2Mb max</p>
                      </>
                    )}
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="emojitextcontinaer">
                <div className="inputemoijinut">
                  <input
                    className="custominput"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="emojitextcontinaer">
                <div className="inputemoijinut">
                  <input
                    className="custominput"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Description"
                  />
                </div>
              </div>
            </section>
            <section className="sectionone countriescontainer">
              <h3>Countries</h3>
              <div className="inputContainer">
                <input
                  type="text"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  placeholder="Select country"
                  className="custominput"
                  readOnly
                  onClick={handleCountryOptions}
                />
                <span className="requiredText">Required</span>
              </div>
              {showCountriesOption && ( // Fixed variable name
                <div className="optionsContainer ddsfd">
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div data-v-5b0b46f3="" class="index-bar-item">
                <div class="card-group">
                  <div class="card card--collapsed">
                    <div class="card__head-icon">
                      <h2 class="card__heading text-headline-3">Budget </h2>
                      <button class="table-button table-button--open table-button--heading-icon"
                        onClick={handleToggleBudget}
                      >
                        {isBudgetExpanded ? (
                          <ChevronUpIcon className="arrowup" /> // Mũi tên hướng lên khi mở
                        ) : (
                          <ChevronDownIcon className="arrowdown" /> // Mũi tên hướng xuống khi đóng
                        )}
                      </button>
                    </div>
                    {/* Khi isExpanded là true, hiển thị các ô input */}
                    {isBudgetExpanded && (
                      <div className="inputContainer" style={{width: "100%", marginTop: "10px"}}>
                        <div className="inputContainer" style={{width: "100%"}}>
                          <input
                            type="text"
                            value={dailyBudget}
                            onChange={(e) => setDailyBudget(e.target.value)}
                            placeholder="Daily"
                            className="custominput"
                            style={{marginRight: "20px"}}
                          />
                          <input
                            type="text"
                            value={totalBudget}
                            onChange={(e) => setTotalBudget(e.target.value)}
                            placeholder="Total"
                            className="custominput"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="index-bar-item">
                <div className="card-group" ad-format="1">
                  <div className="card card--collapsed">
                    <div className="card__head-icon" onClick={DeviceDropdown}>
                      <h2 className="card__heading text-headline-3">Device</h2>
                      <button className="table-button table-button--open table-button--heading-icon">
                        {isDeviceOpen ? (
                          <ChevronUpIcon className="arrowup" />
                        ) : (
                          <ChevronDownIcon className="arrowdown" />
                        )}
                      </button>
                    </div>
                    {isDeviceOpen && (
                      <div className="conatinercumatede">
                        <div className="inputContainer" style={{width: "100%", flexWrap: "wrap"}}>
                          
                          <input
                            type="text"
                            placeholder="Select Device"
                            value={deviceInputValue}
                            className="custominput"
                            readOnly
                            onChange={(e) => setDeviceInputValue(e.target.value)}
                            //style={{zIndex: "1"}}
                            onClick={handleDeviceSelect}
                          />
                            <span className="requiredText">Required</span>
                          
                          {/* Hiển thị các thiết bị đã chọn */}
                          <div className="selectedDevices" >
                            {selectedDevices.map((device, index) => (
                              <div key={index} className="selectedDeviceItem">
                                {device}
                                <button onClick={() => removeDevice(device)} className="removeDeviceBtn" style={{marginLeft: "5px"}}>x</button>
                              </div>
                            ))}
                          </div>

                          {showDeviceOption && (
                            <div className="optionsContainer">
                              {MycustomDevices.map((device, index) => (
                                <div
                                  key={index}
                                  className={`deviceOption ${selectedDevices.includes(device) ? "selected" : ""}`}
                                  onClick={() => handleDeviceClick(device)}
                                >
                                  {device}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                      </div>
                    )}
                  </div>
                  <div className="card card--collapsed">
                    <div className="card__head-icon" onClick={PlatformDropdown}>
                      <h2 className="card__heading text-headline-3">Operating systems</h2>
                      <button className="table-button table-button--open table-button--heading-icon">
                        {isPlatformOpen ? (
                          <ChevronUpIcon className="arrowup" />
                        ) : (
                          <ChevronDownIcon className="arrowdown" />
                        )}
                      </button>
                    </div>
                    {isPlatformOpen && (
                      <div className="conatinercumatede">
                        <div className="inputContainer" style={{width: "100%", flexWrap: "wrap"}}>
                          
                          <input
                            type="text"
                            placeholder="Select Platform"
                            value={platformInputValue}
                            className="custominput"
                            readOnly
                            onChange={(e) => setPlatformInputValue(e.target.value)}
                            //style={{zIndex: "1"}}
                            onClick={handlePlatformSelect}
                          />
                            <span className="requiredText">Required</span>
                          
                          {/* Hiển thị các thiết bị đã chọn */}
                          <div className="selectedDevices" >
                            {selectedPlatforms.map((platform, index) => (
                              <div key={index} className="selectedDeviceItem">
                                {platform}
                                <button onClick={() => removePlatform(platform)} className="removeDeviceBtn" style={{marginLeft: "5px"}}>x</button>
                              </div>
                            ))}
                          </div>

                          {showPlatformOption && (
                            <div className="optionsContainer">
                              {myplatforms.map((platform, index) => (
                                <div
                                  key={index}
                                  className={`deviceOption ${selectedPlatforms.includes(platform) ? "selected" : ""}`}
                                  onClick={() => handlePlatformClick(platform)}
                                >
                                  {platform}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="card mycustomddcard">
              <div class="card__head-icon">
                <h2 class="card__heading text-headline-3">Save changes </h2>
              </div>
              
              <button
                class="cta text-button cta--img cta--launch card__cta"
                className="saveChangesPassButton"
                //disabled=""
                style={{ width: "150px" }}
                onClick={handleSaveChanges}
                //style={{ hover: "cursor: pointer; background-color: #1b1b1f" }}
              >
                Start campaign
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
