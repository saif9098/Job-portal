import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../shared/Spinner";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth]= useAuth();
 
        useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        "https://career-jump-server.onrender.com/api/v1/user/admin-auth"
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

  return( ok ? children:(<Spinner/>)
  );;
  }

export default AdminRoute;
