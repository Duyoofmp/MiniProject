import {React,useState} from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { publicGateway } from '../services/gateway';
import {  useNavigate } from 'react-router-dom';

export default function ManagerSignup(){
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle={padding:20, height:'75vh', width:280, margin: "0 auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}

    function MSigup(){
        const postData ={
            Name: name,
            Email: email,
            PhoneNo: "+91"+mobileNumber,
            Password: password,

            
        }
        console.log(postData)
        publicGateway.post('/manager/CreateManager',postData)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem("accessToken", res.data.token)
            if(res.data.token!==undefined){
            return  navigate("/Dashboard")
            }
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
                    <h2>MANAGER SIGN UP</h2>
                </Grid>
                <TextField value={name}
          onChange={(e)=>{ setName(e.target.value)}} id="outlined-basic" label="Name" placeholder='Enter Name' variant="outlined"  fullWidth required/><br/><br/>
                <TextField value={email}
          onChange={(e)=>{ setEmail(e.target.value)}} type="email" id="outlined-basic" label="Email" placeholder='Enter email' variant="outlined"  fullWidth required/><br/><br/>
                <TextField value={mobileNumber}
          onChange={(e)=>{ setMobileNumber(e.target.value)}} type="tel" id="outlined-basic" label="Mobile" placeholder='Enter Mobile number' variant="outlined"  fullWidth required/><br/><br/>
                <TextField value={password}
          onChange={(e)=>{ setPassword(e.target.value)}} id="outlined-basic" label="Password" placeholder='Enter Password' variant="outlined"  fullWidth required/><br/>

            
                <Button type="submit" onClick={MSigup} color="primary" variant='contained' style={buttonStyle} fullWidth>SignUp</Button><br/>
                
                
            </Paper>
        </Grid>
    )
}