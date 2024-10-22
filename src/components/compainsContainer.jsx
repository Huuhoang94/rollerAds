import React, { useState, useEffect } from "react";
import "../styles/compainsContainer.css";
import HeaderIcon from "../assets/header.svg";
import InstaLogo from "../assets/insta.svg";
import axios from "axios";
import {
  ChartBarSquareIcon,
  PauseIcon,
  PencilIcon,
  PlayIcon,
  PlusCircleIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const CompainContainer = () => {
  const navigate = useNavigate();
  const [campaignsData, setCampaignsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [dropdownState, setDropdownState] = useState({
    status: false,
    adFormat: false,
    type: false,
  });
  const [selectedValue, setSelectedValue] = useState("4 values");
  const [selectedValueAds, setSelectedValueAds] = useState("All");
  const [selectedValuetypes, setSelectedValuetypes] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Lấy danh sách người dùng từ backend
    const userEmail = localStorage.getItem("userEmail"); // Lấy email từ localStorage
    console.log(localStorage.getItem("userEmail"));
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`https://roller-ads-app-247fc36661ce.herokuapp.com/user-campaign/${userEmail}`, {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        console.log(response.data);
        setCampaignsData(response.data[0]);
        setFilteredData(response.data[0]); // Khởi tạo dữ liệu lọc
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchCampaigns();
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    const dataSearch = campaignsData;
    setSearchTerm(value);
    const results = dataSearch.filter(
      (campaign) =>
        campaign.campaignName.toLowerCase().includes(value.toLowerCase()) ||
        campaign.id.toString().includes(value) ||
        campaign.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleFilter = (key, value) => {
    const dataFilter = campaignsData;
    if(value === "All") {
      setFilteredData(campaignsData);
    }
    else {
    const results = dataFilter.filter((campaign) =>
      campaign[key] === value
    );
    setFilteredData(results);
    }
  };
  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };
  const options = [
    { value: "All", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "completed", label: "Stopped" },
  ];
  const AdsOptioins = [
    { value: "All", label: "All" },
    { value: "Push", label: "Push" },
    { value: "OnClick", label: "OnClick" },
    { value: "In-Page", label: "In-Page" },
  ];
  const types = [
    { value: "All", label: "All" },
    { value: "CPC", label: "CPC" },
    { value: "SmartCPC", label: "SmartCPC" },
  ];
  const EditcomapinPage = (id) => {
    navigate("/rates");
  };
  const handleToggleOptions = (dropdown) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };
  const handleSelectOption = (value) => {
    const option = options.find((option) => option.value === value);
    setSelectedValue(option.label);
    handleFilter("status", value);
    // Toggle dropdown state
    toggleDropdown("status");
  };

  const handleSelectOptionAds = (value) => {
    setSelectedValueAds(value);
    handleFilter("format", value);
    // Toggle dropdown state
    toggleDropdown("adFormat");
  };

  const handleSelectOptionTypes = (value) => {
    setSelectedValuetypes(value);
    handleFilter("bidModel", value);
    // Toggle dropdown state
    toggleDropdown("type");
  };
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="compainContainermain">
        <div className="compainsheader">
          <h3>List of compaigns</h3>
          <img src={HeaderIcon} alt="" />
        </div>
        <div className="compainstableContainer" style={{ minHeight: "300px" }}>
          <table className="campaignsTable">
            <thead>
              <tr>
                <th>
                  <div className="tablesingledivvv">
                    ID <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Name <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Status <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Ad Format <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Type <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Bid <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Impr. <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Clicks <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Cost <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Daily budget <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Total budget <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Start Date <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="ccccctablebody">
              <br />
              <tr className="myrrrrrrr">
                <td>
                  <input type="" className="seasrchid" placeholder="All" />
                </td>
                <td>
                  <input
                    type=""
                    className="nameinput"
                    placeholder="All"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </td>
                <td>
                <div className="customDropdownContainer">
                    <div
                      className="customInputContainer"
                      onClick={() => handleToggleOptions("status")}
                    >
                      <input
                        type="text"
                        className="customInput"
                        readOnly
                        value={selectedValue}
                      />
                      <div
                        className="arrowIcon"
                        onClick={() => handleToggleOptions("status")}
                      >
                        {dropdownState.status ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </div>
                    </div>
                    {dropdownState.status && (
                      <div className="optionsContainer">
                        {options.map((option) => (
                          <div
                            key={option.value}
                            className="option"
                            onClick={() => handleSelectOption(option.value)}
                          >
                            {option.label}{" "}
                            {selectedValue === option.label && (
                              <CheckIcon className="checkIcon" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="customDropdownContainer">
                    <div
                      className="customInputContainer"
                      onClick={() => handleToggleOptions("adFormat")}
                    >
                      <input
                        type="text"
                        className="customInput"
                        readOnly
                        value={selectedValueAds}
                      />
                      <div
                        className="arrowIcon"
                        onClick={() => handleToggleOptions("adFormat")}
                      >
                        {dropdownState.adFormat ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </div>
                    </div>
                    {dropdownState.adFormat && (
                      <div className="optionsContainer">
                        {AdsOptioins.map((option) => (
                          <div
                            key={option.value}
                            className="option"
                            onClick={() => handleSelectOptionAds(option.value)}
                          >
                            {option.label}{" "}
                            {selectedValueAds === option.value && (
                              <CheckIcon className="checkIcon" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="customDropdownContainer">
                    <div
                      className="customInputContainer"
                      onClick={() => handleToggleOptions("type")}
                    >
                      <input
                        type="text"
                        className="customInput"
                        readOnly
                        value={selectedValuetypes}
                      />
                      <div
                        className="arrowIcon"
                        onClick={() => handleToggleOptions("type")}
                      >
                        {dropdownState.type ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </div>
                    </div>
                    {dropdownState.type && (
                      <div className="optionsContainer">
                        {types.map((option) => (
                          <div
                            key={option.value}
                            className="option"
                            onClick={() =>
                              handleSelectOptionTypes(option.value)
                            }
                          >
                            {option.label}{" "}
                            {selectedValuetypes === option.value && (
                              <CheckIcon className="checkIcon" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {filteredData.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.id}</td>
                  <td>
                    <p className="companinnammedooted">{campaign.campaignName}</p>
                  </td>
                  <td>
                    <div>
                      <p
                        mycuststylebar={campaign.status}
                        //className="mycompainlargetitlt"
                        style={{
                          backgroundColor: 
                            campaign.status === "pending" ? "#574500" :
                            //campaign.status === "active" ? "#00533e" :
                            campaign.status === "active" ? "green" :
                            campaign.status === "completed" ? "#004b70" :
                            campaign.status === "paused" ? "red" : "",

                          color: "white",
                            //campaign.status === "completed" ? "#b1deeb" :
                            //campaign.status === "active" ? "#0ece9e" :
                            //campaign.status === "paused" ? "white" :
                            //campaign.status === "pending" ? "white" : "",

                          padding: "5px 8px", // Giá trị padding là giống nhau, không cần điều kiện

                          borderRadius: "5px", // Tương tự, giá trị này là giống nhau

                          fontSize: "14px", // Giá trị fontSize là giống nhau
                          width: "90px",
                          textAlign: "center",
                        }}
                      >
                        {campaign.status}
                      </p>
                      
                    </div>
                  </td>
                  <td>{campaign.format}</td>
                  <td>{campaign.bidModel}</td>
                  <td>
                    <div className="bidcontainer">{campaign.bid}</div>
                  </td>
                  <td className="uyuyu">{campaign.impressions}</td>
                  <td className="uyuyu">{campaign.clicks}</td>
                  <td>{campaign.cost}</td>
                  <td className="uyuyu">{campaign.dailyBudget}</td>
                  <td className="uyuyu">{campaign.totalBudget}</td>
                  <td typeof="date">{campaign.startDate}</td>
                  <td>
                    <button style={styles.editButton}>        
                      <Link
                        style={{ color: "unset" }}
                        to={`/campaigns/${campaign.id}`}
                      >
                        Edit
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <footer className="tablefooter"></footer>
          </table>
        </div>
        <div className="paginationContainer">
          {/* Display row count and rows per page selection */}
          <p>Rws count: {currentRows.length}</p>
          <label htmlFor="rowsPerPage">Rows per Page:</label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
          {/* Pagination buttons */}
          <button onClick={() => handlePageChange(1)}>
            <ChevronDoubleLeftIcon className="clicon" />
          </button>
          <button onClick={() => handlePageChange(currentPage - 1)}>
            <ChevronLeftIcon className="clicon" />
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <ChevronRightIcon className="clicon" />
          </button>
          <button onClick={() => handlePageChange(totalPages)}>
            <ChevronDoubleRightIcon className="clicon" />
          </button>
        </div>
      </div>
      <div className="iconsContainerslgoos" style={{ gap: "30px" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <div> */}
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.75 2.62553C12.75 2.52607 12.7105 2.43069 12.6402 2.36036C12.5698 2.29004 12.4745 2.25053 12.375 2.25053H10.5C9.55584 2.2035 8.63145 2.53207 7.92879 3.16446C7.22613 3.79685 6.80234 4.68165 6.75 5.62553V7.65053H4.875C4.77554 7.65053 4.68016 7.69004 4.60984 7.76036C4.53951 7.83069 4.5 7.92607 4.5 8.02553V9.97553C4.5 10.075 4.53951 10.1704 4.60984 10.2407C4.68016 10.311 4.77554 10.3505 4.875 10.3505H6.75V15.3755C6.75 15.475 6.78951 15.5704 6.85983 15.6407C6.93016 15.711 7.02554 15.7505 7.125 15.7505H9.375C9.47446 15.7505 9.56984 15.711 9.64017 15.6407C9.71049 15.5704 9.75 15.475 9.75 15.3755V10.3505H11.715C11.7984 10.3517 11.8798 10.3251 11.9464 10.2748C12.0129 10.2246 12.0608 10.1536 12.0825 10.073L12.6225 8.12303C12.6374 8.06762 12.6394 8.00953 12.6284 7.95322C12.6173 7.89692 12.5935 7.8439 12.5587 7.79826C12.5239 7.75261 12.4791 7.71556 12.4278 7.68995C12.3764 7.66434 12.3199 7.65085 12.2625 7.65053H9.75V5.62553C9.76866 5.43989 9.85584 5.26786 9.99452 5.14305C10.1332 5.01823 10.3134 4.94959 10.5 4.95053H12.375C12.4745 4.95053 12.5698 4.91102 12.6402 4.84069C12.7105 4.77037 12.75 4.67498 12.75 4.57553V2.62553Z" />
        </svg>
        <img src={InstaLogo} alt="" />
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.2003 6.8783H9.8001V8.1733C10.1746 7.4285 11.135 6.7593 12.5777 6.7593C15.3434 6.7593 16 8.2419 16 10.9621V16H13.2V11.5816C13.2 10.0325 12.8255 9.1589 11.8721 9.1589C10.5498 9.1589 10.0003 10.1004 10.0003 11.5809V16H7.2003V6.8783ZM2.399 15.881H5.199V6.7593H2.399V15.881ZM5.6001 3.785C5.6002 4.01969 5.55366 4.25206 5.46317 4.46861C5.37268 4.68516 5.24006 4.88156 5.073 5.0464C4.73448 5.38284 4.27627 5.57116 3.799 5.57C3.32257 5.56968 2.86542 5.38184 2.5264 5.0471C2.35995 4.8817 2.22777 4.68508 2.13744 4.4685C2.04711 4.25193 2.00041 4.01966 2 3.785C2 3.3111 2.189 2.8575 2.5271 2.5229C2.86582 2.18771 3.32317 1.99979 3.7997 2C4.2771 2 4.7349 2.1883 5.073 2.5229C5.4104 2.8575 5.6001 3.3111 5.6001 3.785Z"
            fill="#B5AABE"
          />
        </svg>

        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.4988 2.78786L2.20126 7.91561C1.29376 8.28011 1.29901 8.78636 2.03476 9.01211L5.44876 10.0771L13.3478 5.09336C13.7213 4.86611 14.0625 4.98836 13.782 5.23736L7.38226 11.0131H7.38076L7.38226 11.0139L7.14676 14.5329C7.49176 14.5329 7.64401 14.3746 7.83751 14.1879L9.49576 12.5754L12.945 15.1231C13.581 15.4734 14.0378 15.2934 14.196 14.5344L16.4603 3.86336C16.692 2.93411 16.1055 2.51336 15.4988 2.78786Z"
            fill="#B5AABE"
          />
        </svg>
        {/* </div> */}
      </div>
    </>
  );
};

const styles = {
  editButton: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
}

export default CompainContainer;
