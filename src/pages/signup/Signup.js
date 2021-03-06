import "./Signup.css";

import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import NavBar from "../../components/navbar/Navbar";
import ApiService from "../../services/ApiService";

export default function Signup({ type }) {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // let confirmPassword;

  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password && data.password !== data.confirmPassword) {
      setErrors(true);
      return;
    }

    setErrors(false);
    console.log(data);
    if (type == "Doctor") {
      ApiService.addDoctor(data)
        .then((res) => {
          // console.log(res.data);
          alert("Doctor account add successfully!");
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "Nurse") {
      ApiService.addNurse(data)
        .then((res) => {
          // console.log(res.data);
          alert("Doctor account add successfully!");
          navigate("/user");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ApiService.register(data)
        .then((res) => {
          // console.log(res.data);
          alert("Registered successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (data.password && data.password !== data.confirmPassword) {
      setErrors(true);
      return;
    }
    setErrors(false);
  }, [errors]);
  return (
    <>
      {type ? (
        <>
          <div id="signup" className="container-sm ">
            <h1 className="title text-center">Create {type} account</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  name="username"
                  id="username"
                  required
                  type="text"
                  placeholder="Enter Username"
                  defaultValue={data.username}
                  onChange={handleChange}
                />
              </Form.Group>
              {type === "Doctor" ? (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="doctorName">Doctor name</Form.Label>
                  <Form.Control
                    name="doctorName"
                    id="doctorName"
                    required
                    type="text"
                    placeholder="Enter Doctor Name"
                    defaultValue={data.doctorName}
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : type === "Nurse" ? (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nurseName">Nurse name</Form.Label>
                  <Form.Control
                    name="nurseName"
                    id="nurseName"
                    required
                    type="text"
                    placeholder="Enter Nurse Name"
                    defaultValue={data.nurseName}
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : (
                ""
              )}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  // autoComplete="email"
                  required
                  type="email"
                  placeholder="name@gmail.com"
                  defaultValue={data.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 checkbox">
                <Form.Label>Gender : </Form.Label>{" "}
                <Form.Check
                  required
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Male";
                  }}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Female";
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone number">Phone Number</Form.Label>
                <Form.Control
                  id="phone number"
                  type="tel"
                  message="please enter correct number"
                  name="phoneNo"
                  title="enter phone number like +919999999999"
                  defaultValue={data.phoneNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                <Form.Control
                  name="dob"
                  id="dateOfBirth"
                  // required
                  type="date"
                  defaultValue={data.dob}
                  onChange={handleChange}
                />
              </Form.Group>
              {type === "Doctor" ? (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="speciality">Specialist</Form.Label>
                  <Form.Control
                    name="speciality"
                    id="speciality"
                    required
                    type="text"
                    placeholder="Enter speciality"
                    defaultValue={data.speciality}
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : type === "Nurse" ? (
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="depart">Department</Form.Label>
                  <Form.Control
                    name="depart"
                    id="depart"
                    required
                    type="text"
                    placeholder="Enter department"
                    defaultValue={data.depart}
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : (
                ""
              )}
              <Button className="btn-signup" type="submit">
                Signup
              </Button>{" "}
              <Button as={Link} to="/user" variant="danger">
                Cancel
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <>
          <NavBar />
          <div id="signup" className="container-sm ">
            <h1 className="title text-center">Create your account</h1>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label htmlFor="firstName">First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    id="firstName"
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue={data.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                  <Form.Label htmlFor="lastName">Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    id="lastName"
                    required
                    type="text"
                    placeholder="Last name"
                    defaultValue={data.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  name="username"
                  id="username"
                  required
                  type="text"
                  placeholder="Enter Username"
                  defaultValue={data.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  // autoComplete="email"
                  required
                  type="email"
                  placeholder="name@gmail.com"
                  defaultValue={data.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} className="mb-2">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    name="password"
                    id="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                    // minLength="8"
                    defaultValue={data.password}
                    onChange={handleChange}
                    // pattern="[0-9a-zA-Z][!@#$%^&*-?].{8,14}"
                  />
                </Form.Group>
                <Form.Group as={Col} className="mb-2">
                  <Form.Label htmlFor="confirmPassword">
                    Confirm Password
                  </Form.Label>

                  <Form.Control
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    type="password"
                    placeholder="Enter your password"
                    // minLength="8"
                    defaultValue={data.confirmPassword}
                    onChange={handleChange}
                    isInvalid={errors}
                    // pattern="^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$"
                  />
                  {errors && (
                    <p className="text-danger mb-1">Password do not match</p>
                  )}
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                <Form.Control
                  name="dob"
                  id="dateOfBirth"
                  required
                  type="date"
                  defaultValue={data.dob}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 checkbox">
                <Form.Label>Gender : </Form.Label>{" "}
                <Form.Check
                  required
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Male";
                  }}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  defaultValue={data.gender}
                  onChange={(e) => {
                    data.gender = "Female";
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone number">Phone Number</Form.Label>
                <Form.Control
                  // required
                  id="phone number"
                  type="tel"
                  // pattern="[+91][0-9]{13}"
                  // pattern="[0-9]{10}"
                  message="please enter correct number"
                  name="phoneNo"
                  // placeholder="+919999999999"
                  // pattern="[+91][0-9].{11}"
                  // maxLength={13}
                  title="enter phone number like +919999999999"
                  defaultValue={data.phoneNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="btn-signup" type="submit">
                Signup
              </Button>{" "}
              <Button as={Link} to="/" variant="danger">
                Cancel
              </Button>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
// https://stackoverflow.com/questions/67932967/form-validation-in-react-bootstrap-with-different-validation-conditions-for-each
// https://www.brainstormcreative.co.uk/react-js/react-bootstrap-form-part-2-validation-and-errors/
