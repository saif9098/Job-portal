import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../shared/Spinner";

const PrivateRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth]= useAuth();
 
        useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        "https://career-jump-server.onrender.com/api/v1/user/getUser"
      );
      console.log(data.ok)
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return( ok ? children:
    <>
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
    <Spinner/>
    </div>
    </>
  );
  }

export default PrivateRoute;
