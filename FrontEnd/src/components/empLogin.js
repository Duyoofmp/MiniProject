import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function EmpLogin(){
    const paperStyle={padding:20, height:'70vh', width:280, margin: "80px auto"}
    const avatarStyle={backgroundColor:'#1c54b2'}
    const buttonStyle={margin: "14px 0px"}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <br/><Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>STAFF LOGIN</h2>
                </Grid><br/>
                <TextField id="outlined-basic" label="Username" placeholder='Enter Username' variant="outlined"  fullWidth required/><br/><br/>
                <TextField type="password" id="outlined-basic" label="Password" placeholder='Enter Password' variant="outlined"  fullWidth required/>
                <br/>
                <Button type="submit" color="primary" variant='contained' style={buttonStyle} fullWidth>Login</Button><br/>
                
                <Typography variant='subtitle2'>Doesn't have an account yet?  
                <Link href="#"> Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}