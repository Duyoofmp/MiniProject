import React, {useState} from "react";
import { Paper,Tabs, Tab, Box, Typography } from "@mui/material";
import ManagerLogin from "../components/managerLogin";
import ManagerSignup from "../components/managerSignup";


export default function ManagerSignInOut(){
    const [value,setValue]=useState(0)
    const handleChange = (event, newValue)=>{
        setValue(newValue);
    };
    const paperStyle={width:320, margin:"20px auto"}
    
    function TabPanel(props){
        const { children, value, index, ...other} = props;
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    return(
        <Paper elevation={10} style={paperStyle}>
            <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example" centered>
            <Tab label="SIGN UP" />
            <Tab label="LOGIN" />
            </Tabs>
            <TabPanel value={value} index={0}>
               <ManagerSignup/>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <ManagerLogin/>
            </TabPanel>
        </Paper>
    )
}