import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <h1 className="">Page Not Found</h1>
    <Link className="btn btn-outline-primary btn-sm ms-4" to="/">
    Go Back
  </Link>
    </div>
    </>
   
  );
};

export default NotFound;
