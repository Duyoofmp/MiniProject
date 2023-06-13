import React from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ManagerSignup(){
    const paperStyle={padding:20, height:'75vh', width:280, margin: "0 auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}
    return(
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>MANAGER SIGN UP</h2>
                </Grid>
                <TextField id="outlined-basic" label="Name" placeholder='Enter Name' variant="outlined"  fullWidth required/><br/><br/>
                <TextField type="email" id="outlined-basic" label="Email" placeholder='Enter email' variant="outlined"  fullWidth required/><br/><br/>
                <TextField type="tel" id="outlined-basic" label="Mobile" placeholder='Enter Mobile number' variant="outlined"  fullWidth required/><br/><br/>
                <TextField id="outlined-basic" label="Username" placeholder='Enter Username' variant="outlined"  fullWidth required/><br/><br/>
                <TextField id="outlined-basic" label="Password" placeholder='Enter Password' variant="outlined"  fullWidth required/><br/>

            
                <Button type="submit" href="/" color="primary" variant='contained' style={buttonStyle} fullWidth>SignUp</Button><br/>
                
                
            </Paper>
        </Grid>
    )
}