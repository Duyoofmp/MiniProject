import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Formik, Form, Field} from 'formik';
import { publicGateway } from '../services/gateway';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ManagerLogin(){
    const navigate = useNavigate()
    const paperStyle={padding:20, height:'75vh', width:280, margin: "0 auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}
    const initialValues={ 
        username: '',
        password: ''
    }
    function MLogin(username, password){
        const postData ={
            name: username,
            password: password
            
        }
    
        publicGateway.post('/manager/LoginManager',postData)
        .then((res)=>{
            console.log(res)
            const resp = res
            localStorage.setItem("accessToken", resp)
            navigate("/Dashboard")
        })
        .catch((err)=>{
            console.log(err)
        })
    
    }
    return(
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>MANAGER LOGIN</h2>
                </Grid><br/>
                
                <Formik initialValues={initialValues} onSubmit={(values) => MLogin(values.username, values.password)}>
  {(props) => (
    <Form>
      <Field
        as={TextField}
        onChange={props.handleChange}
        value={props.values.username}
        id="outlined-basic"
        name="username"
        label="Username"
        placeholder="Enter Username"
        variant="outlined"
        fullWidth
        required
      />
      <br />
      <br />
      <Field
        as={TextField}
        onChange={props.handleChange}
        value={props.values.password}
        type="password"
        name="password"
        id="outlined-basic"
        label="Password"
        placeholder="Enter Password"
        variant="outlined"
        fullWidth
        required
      />
      <br />
      <Button type="submit" color="primary" variant="contained" style={buttonStyle} fullWidth>
        Login
      </Button>
      <br />
    </Form>
  )}
</Formik>

                
            </Paper>
        </Grid>
    )
}

