import React from 'react';
import Sidebar from '../components/Sidebar';

const ManageContatcs = () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
           
        <div className='staff' >
                <h1 className='h2'>contacts</h1>
                <input type="text" />
                <button>search</button>
                
                        
                </div>
        <table border={5} width={1000} cellPadding={20}>
                <tr height={70}>
                    <th>Costumer name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
                <tr height={50}>
                    <td>Raghu</td>
                    <td>28373</td>
                    <td>ndsdk@gmail.com</td>
                    <td>dlmd (h) ddjsd.cc</td>
                    <td>add</td>
                </tr>
            </table>
        </div>
        </Sidebar>
    );
};

export default ManageContatcs;
