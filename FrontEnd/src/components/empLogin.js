import React,{useState}from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { publicGateway } from '../services/gateway';
import {  useNavigate } from 'react-router-dom';



export default function EmpLogin(){
    const navigate = useNavigate()

    const paperStyle={padding:20, height:'70vh', width:280, margin: "80px auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const SLogin=()=>{
        const postData ={
            Email: email,
            Password: password
            
        }
        publicGateway.post('/staff/LoginStaff',postData)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem("accessToken", res.data)
            if(res.data!==false){
            return  navigate("/staffdashboard")
            }else{
             return alert("invalid credentials!!")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
      }
  
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <br/><Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>STAFF LOGIN</h2>
                </Grid><br/>
                <TextField value={email}
          onChange={(e)=>{ setEmail(e.target.value)}} id="outlined-basic" label="Username" placeholder='Enter Username' variant="outlined"  fullWidth required/><br/><br/>
                <TextField value={password}
          onChange={(e)=>{ setPassword(e.target.value)}}type="password" id="outlined-basic" label="Password" placeholder='Enter Password' variant="outlined"  fullWidth required/>
                <br/>
                <Button onClick={SLogin} type="submit" color="primary" variant='contained' style={buttonStyle} fullWidth>Login</Button><br/>
                
                <Typography variant='subtitle2'>Doesn't have an account yet?  
                <Link href="#"> Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}