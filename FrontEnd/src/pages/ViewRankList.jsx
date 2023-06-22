import React from 'react';
import Sidebar from '../components/Sidebar';

const ViewRankList = () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            <div className='staff' >
                <h1 className='h2'> Rank Lists</h1>
            
                
                        
                </div>
                <div className='z'>

                </div>
            <table  border={5} width={1200} cellPadding={20} >
                <tr height={70}>
                    <th>Rank</th>
                    <th>Staff Name</th>
                    <th>Staff ID</th>
                    <th>Designation</th>
                    
                </tr>
                <tr height={70}>
                    <td>1</td>
                    <td>Thanveer</td>
                    <td>153</td>
                    <td>Team Coordinator</td>
                    
                </tr>
                <tr height={70}>
                    <td>2</td>
                    <td>Duyoof</td>
                    <td>353</td>
                    <td>Manager</td>
                </tr>
                <tr height={70}>
                    <td>3</td>
                    <td>Angel</td>
                    <td>53</td>
                    <td>Team Leader</td>
                </tr>
                <tr height={70}>
                    <td>4</td>
                    <td>Ihjaz</td>
                    <td>363</td>
                    <td>Asst Manager</td>
                </tr>
                <tr height={70}>
                    <td>5</td>
                    <td>Unni</td>
                    <td>100</td>
                    <td>Team member</td>
                </tr>
                <tr height={70}>
                    <td>6</td>
                    <td>Robin</td>
                    <td>523</td>
                    <td>Manager</td>
                </tr>
            </table>

        </div>
        </Sidebar>
    );
};

export default  ViewRankList;