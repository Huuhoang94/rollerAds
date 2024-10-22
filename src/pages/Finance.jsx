import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Tab from "../components/Tabs";
import { Link, useNavigate} from "react-router-dom";
import HeaderIcon from "../assets/header.svg";
import InstaLogo from "../assets/insta.svg";
import axios from "axios";
import bank_logo from "../assets/bank_logo.svg";
import QRcode from "../assets/QRcode.svg";
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
const Finance = ({onLogout}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Top Up'); // State để quản lý tab
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [walletId, setWalletId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const email = localStorage.getItem("userEmail");
  const [userTransactions, setUserTransactions] = useState([]);
  //const [userWalletId, setUserWalletId] = useState('');

  const tronWalletAddress = "TEPb7r4uNSwZfVkZMVtddJvMCGe8ZTCBYw";
  const bankDetails = {
    bankName: "Jago Bank",
    accountNumber: "1057-1012-2149",
    accountHolder: "SAMSUL ADRIANSYAH"
  };
  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get(`https://roller-ads-app-247fc36661ce.herokuapp.com/user-transaction/${email}`, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      console.log(response.data);
      setUserTransactions(response.data[0]);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const fetchUserWalletId = async () => {
    try {
      const response = await axios.get(`https://roller-ads-app-247fc36661ce.herokuapp.com/user-walletId/${email}`, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      console.log(response.data);
      setWalletId(response.data[0].cryptoID);
    } catch (error) {
      console.error("Failed to fetch user walletId:", error);
    }
  };

  useEffect(() => {
    document.title = "Finance . RollerAds";
    fetchUserTransactions();
    fetchUserWalletId();
    
  }, []);

  // Auto-generate transaction ID and payment note when user selects payment method or amount
  useEffect(() => {
    if (paymentMethod && amount) {
      const generatedTransactionId = paymentMethod === 'crypto' 
        ? 'CRYPTO-' + new Date().getTime() 
        : 'BANK-' + new Date().getTime();
      
      const generatedPaymentNote = `${email}-${generatedTransactionId}`;
      setTransactionId(generatedTransactionId);
      setPaymentNote(generatedPaymentNote);
    }
  }, [paymentMethod, amount]); // Re-run when payment method or amount changes

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://roller-ads-app-247fc36661ce.herokuapp.com/new-transaction", {
        email,
        paymentMethod,
        amount,
        transactionId,
        paymentNote,
        walletId,
      },{
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu        
      });
      alert(response.data.message);
      setAmount('');
      //setPaymentMethod('crypto');
      setTransactionId('');
      setPaymentNote('');
      fetchUserTransactions();
      setActiveTab("History");     
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed.");
    }
    //alert(`Payment initiated! Your Transaction ID is ${transactionId}. Payment note: ${paymentNote}`);
  };

  return (
    
    <div className="financepagehere">
      <Header routename="Finance" onLogout={onLogout} />
      <div style={{ width: "100%", display: "flex", justifyItems: "center" }}>
        <div className="tabs-container" style={{ width: "100%" }}>
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabName="Top Up"
          />
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabName="History"
          />
        </div>
      </div>
      {/* Payment Interface */}
      {activeTab === "Top Up" && (
              <div style={styles.container}>
              <h2 style={{textAlign: "center"}}>Select Payment Method</h2>
              <br></br>
              <form onSubmit={handleSubmit}>
                <div style={styles.paymentMethod}>
                  {/* Crypto Payment Method */}
                  <div style={styles.method}>
                    <input
                      type="radio"
                      id="crypto"
                      name="paymentMethod"
                      value="crypto"
                      checked={paymentMethod === "crypto"}
                      onChange={handlePaymentMethodChange}
                      required
                      style={{marginBottom: "5px"}}
                    />
                    <label htmlFor="crypto">Pay with Crypto</label>
                    <img
                      src={QRcode}
                      alt="Crypto QR Code"
                      style={styles.image}
                    />
                  </div>
      
                  {/* Bank Payment Method */}
                  <div style={styles.method}>
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={handlePaymentMethodChange}
                      required
                      style={{marginBottom: "5px"}}
                    />
                    <label htmlFor="bank">Pay via Bank</label>
                    <img
                      src={bank_logo}
                      alt="Bank Logo"
                      style={styles.image}
                    />
                  </div>
                </div>
      
                {/* Wallet ID for Crypto Payment */}
                {paymentMethod === 'crypto' && (
                  <>
                  <div style={styles.qrSection}>
                    <img
                      src={QRcode}
                      alt="Crypto QR Code"
                      style={styles.largeQrCode}
                    />
                    <p style={styles.walletAddress}>{tronWalletAddress}</p>
                  </div>
                  <div style={styles.walletSection}>
                    <label htmlFor="walletId">Enter your Wallet ID:</label>
                    <input
                      type="text"
                      id="walletId"
                      value={walletId}
                      onChange={(e) => setWalletId(e.target.value)}
                      style={styles.inputField}
                      placeholder="Enter your Wallet ID"
                    />
                  </div>
                  </>
                )}
      
                {/* Bank Details for Bank Payment */}
                {paymentMethod === 'bank' && (
                  <>
                    <div style={styles.qrSection}>
                      <img
                        src={bank_logo}
                        alt="Bank Logo"
                        style={styles.largeQrCode}
                      />
                    </div>
                    <div style={styles.bankDetailsSection}>
                      <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                    </div>
                    <div style={styles.bankDetailsSection}>
                      <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                    </div>
                    <div style={styles.bankDetailsSection}>
                      <p><strong>Account Holder:</strong> {bankDetails.accountHolder}</p>
                    </div>
                  </> 
                )}
      
                {/* Amount Section */}
                <div style={styles.amountSection}>
                  <label htmlFor="amount">Select Amount to Pay:</label>
                  <select
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.inputField}
                    required
                  >
                    <option value="">Select Amount</option>
                    <option value="500">500 USD</option>
                    <option value="1000">1000 USD</option>
                    <option value="1500">1500 USD</option>
                    <option value="2000">2000 USD</option>
                    <option value="3000">3000 USD</option>
                  </select>
                </div>
      
                {/* Display Transaction ID and Payment Note */}
                {transactionId && paymentNote && (
                  <>
                    <div style={styles.transactionDetails}>
                      <p><strong>Transaction ID:</strong> {transactionId}</p>
                    </div>
                    <div style={styles.transactionDetails}>
                      <p><strong>Payment Note:</strong> {paymentNote}</p>
                    </div>
                    <i style={{fontSize: "12px", }}>Please write the payment note exactly as above when transferring.</i>
                    <br></br>
                    <br></br>
                  </>
                )}
                <button type="submit" style={styles.button}>Proceed with Payment</button>
              </form>
      
              {/* Admin Contact Info */}
              <div style={styles.contactInfo}>
                <p>If you need assistance, please contact:</p>
                <p>Email: <a href="mailto:b43543262@gmail.com" style={styles.contactLink}>b43543262@gmail.com</a></p>
                <p>Phone: <a href="tel:+6287864909872" style={styles.contactLink}>+62 878-6490-9872</a></p>
              </div>
            </div>
      )}
      {activeTab === "History" && (
        <>
        <div className="compainContainermain">
          <div className="compainsheader">
            <h3>List of transactions</h3>
            <img src={HeaderIcon} alt="" />
          </div>
          <div className="compainstableContainer" style={{ minHeight: "300px" }}>
            <table className="campaignsTable">
              <thead>
                <tr>
                  <th>
                    <div className="tablesingledivvv">
                      Date <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      Payment <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      Description <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      Type <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      Status <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      TransactionID <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                  <th>
                    <div className="tablesingledivvv">
                      WalletID <ArrowDownIcon className="hhhh" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="ccccctablebody">
                <br />
                {userTransactions.map((transaction) => (
                <>
                  <tr key={transaction.id}>
                    <td style={styles.tableCell}>{transaction.date}</td>
                    <td style={styles.tableCell}>{transaction.payment}</td>
                    <td style={styles.tableCell}>{transaction.description}</td>
                    <td style={styles.tableCell}>{transaction.type}</td>
                    <td style={styles.tableCell}>
                      <p
                        mycuststylebar={transaction.status}
                        className="mycompainlargetitlt"
                        style={{
                          backgroundColor: 
                          transaction.status === "pending" ? "#574500" :
                            //campaign.status === "active" ? "#00533e" :
                            transaction.status === "success" ? "green" :
                            transaction.status === "failed" ? "red" : "",

                          color: "white",
                            //campaign.status === "completed" ? "#b1deeb" :
                            //campaign.status === "active" ? "#0ece9e" :
                            //campaign.status === "paused" ? "white" :
                            //campaign.status === "pending" ? "white" : "",

                          padding: "5px 8px", // Giá trị padding là giống nhau, không cần điều kiện

                          borderRadius: "5px", // Tương tự, giá trị này là giống nhau

                          fontSize: "14px", // Giá trị fontSize là giống nhau
                          textAlign: "center",
                        }}
                        >
                        {transaction.status}
                      </p>
                      
                    </td>
                    <td style={styles.tableCell}>{transaction.transactionID}</td>
                    <td style={styles.tableCell}>{transaction.walletID}</td>           
                  </tr>
                </>
              ))}
                
              </tbody>
              <footer className="tablefooter"></footer>
            </table>
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
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    backgroundColor: '#1e1e1e',
    padding: '20px',
    margin: '20px auto',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    border: '1px solid #333'
  },
  paymentMethod: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #333',
  },
  method: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
  },
  image: {
    width: '60px',
    height: 'auto',
    marginTop: '5px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  largeQrCode: {
    width: '300px',
    margin: '20px auto',
    display: 'block',
  },
  walletAddress: {
    textAlign: 'center',
    fontSize: '16px',
    marginTop: '10px',
  },
  qrSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  bankDetailsSection: {
    marginBottom: '20px',
    backgroundColor: '#2a2a2a',
    padding: '15px',
    borderRadius: '8px',
  },
  amountSection: {
    marginBottom: '20px',
  },
  transactionDetails: {
    marginBottom: '20px',
    backgroundColor: '#2a2a2a',
    padding: '10px',
    borderRadius: '8px',
    color: '#fff',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  contactInfo: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#ccc',
  },
  contactLink: {
    color: '#00b0ff',
    textDecoration: 'none',
  },
};

export default Finance;