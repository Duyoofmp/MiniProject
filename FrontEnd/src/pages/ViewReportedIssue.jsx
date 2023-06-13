import React from 'react';
import Sidebar from '../components/Sidebar';

const ViewReportedIssue = () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">
        
        <div>
            <div className='staff' >
                <h1 className='h2'> Reported Issues</h1>
            
                
                        
                </div>
                <div className='z'>

                </div>
            <table  border={5} width={1200} cellPadding={20} >
                <tr height={70}>
                    <th>No.</th>
                    <th>Issue</th>
                    <th>Reported By</th>
                    <th>Status</th>
                    
                </tr>
                <tr height={70}>
                    <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                    
                </tr>
                <tr height={70}>
                <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                </tr>
                <tr height={70}>
                <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                </tr>
                <tr height={70}>
                <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                </tr>
                <tr height={70}>
                <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                </tr>
                <tr height={70}>
                <td>1</td>
                    <td>Login Issue</td>
                    <td>Ihjas</td>
                    <td>
                        <select>
                            <option value="option1">Open</option>
                            <option value="option2">Close</option>
                            
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        </Sidebar>
    );
};

export default ViewReportedIssue;