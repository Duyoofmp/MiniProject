import React from 'react';
import Sidebar from '../components/Sidebar';

function Jst() {
    prompt("Enter information about the staff")
    
}
const ManageProducts = () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
             <div className='staff' >
                <h1 className='h2'>Products</h1>
                <input type="text" />
                <button>search</button>
                
                        
                </div>
                <button  className='b' onClick={Jst}>Add product</button>
            <table border={5} width={1000} cellPadding={20}>
                <tr height={70}>
                    <th>Number</th>
                    <th>name</th>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                <tr height={50}>
                    <td>1</td>
                    <td>Vlsi banglore</td>
                    <td>vlsi banglore</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>2</td>
                    <td>Vlsi kerala</td>
                    <td>vlsi kerala</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>3</td>
                    <td>banking</td>
                    <td>banking</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>4</td>
                    <td>finance</td>
                    <td>finance</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>5</td>
                    <td>fitness online chennai</td>
                    <td>fitness online chennai</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>6</td>
                    <td>fitness online mumbai</td>
                    <td>fitness online mumbai</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>7</td>
                    <td>sports centre</td>
                    <td>sports centre</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>8</td>
                    <td>gym centre delhi</td>
                    <td>gym centre delhi</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>9</td>
                    <td>gym centre banglore</td>
                    <td>gym centre banglore</td>
                    <td>nil</td>

                </tr>
                <tr height={50}>
                    <td>10</td>
                    <td>lab goa</td>
                    <td>lab goa</td>
                    <td>nil</td>

                </tr>
                 
            </table>
        </div>
        </Sidebar>
    );
};

export default ManageProducts;