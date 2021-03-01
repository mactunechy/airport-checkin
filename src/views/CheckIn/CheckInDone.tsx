import React from "react";
import { Link } from "react-router-dom";

const CheckInDone = () => {
  return (
    <div
      className="align-items-center d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <h1>Your check-in is confirmed!</h1>
      <div className="mt-5">
        <Link to="/" className="btn btn-lg btn-warning">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CheckInDone;
