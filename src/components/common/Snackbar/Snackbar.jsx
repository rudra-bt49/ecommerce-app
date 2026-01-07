import { useEffect } from "react";
import "./Snackbar.scss";

const Snackbar = ({
  message,
  type = "success",
  isOpen,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`snackbar snackbar--${type}`}>
      {message}
    </div>
  );
};

export default Snackbar;
