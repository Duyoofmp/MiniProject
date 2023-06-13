import React from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Formik, Form, Field} from 'formik';

export default function ManagerLogin(){
    const paperStyle={padding:20, height:'75vh', width:280, margin: "0 auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}
    const initialValues={ 
        username: '',
        password: ''
    }
        
    return(
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>MANAGER LOGIN</h2>
                </Grid><br/>
                <Formik initialValues={initialValues} >
                    {(props)=>(
                        <Form>
                            
                            <Field as={TextField} id="outlined-basic" name="username" label="Username" placeholder='Enter Username' variant="outlined"  fullWidth required/><br/><br/>
                            <Field as={TextField} type="password" name="password" id="outlined-basic" label="Password" placeholder='Enter Password' variant="outlined"  fullWidth required/>
                            <br/>
                            <Button href="/" type="submit" color="primary" variant='contained' style={buttonStyle} fullWidth>Login</Button><br/>
                
                        </Form>
                    )}
                </Formik>
                
            </Paper>
        </Grid>
    )
}