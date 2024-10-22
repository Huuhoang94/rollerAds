import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";

const AdminTransactions = ({onLogout}) => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editedData, setEditedData] = useState({});
  //const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Lấy danh sách chiến dịch từ backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://roller-ads-app-247fc36661ce.herokuapp.com/admin_transaction", {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        console.log(response.data);
        setTransactions(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  //const handleExpand = (id) => {
  //  setExpandedRow(expandedRow === id ? null : id); // Toggle expand/collapse
  //};
  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction.id);
    setEditedData({
      status: transaction.status,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (Id) => {
    try {
      const response = await axios.post(`https://roller-ads-app-247fc36661ce.herokuapp.com/admin-update-transaction/${Id}`, editedData, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      // Cập nhật dữ liệu trong state
      console.log(response.data);
      alert(response.data.message);
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === Id ? { ...transaction, ...editedData } : transaction
        )
      );
      setEditingTransactionId(null); // Thoát chế độ chỉnh sửa
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const handleCancel = () => {
    setEditingTransactionId(null); // Thoát chế độ chỉnh sửa mà không lưu
    setEditedData({});
  };

  return (
    <div className="compainstableContainer">
      <AdminHeader routename="Admin / Transactions" onLogout={onLogout} />
      <br />
      <h3>List of Transactions</h3>
      <br />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Payment</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Type</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>TransactionID</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>WalletID</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <>
              <tr key={transaction.id}>
                <td style={styles.tableCell}>{transaction.id}</td>
                <td style={styles.tableCell}>{transaction.date}</td>
                <td style={styles.tableCell}>{transaction.payment}</td>
                <td style={styles.tableCell}>{transaction.description}</td>
                <td style={styles.tableCell}>{transaction.type}</td>
                <td style={styles.tableCell}>
                  {editingTransactionId === transaction.id ? (
                    <select
                      name="status"
                      value={editedData.status}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                    </select>
                  ) : (
                    transaction.status
                  )}
                </td>
                <td style={styles.tableCell}>{transaction.transactionID}</td>
                <td style={styles.tableCell}>{transaction.email}</td>
                <td style={styles.tableCell}>{transaction.walletID}</td>
                <td style={styles.tableCell}>
                  {editingTransactionId === transaction.id ? (
                    <>
                      <button onClick={() => handleSave(transaction.id)} style={styles.saveButton}>Save</button>
                      <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(transaction)} style={styles.editButton}>Edit</button>
                  )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  expandedRowContent: {
    padding: '15px',
    backgroundColor: '#2b2b2b',  // Nền tối hơn để phân biệt rõ ràng với bảng
    color: '#ddd', // Màu chữ nhạt hơn để dễ nhìn
    borderRadius: '8px',
    marginTop: '10px',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Bóng đổ nhẹ để tạo cảm giác nổi
  },
  inputField: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #444', // Tạo viền tối hơn
    backgroundColor: '#1e1e1e', // Nền cho input
    color: '#fff', // Chữ trắng cho dễ đọc
    marginTop: '5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#fff',
    fontSize: '14px',
  },
  tableHeader: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #444',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #444',
  },
  tableCellEdit: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #444',
    width: '120px',
  },
  editButton: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#28a745',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '5px',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
  expandButton: {
    backgroundColor: '#28a745',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  collapseButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AdminTransactions;