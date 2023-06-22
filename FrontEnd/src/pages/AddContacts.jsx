
import React,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import { publicGateway } from '../services/gateway';


const AddContacts= () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

  
    const addContact = () => {
      const contactData = {
        Name:name,
        Email :email,
        PhoneNo:phoneNo
      };
      const token = localStorage.getItem('accessToken');
  
      publicGateway
        .post('/contact/CreateContacts', contactData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert('Error occurred');
          } else {
            alert('Successfully added contact');
            setName('');
            setEmail('');
            setPhoneNo('');

          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  

    return (
        <Sidebar name1="Dashboard" name2="ManageStaff" name3="ViewReportedIssue" name4="ManageContatcs" name5="Managecontacts" name6="ViewChangeRequest" name7="ViewRankList">

        <div>
            
            <form>
                <fieldset>
                <legend>Add contacts</legend>
                <label>Contact Name</label><br></br>
                <input value={name}
              onChange={(e) => setName(e.target.value)} type="text" required/><br></br><br></br>
                <label>email</label><br></br>
                <input value={email}
              onChange={(e) => setEmail(e.target.value)} type="email" required /><br></br><br></br>
                <label>Phone Number</label><br></br>
                <input value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)} type="text" required /><br></br><br></br>
                {/* <label>category</label><br></br>
                <select>
                    <option>yes</option>
                    <option>No</option>
                </select> */}
                <br></br><br></br>
            
                <input onClick={addContact} value="Submit" type="button" />

                <input type="reset" />

                </fieldset>
            </form>
        </div>
        </Sidebar>
    );
};


export default AddContacts
