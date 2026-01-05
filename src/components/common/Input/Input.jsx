import "./Input.scss";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={error && touched ? "input-error" : ""}
      />

      {error && touched && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
