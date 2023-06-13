import React from 'react';
import Sidebar from '../components/Sidebar';
import { NavLink } from 'react-router-dom';

import './b.css';

const Managestaff = () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">
        
        <div>
           
            <div className='staff' >
                <h1 className='h2'>staffs</h1>
                <input type="text" />
                <button>search</button>
                
                        
                </div>
                <NavLink to="/AddStaff" key={1} className="link" activeclassName="active">  <button  className='b' >Add Staffs</button>  </NavLink>

            <table border={5} width={1200} cellPadding={20}>
                <tr height={100}>
                    <th>no</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Staff Id</th>
                    <th>email</th>
                    <th>Country code</th>
                    <th>phone number</th>
                    <th>action</th>
                </tr>
                <tr height={70}>
                    <td>1</td>
                    <td>dhuyoof</td>
                    <td>manager</td>
                    <td>353</td>
                    <td>dhoop@asd</td>
                    <td>91</td>
                    <td>7388228812</td>
                </tr>
                <tr height={70}>
                    <td>2</td>
                    <td>ihjaz</td>
                    <td>Asst.manager</td>
                    <td>363</td>
                    <td>ihjaz@asd</td>
                    <td>91</td>
                    <td>9888228812</td>
                </tr>
                <tr height={70}>
                    <td>3</td>
                    <td>angel</td>
                    <td>Team leader</td>
                    <td>53</td>
                    <td>angel@asd</td>
                    <td>91</td>
                    <td>7388228887</td>
                </tr>
                <tr height={70}>
                    <td>4</td>
                    <td>thanveer</td>
                    <td>Team coordinator</td>
                    <td>153</td>
                    <td>tha@asd</td>
                    <td>91</td>
                    <td>6288228812</td>
                </tr>
                <tr height={70}>
                    <td>5</td>
                    <td>robin</td>
                    <td>manager</td>
                    <td>523</td>
                    <td>dhossp@asd</td>
                    <td>91</td>
                    <td>8647228812</td>
                </tr>
                <tr height={70}>
                    <td>6</td>
                    <td>unni</td>
                    <td>team member</td>
                    <td>300</td>
                    <td>unni@asd</td>
                    <td>91</td>
                    <td>7388228812</td>
                </tr>

            </table>
        </div>
        </Sidebar>
    );
};

export default Managestaff;