import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";

const AdminUser = ({onLogout}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Lấy danh sách người dùng từ backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://roller-ads-app-247fc36661ce.herokuapp.com/admin_user", {
          withCredentials: true // Thêm thông tin xác thực vào yêu cầu
        }); 
        console.log(response.data);
        setUsers(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (

    <div className="compainstableContainer">
      <AdminHeader routename="Admin / Users" onLogout={onLogout}/>
      <br></br>
      <h3>List of Users</h3>
      <br></br>
      <table className="campaignsTable">
        <thead>
          <tr>
            <th>
              <div className="tablesingledivvv">
                ID 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Email 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                First Name 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Last Name 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Country 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                City 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Address 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Phone 
              </div>
            </th>
            <th>
              <div className="tablesingledivvv">
                Balance 
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="ccccctablebody">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.country}</td>
              <td>{user.city}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUser;
