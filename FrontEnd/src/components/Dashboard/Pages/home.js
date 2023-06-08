import React from 'react';
import MiniDrawer from '../Sidebar.tsx';
import Box from '@mui/material/Box';

export default function Home(){
    return(
    <>
        <Box sx={{ display: 'flex' }}>
        <MiniDrawer/>
        <h1>Home</h1>
        </Box>
    
    </>
    );
}