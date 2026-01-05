import { createPortal } from "react-dom";
import { useFormik } from "formik";

import Input from "../../common/Input/Input";
import { login } from "../../../services/auth/auth.service";

import "./Login.scss";

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await login(values);
        const { token } = response;

        // Store token
        localStorage.setItem("token", token);

        // 🔥 Notify Navbar immediately
        window.dispatchEvent(new Event("auth-changed"));

        resetForm();
        onClose(); // close modal
      } catch (error) {
        setErrors({
          password: "Invalid username or password",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return createPortal(
    <div className="login-overlay" onClick={onClose}>
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Login</h2>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <Input
            label="Username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.username}
            touched={formik.touched.username}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <div className="login-actions">
            <button
              type="button"
              className="btn btn--outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Login;
