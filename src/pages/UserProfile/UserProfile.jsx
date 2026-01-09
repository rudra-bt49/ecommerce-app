import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/user/user.service";

import Input from "../../components/common/Input/Input";
import Snackbar from "../../components/common/Snackbar/Snackbar";
import Loader from "../../components/common/Loader/Loader";

import ROUTES from "../../config/routes";
import "./UserProfile.scss";

const UserProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [initialPassword, setInitialPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);

        setUser(data);

        setForm({
          username: data.username,
          email: data.email,
          password: data.password || "",
          confirmPassword: "",
        });

        setInitialPassword(data.password || "");
      } catch {
        showSnackbar("Failed to load user profile", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordChanged = form.password !== initialPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordChanged && form.password !== form.confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      const payload = {
        username: form.username,
        email: form.email,
        ...(passwordChanged && { password: form.password }),
      };

      await updateUser(userId, payload);

      showSnackbar("Profile updated successfully");

      setTimeout(() => {
        navigate(ROUTES.PRODUCTS);
      }, 1200);
    } catch {
      showSnackbar("Failed to update profile", "error");
    }
  };

  if (loading) {
    return (
      <div className="profile__loader">
        <Loader text="Loading profile..." />
      </div>
    );
  }

  return (
    <section className="profile container">
      <h2 className="profile__title">My Profile</h2>

      <div className="profile__grid">
        <div className="profile__card">
          <h3>User Details</h3>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <form className="profile__form" onSubmit={handleSubmit}>
          <h3>Edit Details</h3>

          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {passwordChanged && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button className="btn btn--primary">
            Update Profile
          </button>
        </form>
      </div>

      <Snackbar
        isOpen={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </section>
  );
};

export default UserProfile;
