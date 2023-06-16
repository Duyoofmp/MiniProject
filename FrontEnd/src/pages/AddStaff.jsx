import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';
import {  useNavigate } from 'react-router-dom';



const AddStaff= () => {
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');

    const addStaff=()=>{
        const staffData={
            Name:name,
            Email:email,
            PhoneNo:phoneNo,
            Designation:designation,
            Password:password
        }
        const token = localStorage.getItem('accessToken');
    console.log(token,"blaaaaa");
    publicGateway
      .post(
        '/manager/CreateStaff',
        staffData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      ) .then((res)=>{
            console.log(res.data)
            if(res.data===false){
           alert("Error occured")

            }else{
           alert("successfully added staff")
           window.location.reload();
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
                <input value={name} onChange={(e)=>{ setName(e.target.value)}} type="text" required/><br></br><br></br>
                <label>Designation</label><br></br>
                <input value={designation} onChange={(e)=>{ setDesignation(e.target.value)}} type="text" required /><br></br><br></br>
                <label>Password</label><br></br>
                <input value={password} onChange={(e)=>{ setPassword(e.target.value)}} type="password" required /><br></br><br></br>
                <label>Email</label><br></br>
                <input value={email} onChange={(e)=>{ setEmail(e.target.value)}} type="email" required /><br></br><br></br>
                <label>Phone no</label><br></br>
                <input value={phoneNo} onChange={(e)=>{ setPhoneNo(e.target.value)}} type="number" required /><br></br><br></br>
                <input onClick={addStaff} type="button" value="submit" />
                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};

export default AddStaff;
