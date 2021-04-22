import React from "react";
import Loader from "react-loader-spinner";
import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className="loading-spinner__overlay">
      <Loader
        type="TailSpin"
        color="#0130a4"
        height={80}
        width={80}
        visible={props.isLoading}
      />
    </div>
  );
};

export default LoadingSpinner;
