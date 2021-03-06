import "./forgotPassword.css";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import ApiService from "../../services/ApiService";

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState(false);
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
    e.target.value ? setStatus(false) : setStatus(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { phoneNo: value };
    ApiService.forgotPwd(data)
      .then((res) => {
        console.log(res.data);
        setErrors(false);
        alert("Otp Sent");
        // alert("Password change successfully!");
        navigate("/forgotPassword/otpverify");
      })
      .catch((error) => {
        setErrors(true);
        console.log(error);
      });
  };
  return (
    <>
      <NavBar />
      <div id="forgotPassword" className="container-sm ">
        <h1 className="title text-center">Welcome</h1>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="phone number">Phone Number</Form.Label>
            <Form.Control
              pattern="[+91][0-9].{11}"
              isInvalid={errors}
              required
              id="phone number"
              type="text"
              name="phoneNo"
              placeholder="+919999999999"
              // pattern="[+91][0-9].{11}"
              title="enter phone number like +919999999999"
              maxLength={13}
              defaultValue={value}
              onChange={handleChange}
            />
          </Form.Group>
          {errors && (
            <p className="text-danger mb-1">
              Phone number do not match our records.
            </p>
          )}
          <Button onClick={handleSubmit} disabled={status} variant="success">
            Send OTP
          </Button>
          {"  "}
          <Button as={Link} to="/">
            Cancel
          </Button>
          <br />
          <Link to="/login">login</Link>
          {" / "} <Link to="/signup">Signup</Link>
        </Form>
      </div>
    </>
  );
}
