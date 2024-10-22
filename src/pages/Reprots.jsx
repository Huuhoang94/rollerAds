import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/Reports.css";
import TableEYEIcon from "../assets/tableeye.svg";
import DownlaodIcon from "../assets/download.svg";
import RefreshSVG from "../assets/refresh.svg";
import EraseImg from "../assets/erase.svg";
import axios from "axios";

import {
  ArrowDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
const Reprots = ({onLogout}) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredDatadates, setFilteredDatadates] = useState([]);

  const [showSavedReports, setShowSavedReports] = useState(false);
  const [showCompaingsnames, setShowSCompaingsnames] = useState(false);
  const [showplatform, setShowPlatform] = useState(false);
  const [selectplatform, setSelectPlatform] = useState("");
  const [Adsformattoggle, setshowAdsFormatToggle] = useState(false);
  const [Subscriptionshow, setSubscriptionShow] = useState(false);
  const [selectadsformat, setselectadformat] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountries, setShowCountries] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2024-02-01 / 2024-03-12");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectcomapinname, setselectcomainname] = useState(null);
  const [selectsub, setSub] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [compainsnames, setCompainsnames] = useState([]);

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
        setExcelData(response.data[0]);
        setFilteredData(response.data[0]); // Khởi tạo dữ liệu lọc
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);
  const handleDateRangeSelect = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };
  const filterDataByDateRange = (data) => {
    if (!startDate || !endDate) {
      return data; // Return unfiltered data if no date range is selected
    }

    // Filter data based on the selected date range
    return data.filter((report) => {
      // Convert report date to a Date object for comparison
      const reportDate = new Date(report["Date"]); // Assuming "Date" is the key for date in your report data

      // Check if report date is within the selected range
      return reportDate >= startDate && reportDate <= endDate;
    });
  };
  const [campains, setcomapins] = useState([
    "Creatives",
    "Campaigns",
    "Ad Format",
    "Day",
    "Hour",
    "Platform",
    "Subscription age",
  ]);
  const [Adformat, setAdFormat] = useState([
    "Push",
    "OnClick",
    "In-Page",
  ]);
  const [subscription, setsubscription] = useState([
    "0-3 days",
    "4-7 days",
    "8-15 days",
    "16-30 days",
    "30-60 days",
    "60+",
  ]);
  const [plateform, setPlatform] = useState([
    "Android",
    "Windows",
    "iOS",
    "macOS",
    "Chrome OS",
    "Others",
  ]);
  // const [currentRows, setCurrentRows] = useState([]);
  // Function to convert the Excel data to an array of report objects
  /*
  function createReportArray(data) {
    const reportArray = [];
    const headers = data[0]; // Assuming the first row contains headers

    // Iterate through each row (excluding headers)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const reportObject = {};

      // Iterate through each cell in the row
      for (let j = 0; j < headers.length; j++) {
        // Use headers as keys and corresponding cell value as value
        reportObject[headers[j]] = row[j];
      }

      // Push the object into the array
      reportArray.push(reportObject);
    }

    return reportArray;
  }
  */
  // Create array of report objects
  const reports = excelData;

  // Handle toggling of saved reports dropdown
  const handleToggleSavedReports = () => {
    setShowSavedReports(!showSavedReports);
  };
  const handleToggleAdsFormat = () => {
    setshowAdsFormatToggle(!Adsformattoggle);
  };
  // Handle selection of a report
  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setShowSavedReports(false);
  };

  // Handle selection of a country
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowCountries(false);
  };

  // Handle toggling of countries dropdown
  const handleToggleCountries = () => {
    setShowCountries(!showCountries);
  };

  // Handle toggling of date picker
  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle selection of a date
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const handleselectAdFormat = (item) => {
    setselectadformat(item);
    setshowAdsFormatToggle(false);
  };
  const handlesubscriptiontoggle = (item) => {
    setSub(item);
    setSubscriptionShow(!Subscriptionshow);
  };
  const hanleSelectOptionToggle = () => {
    setSubscriptionShow(!Subscriptionshow);
  };
  const handleTogglePlateform = () => {
    setShowPlatform(!showplatform);
  };
  const handleSelectPlatform = (item) => {
    setSelectPlatform(item);
    setShowPlatform(false);
  };
  const handletogglecompaincontainer = () => {
    setShowSCompaingsnames(!showCompaingsnames);
  };
  const handleselectcompaingname = (item) => {
    setselectcomainname(item);
    setShowSCompaingsnames(false);
  };
  // Calculate total pages for pagination
  const totalPages = Math.ceil(reports.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = reports.slice(indexOfFirstRow, indexOfLastRow);
  const filteredRows = filterDataByDateRange(currentRows);
  if (selectcomapinname) {
    currentRows = currentRows.filter((item) =>
      item["Campaign"].includes(selectcomapinname)
    );
  }
  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Effect to set document title
  useEffect(() => {
    document.title = "Reports Campaings . RollerAds";
  }, []);

  return (
    <div className="reportsContainer">
      <Header routename="Reports" onLogout={onLogout}/>
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
      <div className="reaportsfiltercontainer">
        <div className="reportfiheader">
          <h3>Filters</h3>
          <div className="reportfilterrightside">
            <p>Show saved reports</p>
            {/* toggledivbycss */}
          </div>
        </div>
        <div className="filerreportsbody">
          <div className="reportsdivItem">
            <div>
              <input
                type="text"
                value={selectedReport}
                placeholder="Group by Campaings"
                readOnly
                onClick={handleToggleSavedReports}
              />
            </div>
            {showSavedReports && (
              <div className="optionsContainer avafi">
                {campains.map((item, i) => (
                  <div
                    className="countriescontainer"
                    key={i}
                    onClick={() => handleSelectReport(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="reportsdivItem datedatedate">
            <div>
              <input
                className="dadddd"
                type="text"
                value={selectedDate}
                placeholder="Select date"
                readOnly
                onClick={handleToggleDatePicker}
              />
            </div>
            {showDatePicker && (
              <div className="mycustomadedateranger ltr show-ranges show-calendar opensright">
                <div class="ranges">
                  <ul>
                    <li data-range-key="Today">Today</li>
                    <li data-range-key="Yesterday">Yesterday</li>
                    <li data-range-key="Current Week">Current Week</li>
                    <li data-range-key="Last 7 Days">Last 7 Days</li>
                    <li data-range-key="Last 30 Days">Last 30 Days</li>
                    <li data-range-key="This Month">This Month</li>
                    <li data-range-key="Last Month">Last Month</li>
                  </ul>
                </div>
                <div>
                  <div className="flextopcontainer">
                    <div class="drp-calendar left">
                      <div class="calendar-table">
                        <table class="table-condensed">
                          <thead>
                            <tr>
                              <th class="prev available">
                                <span></span>
                              </th>
                              <th colspan="5" class="month">
                                Feb 2024
                              </th>
                              <th></th>
                            </tr>
                            <tr>
                              <th>Mo</th>
                              <th>Tu</th>
                              <th>We</th>
                              <th>Th</th>
                              <th>Fr</th>
                              <th>Sa</th>
                              <th>Su</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="off ends available" data-title="r0c0">
                                26
                              </td>
                              <td class="off ends available" data-title="r0c1">
                                27
                              </td>
                              <td class="off ends available" data-title="r0c2">
                                28
                              </td>
                              <td class="off ends available" data-title="r0c3">
                                29
                              </td>
                              <td class="available active" data-title="r0c4">
                                1
                              </td>
                              <td
                                class="weekend available active "
                                data-title="r0c5"
                              >
                                2
                              </td>
                              <td
                                class="weekend available active"
                                data-title="r0c6"
                              >
                                3
                              </td>
                            </tr>
                            <tr>
                              <td class="available active" data-title="r1c0">
                                4
                              </td>
                              <td class="available active" data-title="r1c1">
                                5
                              </td>
                              <td
                                class="today active start-date end-date available"
                                data-title="r1c2"
                              >
                                6
                              </td>
                              <td class="off active disabled" data-title="r1c3">
                                7
                              </td>
                              <td class="off active disabled" data-title="r1c4">
                                8
                              </td>
                              <td
                                class="weekend active off disabled"
                                data-title="r1c5"
                              >
                                9
                              </td>
                              <td
                                class="weekend active off disabled"
                                data-title="r1c6"
                              >
                                10
                              </td>
                            </tr>
                            <tr>
                              <td class="off active disabled" data-title="r2c0">
                                11
                              </td>
                              <td class="off active disabled" data-title="r2c1">
                                12
                              </td>
                              <td class="off active disabled" data-title="r2c2">
                                13
                              </td>
                              <td class="off active disabled" data-title="r2c3">
                                14
                              </td>
                              <td class="off disabled active" data-title="r2c4">
                                15
                              </td>
                              <td
                                class="weekend off disabled active"
                                data-title="r2c5"
                              >
                                16
                              </td>
                              <td
                                class="weekend off disabled active"
                                data-title="r2c6"
                              >
                                17
                              </td>
                            </tr>
                            <tr>
                              <td class="off disabled active" data-title="r3c0">
                                18
                              </td>
                              <td class="off disabled active" data-title="r3c1">
                                19
                              </td>
                              <td class="off disabled active" data-title="r3c2">
                                20
                              </td>
                              <td class="off disabled active" data-title="r3c3">
                                21
                              </td>
                              <td class="off disabled active" data-title="r3c4">
                                22
                              </td>
                              <td
                                class="weekend off disabled active"
                                data-title="r3c5"
                              >
                                23
                              </td>
                              <td
                                class="weekend off disabled active"
                                data-title="r3c6"
                              >
                                24
                              </td>
                            </tr>
                            <tr>
                              <td class="off disabled active" data-title="r4c0">
                                25
                              </td>
                              <td class="off disabled active" data-title="r4c1">
                                26
                              </td>
                              <td class="off disabled active" data-title="r4c2">
                                27
                              </td>
                              <td class="off disabled active" data-title="r4c3">
                                28
                              </td>
                              <td class="off disabled active" data-title="r4c4">
                                29
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="off ends off disabled"
                                data-title="r5c0"
                              >
                                1
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c1"
                              >
                                2
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c2"
                              >
                                3
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c3"
                              >
                                4
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c4"
                              >
                                5
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r5c5"
                              >
                                6
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r5c6"
                              >
                                7
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="drp-calendar right">
                      <div class="calendar-table">
                        <table class="table-condensed">
                          <thead>
                            <tr>
                              <th class="prev available">
                                <span></span>
                              </th>
                              <th colspan="5" class="month">
                                March 2024
                              </th>
                              <th></th>
                            </tr>
                            <tr>
                              <th>Mo</th>
                              <th>Tu</th>
                              <th>We</th>
                              <th>Th</th>
                              <th>Fr</th>
                              <th>Sa</th>
                              <th>Su</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                class="off ends off disabled"
                                data-title="r0c0"
                              >
                                25
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r0c1"
                              >
                                26
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r0c2"
                              >
                                27
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r0c3"
                              >
                                28
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r0c4"
                              >
                                29
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r0c5"
                              >
                                30
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r0c6"
                              >
                                31
                              </td>
                            </tr>
                            <tr>
                              <td class="off active disabled" data-title="r1c0">
                                1
                              </td>
                              <td class="off active disabled" data-title="r1c1">
                                2
                              </td>
                              <td class="off active disabled" data-title="r1c2">
                                3
                              </td>
                              <td class="off active disabled" data-title="r1c3">
                                4
                              </td>
                              <td class="off active disabled" data-title="r1c4">
                                5
                              </td>
                              <td
                                class="weekend off active disabled"
                                data-title="r1c5"
                              >
                                6
                              </td>
                              <td
                                class="weekend off active disabled"
                                data-title="r1c6"
                              >
                                7
                              </td>
                            </tr>
                            <tr>
                              <td class="off active disabled" data-title="r2c0">
                                8
                              </td>
                              <td class="off active disabled" data-title="r2c1">
                                9
                              </td>
                              <td class="off active disabled" data-title="r2c2">
                                10
                              </td>
                              <td class="off active disabled" data-title="r2c3">
                                11
                              </td>
                              <td class="off active disabled" data-title="r2c4">
                                12
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r2c5"
                              >
                                13
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r2c6"
                              >
                                14
                              </td>
                            </tr>
                            <tr>
                              <td class="off disabled" data-title="r3c0">
                                15
                              </td>
                              <td class="off disabled" data-title="r3c1">
                                16
                              </td>
                              <td class="off disabled" data-title="r3c2">
                                17
                              </td>
                              <td class="off disabled" data-title="r3c3">
                                18
                              </td>
                              <td class="off disabled" data-title="r3c4">
                                19
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r3c5"
                              >
                                20
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r3c6"
                              >
                                21
                              </td>
                            </tr>
                            <tr>
                              <td class="off disabled" data-title="r4c0">
                                22
                              </td>
                              <td class="off disabled" data-title="r4c1">
                                23
                              </td>
                              <td class="off disabled" data-title="r4c2">
                                24
                              </td>
                              <td class="off disabled" data-title="r4c3">
                                25
                              </td>
                              <td class="off disabled" data-title="r4c4">
                                26
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r4c5"
                              >
                                27
                              </td>
                              <td
                                class="weekend off disabled"
                                data-title="r4c6"
                              >
                                28
                              </td>
                            </tr>
                            <tr>
                              <td class="off disabled" data-title="r5c0">
                                29
                              </td>
                              <td class="off disabled" data-title="r5c1">
                                30
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c2"
                              >
                                1
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c3"
                              >
                                2
                              </td>
                              <td
                                class="off ends off disabled"
                                data-title="r5c4"
                              >
                                3
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r5c5"
                              >
                                4
                              </td>
                              <td
                                class="weekend off ends off disabled"
                                data-title="r5c6"
                              >
                                5
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="drp-buttons">
                    <span class="drp-selected">2024-03-06 - 2024-03-06</span>
                    <button
                      class="cancelBtn btn btn-sm btn-default"
                      type="button"
                    >
                      Clear
                    </button>
                    <button
                      class="applyBtn btn btn-sm btn-primary"
                      type="button"
                    >
                      Apply
                    </button>{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="reportsdivItem">
            <div>
              <input
                type="text"
                value={selectadsformat}
                placeholder="Ad Format"
                readOnly
                onClick={handleToggleAdsFormat}
              />
            </div>
            {Adsformattoggle && (
              <div className="optionsContainer">
                {Adformat.map((item, i) => (
                  <div key={i} onClick={() => handleselectAdFormat(item)}>
                    {item}
                  </div>
                ))}

                {/* Add more reports as needed */}
              </div>
            )}
          </div>{" "}
          <div className="reportsdivItem">
            <div className="comapaintogglecontainer">
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
              <input
                type="text"
                value={selectcomapinname}
                placeholder="Campaigns"
                readOnly
                //onClick={handletogglecompaincontainer}
              />
            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} style={{ position: 'relative', fill: '#4b474e', left: '-29px' }} onClick={() => setselectcomainname(null)}>
              <path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" />
            </svg> */}
            {showCompaingsnames && (
              <div className="optionsContainer">
                {compainsnames.map((item, i) => (
                  <div
                    className="countriescontainer"
                    key={i}
                    //onClick={() => handleselectcompaingname(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="reportsdivItem">
            <div className="workkkk">
              <div className="plusiconcintainer">
                <PlusIcon className="wwww" />
              </div>
              <input
                type="text"
                value={selectedCountry}
                placeholder="Countries"
                readOnly
                //onClick={handleToggleCountries}
              />
            </div>
            {showCountries && (
              <div className="optionsContainer">
                {countries.map((item, i) => (
                  <div
                    className="countriescontainer"
                    key={i}
                    //onClick={() => handleSelectCountry(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>{" "}
          <div className="reportsdivItem">
            <div>
              <input
                type="text"
                value={selectplatform}
                placeholder="Platform"
                readOnly
                onClick={handleTogglePlateform}
              />
            </div>
            {showplatform && (
              <div className="optionsContainer">
                {plateform.map((item, i) => (
                  <div
                    className="countriescontainer"
                    key={i}
                    onClick={() => handleSelectPlatform(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>{" "}
          <div className="reportsdivItem">
            <div>
              <input
                type="text"
                value={selectsub}
                placeholder="Subscriptoin age"
                readOnly
                onClick={hanleSelectOptionToggle}
              />
            </div>
            {Subscriptionshow && (
              <div className="optionsContainer">
                {subscription.map((item, i) => (
                  <div
                    className="countriescontainer"
                    key={i}
                    onClick={() => handlesubscriptiontoggle(item)}
                  >
                    {item}
                  </div>
                ))}
                {/* Add more reports as needed */}
              </div>
            )}
          </div>
        </div>
        <div className="footbuttons">
          <div>
            {" "}
            <img src={RefreshSVG} alt="" /> <span>Apply filters</span>
          </div>
          <div>
            {" "}
            <img src={EraseImg} alt="" /> <span>Clear filters</span>
          </div>
        </div>
      </div>
      <div className="reportstalbContainer">
        <div className="reporttableherader">
          <h3>Report</h3>
          <div className="iconscintainerseye">
            <img src={DownlaodIcon} alt="" />
            <img src={TableEYEIcon} alt="" />
          </div>
        </div>
        <div className="compainstableContainer parentcomapinstablecontainer">
          <table className="campaignsTable onemoretalbe">
            <thead>
              <tr>
                <th>
                  <div className="tablesingledivvv">
                    ID <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Campaigns <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    Impressions <ArrowDownIcon className="hhhh" />
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
                    CPC <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
                <th>
                  <div className="tablesingledivvv">
                    CTR <ArrowDownIcon className="hhhh" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((report, index) => (
                <tr key={index} className="on">
                  <td>{report.id}</td>
                  <td>{report.campaignName}</td>
                  <td>{report.impressions}</td>
                  <td>{report.clicks}</td>
                  <td>${report.cost}</td>
                  <td>{report.bid}</td>
                  <td>{report.impressions === 0 ? '---' : (report.clicks / report.impressions).toFixed(2)}</td>
                </tr>
              ))}
              {/* <tr className="on">
                <td>Total</td>
                <td> </td>
                <td>
                  {currentRows.reduce((sum, item) => {
                    const CTRValue = item.Impressions.replace(/,/g, "");
                    return sum + +CTRValue;
                  }, 0)}
                </td>
                <td>
                  {currentRows.reduce((sum, item) => sum + item.Clicks, 0)}
                </td>
                <td style={{ textAlign: "left" }}>
                  {currentRows.reduce((sum, item) => sum + item.Conversion, 0)}
                </td>
                <td>{"-"}</td>
                <td>
                  $
                  {currentRows
                    .reduce((sum, item) => sum + item.Cost, 0)
                    .toFixed(2)}
                </td>
                <td>
                  {currentRows
                    .reduce((sum, item) => sum + item.CPC, 0)
                    .toFixed(3)}
                </td>
                <td>
                  {currentRows
                    .reduce((sum, item) => sum + item.CPM, 0)
                    .toFixed(3)}
                </td>
                <td>
                  {currentRows
                    .reduce((sum, item) => sum + item.CTR, 0)
                    .toFixed(3)}
                </td>
                <td>{"-"}</td>
              </tr> */}
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
    </div>
  );
};

export default Reprots;
