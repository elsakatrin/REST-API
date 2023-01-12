import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from "react-router-dom";
export default function EditStudent () {

  const [name, setName] = useState("");
  const [email, setEmail] = useState ("");
  const [rollno, setRollno] = useState("");
  const {id} = useParams();
  useEffect (()=> {

    axios.get('https://rest-api-backend.vercel.app/students/edit-student/' + id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
  });

  function onChangeStudentName(e) {
    setName(e.target.value )
  }
  function onChangeStudentEmail(e) {
    setEmail(e.target.value)
  }
  function onChangeStudentRollno(e) {
    setRollno(e.target.value)
  }
  function onSubmit(e) {
    e.preventDefault()
    const studentObject = {
      name,
      email,
      rollno
    };
    axios.put('https://rest-api-backend.vercel.app/students/update-student/' + id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Student List 
    this.props.history.push('/student-list')
  }

  
    return (<div className="form-wrapper">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={onChangeStudentName} />
        </Form.Group>
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={onChangeStudentEmail} />
        </Form.Group>
        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={rollno} onChange={onChangeStudentRollno} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
