import "./Loader.scss";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <span className="loader" />
      <p>{text}</p>
    </div>
  );
};

export default Loader;
