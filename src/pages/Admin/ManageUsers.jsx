import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/user/user.service";

import AdminSidebar from "../../components/layout/AdminSidebar/AdminSidebar";
import Loader from "../../components/common/Loader/Loader";

import "./ManageUsers.scss";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin">
      <AdminSidebar />

      <main className="admin-content">
        <h2>Manage Users</h2>

        {loading ? (
          <Loader text="Loading users..." />
        ) : (
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
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
                ))
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
