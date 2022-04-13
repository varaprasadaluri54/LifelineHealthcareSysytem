import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Admin from "../../components/admin/Admin";

import NavBar from "../../components/navbar/Navbar";
import User from "../../components/user/User";
import ApiService from "../../Services/ApiService";

export default function Dashboard(props) {
  // console.log(props);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("Acess_Token"));
  const user = localStorage.getItem("user");
  const [data, setData] = useState("");
  const [role, setRole] = useState("");
  // console.log(user);
  useEffect(() => {
    ApiService.currentUser()
      .then((res) => {
        setData(res.data);
        setRole(res.data.authorities[0].authority);
        setIsLoading(false);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [role]);

  return (
    <>
      <NavBar />

      <div className="dashboard container">
        {isLoading ? (
          <h1>Loading…</h1>
        ) : token == undefined || token == null ? (
          <h3>
            Please login <Link to="/login">Login</Link>
          </h3>
        ) : role === "USER" ? (
          <User />
        ) : (
          <h1>Dashboard</h1>
        )}
      </div>
    </>
  );
}
