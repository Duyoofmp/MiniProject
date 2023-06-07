import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Dashboard.css'


const customerDetails = [
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"Duyoof", age:21, gender:"Male", contactNumber:1234567890,},
    {name:"qwe", age:20, gender:"Female", contactNumber:9876543210,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},
    {name:"ihjaz", age:22, gender:"Male", contactNumber:8943841214,},   
]
const Dashboard = () => {
    const divData = [
        { id: 1, label: '51' },
        { id: 2, label: '09' }, 
      ];
    
      const handleDivClick = (id) => {
        console.log(`Clicked div with ID ${id}`);
        // Add your logic here for handling the click event
      };
    return (
        <div>
            <h1 className='dashboard-heading'>Dashboard</h1>
            <div className='req-btn'>
                <button className="change-product-btn">Request to change Product</button>
            </div>
            <div className="options">
                {divData.map((item, index) => (
                    <Link to={`/new-page/${item.id}`} key={item.id}>
                        <div
                            className={`options-div div${item.id}`}
                            onClick={() => handleDivClick(item.id)}
                        >
                            <FontAwesomeIcon icon={faUser} size="3x" />
                            <h3>{item.label}</h3>
                            {index === 0 && <p> Customers contacted</p>}
                            {index === 1 && <p> Not contacted</p>}
                        </div>
                    </Link>
                ))}
            </div>
            
            <h3>Customer Details</h3>
            <div className = "customer-table" >
                
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact Number</th>
                    </tr>
                    {customerDetails.map((val, key)=>{
                        return(
                            <tr key = {key}>
                                <td>{val.name}</td>
                                <td>{val.age}</td>
                                <td>{val.gender}</td>
                                <td>{val.contactNumber}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
        
    );
};

export default Dashboard;