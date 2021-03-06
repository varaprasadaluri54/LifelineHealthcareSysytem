import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Col, Row, Tab } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import moment from "moment";
import DataSelection from "../dataSelection/DataSelection";
import Slot from "../slot/Slot";
import "./models.css";
import ApiService from "../../services/ApiService";
import SpinnerLoading from "../spinner/Spinner";

export default function Models(props) {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [slot, setSlot] = useState(false);
  const onChange = useCallback(
    (value) => {
      setValue(value);
      // console.log(value);
      if (value) {
        setSlot(true);
      } else {
        setSlot(false);
      }
    },
    [setValue]
  );

  const isHighlight = useCallback((date) => {
    let calenderDate = moment(date).format("YYYY-MM-DD");
    let status = false;
    data?.map((it) =>
      it.slotDate.includes(calenderDate) ? (status = true) : ""
    );
    return status;
  });
  const onClose = () => {
    setValue(new Date());
    setSlot(false);
  };

  const handleClose = () => {
    props.onHide();
    setValue(new Date());
    setSlot(false);
  };

  useEffect(() => {
    // console.log(moment(props.value).format("YYYY-M)M-DD");
    ApiService.getSlotDetails()
      .then((res) => {
        console.table(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered

      // scrollable
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="title">
          {`${props.data?.registrationEntity?.firstName} `}
          {props.data?.registrationEntity?.lastName} {props.data?.doctorName}
        </Modal.Title>
        <Button className="btnClose" onClick={handleClose}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        <form>
          {props.view === "patientdata" ? (
            <Row className="profiledata">
              <img
                className="profile-img"
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt="profile"
              />

              <div className="row">
                <div className="profile-head">
                  <h5 className="name">Patient Details</h5>
                  <h5 className="role"></h5>
                  <p className="profile-rating mt-3 mb-3"></p>
                  <Tabs
                    defaultActiveKey="about-us"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="about-us" title="About">
                      <Row>
                        <Col>
                          <p className="titleName">Patient name</p>
                        </Col>
                        <Col>
                          <p className="titleValue">
                            {`${props.data?.registrationEntity?.firstName} `}
                            {props.data?.registrationEntity?.lastName}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="titleName">Email</p>
                        </Col>
                        <Col>
                          <p className="titleValue">
                            {props.data?.registrationEntity?.username}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="titleName">Phone Number</p>
                        </Col>
                        <Col>
                          <p className="titleValue">
                            {props.data?.registrationEntity?.phoneNo}
                          </p>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <p className="titleName">Gender</p>
                        </Col>
                        <Col>
                          <p className="titleValue">
                            {props.data?.registrationEntity?.gender}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="titleName">Date of Birth</p>
                        </Col>
                        <Col>
                          <p className="titleValue">
                            {props.data?.registrationEntity?.dob}
                          </p>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Row>
          ) : (
            <Row className="profiledata">
              <Col xs={4}>
                <img
                  className="profile-img"
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt="profile"
                />

                <div className="row">
                  <div className="profile-head">
                    <h5 className="name">
                      {props.data.firstName} {props.data.lastName}
                    </h5>
                    <h5 className="role"></h5>
                    <p className="profile-rating mt-3 mb-3"></p>
                    <Tabs
                      defaultActiveKey="about-us"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="about-us" title="About">
                        <Row>
                          <Col>
                            <p className="titleName">Doctor name</p>
                          </Col>
                          <Col>
                            <p className="titleValue">
                              {props.data.doctorName}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className="titleName">Specialist</p>
                          </Col>
                          <Col>
                            <p className="titleValue">
                              {props.data.specialist}
                            </p>
                          </Col>
                        </Row>
                        {/* <Row>
                        <Col>
                          <p className="titleName">Payment method</p>
                        </Col>
                        <Col>
                          <p className="titleValue">{props.data.method}</p>
                        </Col>
                      </Row> */}
                        <Row>
                          <Col>
                            <p className="titleName">Fee</p>
                          </Col>
                          <Col>
                            <p className="titleValue">{props.data.amount}</p>
                          </Col>
                        </Row>

                        {/* <Row>
                        <Col>
                          <p className="titleName">Phone Number</p>
                        </Col>
                        <Col>
                          <p className="titleValue">{props.data.phoneNo}</p>
                        </Col>
                      </Row> */}
                        {/* <Row>
                        <Col>
                          <p className="titleName">Gender</p>
                        </Col>
                        <Col>
                          <p className="titleValue">{props.data.gender}</p>
                        </Col>
                      </Row> */}
                      </Tab>
                      {/* <Tab eventKey="time-line" title="Time Line">
                      <Row>
                        <Col>
                          <p className="titleName">Under construction</p>
                        </Col>
                        <Col>
                          <p className="titleValue">Under construction</p>
                        </Col>
                      </Row>
                    </Tab> */}
                    </Tabs>
                  </div>
                </div>
              </Col>
              {/* <Row>*/}
              <Col xs={8} className="slotSection">
                {isLoading ? (
                  <SpinnerLoading />
                ) : (
                  <>
                    <DataSelection
                      className="dateSelection"
                      value={value}
                      onChange={onChange}
                      isHighlight={isHighlight}
                    />
                    {slot ? <Slot value={value} data={data} /> : ""}
                  </>
                )}
              </Col>
              {/* </Row> */}
            </Row>
          )}
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
