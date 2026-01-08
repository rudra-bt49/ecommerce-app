import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/user/user.service";

import AdminSidebar from "../../components/layout/AdminSidebar/AdminSidebar";
import "./ManageUsers.scss";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirm) return;

    await deleteUser(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin">
      <AdminSidebar />

      <main className="admin-content">
        <h2>Manage Users</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  {u.name?.firstname} {u.name?.lastname}
                </td>
                <td>{u.phone}</td>
                <td>
                  <button
                    className="btn btn--danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ManageUsers;