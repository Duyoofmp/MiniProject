import React from 'react';
import Sidebar from '../components/Sidebar';

const AddContacts= () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            
            <form>
                <fieldset>
                <legend>Add contacts</legend>
                <label>Contact Name</label><br></br>
                <input type="text" required="required"/><br></br><br></br>
                <label>email</label><br></br>
                <input type="email" required="required" /><br></br><br></br>
                <label>Phone Number</label><br></br>
                <input type="text" required="required" /><br></br><br></br>
                <label>category</label><br></br>
                <select>
                    <option>yes</option>
                    <option>No</option>
                </select>
                <br></br><br></br>
                
                <input type="submit" />
                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};

export default AddContacts;
