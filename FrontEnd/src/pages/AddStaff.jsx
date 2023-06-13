import React from 'react';
import Sidebar from '../components/Sidebar';

const AddStaff= () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            
            <form>
                <fieldset>
                <legend>Add Staff</legend>
                <label>Name</label><br></br>
                <input type="text" required="required"/><br></br><br></br>
                <label>Designation</label><br></br>
                <input type="text" required="required" /><br></br><br></br>
                <label>username</label><br></br>
                <input type="text" required="required" /><br></br><br></br>
                <label>Password</label><br></br>
                <input type="password" required="required" /><br></br><br></br>
                <label>Email</label><br></br>
                <input type="email" required="required" /><br></br><br></br>
                <label>Phone no</label><br></br>
                <input type="number" required="required" /><br></br><br></br>
                <input type="submit" />
                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};

export default AddStaff;
