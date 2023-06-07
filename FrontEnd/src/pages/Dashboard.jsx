import React from 'react';
import './a.css';
import Sidebar from '../components/Sidebar';
const Dashboard= () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">
        <div>
            <marquee>welcome manager</marquee>
            <div class="a">
                <h1 class="h1" >Dashboard</h1>
                <input type="date"></input>
                <input type="search"></input>
                <button>search</button>
            </div>
            <table border={5} width={1200} cellPadding={20}>
                <tr  height={30}>
                    <th>Staff name</th>
                    <th>Designation</th>
                    <th>email</th>
                    <th>Total</th>
                    <th>Finished</th>
                    <th>Not Finished</th>
                </tr>
                <tr height={70} >
                    <td>dhuyoof</td>
                    <td>manager</td>
                    <td>dhoop@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr height={70}>
                    <td>ihjaz</td>
                    <td>Asst.manager</td>
                    <td>ihjaz@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr height={70}>
                    <td>angel</td>
                    <td>team leader</td>
                    <td>angel@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr height={70}>
                    <td>thanveer</td>
                    <td>team coordinator</td>
                    <td>tha@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr height={70}>
                    <td>robin</td>
                    <td>manager</td>
                    <td>dhossp@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr height={70}>
                    <td>unni</td>
                    <td>team member</td>
                    <td>unni@asd</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </table>

        </div>
        </Sidebar>
    );
};

export default Dashboard;
