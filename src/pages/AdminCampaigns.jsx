import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";

const AdminCampaigns = ({onLogout}) => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Lấy danh sách chiến dịch từ backend
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("https://roller-ads-app-247fc36661ce.herokuapp.com/admin_campaign", {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        });
        setCampaigns(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id); // Toggle expand/collapse
  };
  const handleEdit = (campaign) => {
    setEditingCampaignId(campaign.id);
    setEditedData({
      status: campaign.status,
      bid: campaign.bid,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      cost: campaign.cost,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (campaignId) => {
    try {
      const response = await axios.post(`https://roller-ads-app-247fc36661ce.herokuapp.com/admin-update-campaign/${campaignId}`, editedData, {
        withCredentials: true // Thêm thông tin xác thực vào yêu cầu
      });
      // Cập nhật dữ liệu trong state
      console.log(response.data);
      alert(response.data.message);
      setCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === campaignId ? { ...campaign, ...editedData } : campaign
        )
      );
      setEditingCampaignId(null); // Thoát chế độ chỉnh sửa
    } catch (error) {
      console.error("Failed to update campaign:", error);
    }
  };

  const handleCancel = () => {
    setEditingCampaignId(null); // Thoát chế độ chỉnh sửa mà không lưu
    setEditedData({});
  };

  return (
    <div className="compainstableContainer">
      <AdminHeader routename="Admin / Campaigns" onLogout={onLogout} />
      <br />
      <h3>List of Campaigns</h3>
      <br />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Campaign Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Format</th>
            <th style={styles.tableHeader}>Bid Model</th>
            <th style={styles.tableHeader}>Bid</th>
            <th style={styles.tableHeader}>Impressions</th>
            <th style={styles.tableHeader}>Clicks</th>
            <th style={styles.tableHeader}>Cost</th>
            <th style={styles.tableHeader}>Expanded</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <>
              <tr key={campaign.id}>
                <td style={styles.tableCell}>{campaign.id}</td>
                <td style={styles.tableCell}>{campaign.campaignName}</td>
                <td style={styles.tableCell}>{campaign.email}</td>
                <td style={styles.tableCell}>
                  {editingCampaignId === campaign.id ? (
                    <select
                      name="status"
                      value={editedData.status}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    campaign.status
                  )}
                </td>
                <td style={styles.tableCell}>{campaign.format}</td>
                <td style={styles.tableCell}>{campaign.bidModel}</td>
                <td style={styles.tableCellEdit}>
                  {editingCampaignId === campaign.id ? (
                    <input
                      type="number"
                      name="bid"
                      value={editedData.bid}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  ) : (
                    campaign.bid
                  )}
                </td>
                <td style={styles.tableCellEdit}>
                  {editingCampaignId === campaign.id ? (
                    <input
                      type="number"
                      name="impressions"
                      value={editedData.impressions}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  ) : (
                    campaign.impressions
                  )}
                </td>
                <td style={styles.tableCellEdit}>
                  {editingCampaignId === campaign.id ? (
                    <input
                      type="number"
                      name="clicks"
                      value={editedData.clicks}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  ) : (
                    campaign.clicks
                  )}
                </td>
                <td style={styles.tableCellEdit}>
                  {editingCampaignId === campaign.id ? (
                    <input
                      type="number"
                      name="cost"
                      value={editedData.cost}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  ) : (
                    campaign.cost
                  )}
                </td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => handleExpand(campaign.id)}
                    style={expandedRow === campaign.id ? styles.collapseButton : styles.expandButton}
                  >
                    {expandedRow === campaign.id ? "Collapse" : "Expand"}
                  </button>
                </td>
                <td style={styles.tableCell}>
                  {editingCampaignId === campaign.id ? (
                    <>
                      <button onClick={() => handleSave(campaign.id)} style={styles.saveButton}>Save</button>
                      <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(campaign)} style={styles.editButton}>Edit</button>
                  )}
                </td>
              </tr>

              {expandedRow === campaign.id && (
                <tr>
                  <td colSpan="11" style={{ padding: '0' }}>
                    <div className="expandedRowContent" style={styles.expandedRowContent}>
                      {/* Hiển thị các thuộc tính mở rộng */}
                      <p><strong>Presets:</strong> {campaign.presets}</p>
                      <br></br>
                      <p><strong>Target URL:</strong> {campaign.targetURL}</p>
                      <br></br>
                      <p><strong>Icon:</strong> 
                        {campaign.icon ? (
                          <img src={campaign.icon} alt="Icon" className="uploaded-image" style={{ maxWidth: "50px"}}/>
                        ) : (
                          "No icon uploaded"
                        )}
                      </p>
                      <br></br>
                      <p><strong>Image:</strong> 
                        {campaign.image ? (
                          <img src={campaign.image} alt="Image" className="uploaded-image" style={{ maxWidth: "50px"}}/>
                        ) : (
                          "No image uploaded"
                        )}
                      </p>
                      <br></br>
                      <p><strong>Title:</strong> {campaign.title}</p>
                      <br></br>
                      <p><strong>Description:</strong> {campaign.description}</p>
                      <br></br>
                      <p><strong>Country:</strong> {campaign.selectedCountry}</p>
                      <br></br>
                      <p><strong>Daily Budget:</strong> {campaign.dailyBudget}</p>
                      <br></br>
                      <p><strong>Total Budget:</strong> {campaign.totalBudget}</p>
                      <br></br>
                      <p><strong>Device:</strong> {campaign.selectedDevices}</p>
                      <br></br>
                      <p><strong>Platforms:</strong> {campaign.selectedPlatforms}</p>
                      <br></br>
                      <p><strong>Start Date:</strong> {campaign.startDate}</p>
                    </div>
                  </td>
                </tr>
              )}
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

export default AdminCampaigns;