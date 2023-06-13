import React from 'react';
import Sidebar from '../components/Sidebar';

const AddProduct= () => {
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            
            <form>
                <fieldset>
                <legend>Add Products</legend>
                <label>Product Name</label><br></br>
                <input type="text" required="required"/><br></br><br></br>
                <label>Description</label><br></br>
                <input type="text area" required="required" /><br></br><br></br>
                
                <input type="submit" />
                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};

export default AddProduct;
