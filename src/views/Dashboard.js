import React, { useState, useEffect } from "react";
import axios from "axios";
import {api, getToken } from "../Utils/Common.js"

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard(props) {
  return (
    <>
      {props.history.location.state.role == "teacher" ?
      <LayoutForTeacher/>
      :
      props.history.location.state.role == "admin" ?
      <LayoutForAdmin/>
      :
      <LayoutForPupil/>
      }
    </>
  );
}

function LayoutForAdmin (props) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [pupils, setPupils] = useState([]);
  useEffect(() => {
    getClasses();
    getSubjects();
    getUsers();
  }, [props.location])

  const getClasses = async () => {
    await axios.get(api + '/class/list', {
      headers: {
        Authorization: getToken()
      }
    })
    .then(response => {
      setClasses(response.data.length);
    }).catch(error => {

    })
  }

  const getSubjects = async () => {
    await axios.get(api + '/subject/list', {
      headers: {
        Authorization: getToken()
      }
    })
    .then(response => {
      setSubjects(response.data.length);
      let totalTest = 0;
      for(const subject of response.data){
        totalTest += subject.tests.length;
      }
      setTests(totalTest);
    }).catch(error => {

    })
  }

  const getUsers = async () => {
    await axios.get(api + '/user/list', {
      headers: {
        Authorization: getToken()
      }
    })
    .then(response => {
      // console.log(response.data);
      setUsers(response.data.length);
      setTeachers(response.data.filter(user => user.role == 'teacher').length);
      setPupils(response.data.filter(user => user.role == 'pupil').length);
    }).catch(error => {

    })
  }

  return (
    <Container fluid>
    <Row>
    <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-planet text-primary"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">班级</p>
              <Card.Title as="h4">{classes}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-spaceship text-success"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">科目</p>
              <Card.Title as="h4">{subjects}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-atom text-danger"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">测试</p>
              <Card.Title as="h4">{tests}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  </Row>

  <Row>
    <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-badge text-secondary"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">用户</p>
              <Card.Title as="h4">{users}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-audio-92 text-warning"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">教师</p>
              <Card.Title as="h4">{teachers}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  <Col lg="4" sm="6">
    <Card className="card-stats">
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center icon-warning">
              <i className="nc-icon nc-headphones-2 text-info"></i>
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">学生</p>
              <Card.Title as="h4">{pupils}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="far fa-calendar-alt mr-1"></i>
          Today
        </div>
      </Card.Footer>
    </Card>
  </Col>
  </Row>
  </Container>
  )
}

export default Dashboard;
