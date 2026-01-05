import { createPortal } from "react-dom";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input/Input";
import { signupSchema } from "../../../utils/validation/signupSchema";
import { register } from "../../../services/auth/auth.service";
import "./SignUp.scss";

const SignUp = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return createPortal(
    <div className="signup-overlay" onClick={handleClose}>
      <div
        className="signup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Create Account</h2>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const payload = {
                email: values.email,
                username: values.username,
                password: values.password,
                // name: {
                //   firstname: values.username,
                //   lastname: "User",
                // },
                // address: {
                //   city: "NA",
                //   street: "NA",
                //   number: 1,
                //   zipcode: "00000",
                //   geolocation: {
                //     lat: "0",
                //     long: "0",
                //   },
                // },
                // phone: "9999999999",
              };

              await register(payload); //api call

              resetForm();
              onClose();
              navigate("/login"); 
            } catch (error) {
              console.error("Signup failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="signup-form">
              <Input
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              <div className="actions">
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
};

export default SignUp;
