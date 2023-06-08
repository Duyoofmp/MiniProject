
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaExclamation,
    FaCommentAlt,
    FaShoppingBag,
    FaChartBar,
    FaMale,
    FaAddressBook
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = (prop) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:prop.name1,
            icon:<FaTh/>
        },
        {
            path:"/"+prop.name2,
            name:prop.name2,
          
            icon:<FaMale/>
        },
        {
            path:"/"+prop.name3,
            name:prop.name3,
            icon:< FaExclamation/>
        },
        {
            path:"/"+prop.name4,
            name:prop.name4,
            icon:<FaAddressBook/>
        },
        {
            path:"/"+prop.name5,
            name:prop.name5,
            icon:<FaShoppingBag/>
        },
        
        {
            path:"/"+prop.name6,
            name:prop.name6,
          
            icon:<FaCommentAlt/>
        },
        
        {
            path:"/"+prop.name7,
            name:prop.name7,
            icon:<  FaChartBar/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h2 style={{display: isOpen ? "block" : "none"}} className="logo">Manager</h2>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
            <main>{prop.children}</main> 
        </div>
    );
};

export default Sidebar;