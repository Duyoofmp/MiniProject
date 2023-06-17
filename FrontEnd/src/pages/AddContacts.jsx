import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';
import {  useNavigate } from 'react-router-dom';



const AddContact= () => {
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');

    const addContact=()=>{
        const contactData={
            Name:name,
            Email:email,
            PhoneNo:phoneNo,
            Address:address        }
        publicGateway.post('/manager/CreateStaff',contactData)
        .then((res)=>{
            console.log(res.data)
            if(res.data===true){
           alert("successfully added staff")
            }else{
           alert("Error occured")

            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="ManageProducts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            
            <form>
                <fieldset>
                <legend>Add Staff</legend>
                <label>Name</label><br></br>
                <input value={name} onChange={(e)=>{ setName(e.target.value)}} type="text" required="required"/><br></br><br></br>
                <label>Address</label><br></br>
                <input value={address} onChange={(e)=>{ setAddress(e.target.value)}} type="text" required="required" /><br></br><br></br>
                <label>Email</label><br></br>
                <input value={email} onChange={(e)=>{ setEmail(e.target.value)}} type="email" required="required" /><br></br><br></br>
                <label>Phone no</label><br></br>
                <input value={phoneNo} onChange={(e)=>{ setPhoneNo(e.target.value)}} type="number" required="required" /><br></br><br></br>
                <input onClick={addContact} type="button" value="submit" />
                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};

export default AddContact;
