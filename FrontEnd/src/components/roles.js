import React from 'react';
import {Grid, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


export default function Roles(){
    const gridStyle={position:"relative", margin:"200px 330px auto"}
    const grid2Style={position:"absolute", top:"200px",  right:"380px" }
    const buttonStyle={ height:'40vh', width:280, padding:"20"}
        
    return(
        <Grid>
            <Grid style={gridStyle}>
            <Button href="/Manager" id="manager" type="submit" color="primary" variant='contained' size="large" style={buttonStyle} startIcon={<PersonIcon />}>MANAGER</Button><br/>
            </Grid>
            <Grid style={grid2Style}>
            <Button href="/Employee" id="staff" type="submit" color="primary" variant='contained' size="large" style={buttonStyle} fontSize="large" startIcon={<PeopleAltIcon />}>STAFF</Button><br/>
            </Grid>
        </Grid>
    )
}

/*
*/