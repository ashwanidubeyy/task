import React, { useState } from 'react'
import '../css/RegistrationForm.css'
import { useNavigate, useParams } from 'react-router';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    DOB: '',
    Study: '',
    StartDate: '',
    EndDate: '',
    CurrentSalary: '',
    Description: '',
  });
  const param = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.FirstName) {
      errors.FirstName = 'First Name is required';
    }
    if (!formData.LastName) {
      errors.LastName = 'Last Name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData); 
    
    if (validateForm()) {


        if(param.id){
            fetch(`https://sweede.app/DeliveryBoy/update-Employee/${param.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status === "success"){
                navigate('/')
            }
          });
        }

        else {

        // Send data to the API
        fetch('https://sweede.app/DeliveryBoy/Add-Employee/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status === "success"){
                navigate('/')
            }
          });
      }
    }
  };


  return (
    <>
        <h2 className='heading'>Employee Registration Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="name common">
        <div>
            <label htmlFor="FirstName">First Name*</label>
            <input
            type="text"
            id="FirstName"
            name="FirstName"
            placeholder='First Name'
            value={formData.FirstName}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="LastName">Last Name*</label>
            <input
            type="text"
            placeholder='Last Name'
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            />
        </div>
      </div>
      <div className='dateofbirth common'>
        <label htmlFor="DOB">Date of Birth</label>
        <input
          type="date"
          id="DOB"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
        />
      </div>
      <div className='study common'>
        <label htmlFor="Study">Study</label>
        <select
          id="Study"
          name="Study"
          placeholder='BE'
          value={formData.Study}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="BE">BE</option>
          <option value="MBBS">MBBS</option>
          <option value="BCOM">BCOM</option>
          <option value="MCA">MCA</option>
        </select>
      </div>
      <div className="date common">
        <div className='startdate'>
            <label htmlFor="StartDate">Start Date</label>
            <input
            type="date"
            pattern="\d{4}-\d{2}-\d{2}" 
            id="StartDate"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            />
        </div>
        <div className='enddate'>
            <label htmlFor="EndDate">End Date</label>
            <input
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            id="EndDate"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            />
        </div>
      </div>
      <div className='currentsalary common'>
        <label htmlFor="CurrentSalary">Current Salary</label>
        <input
          type="number"
          id="CurrentSalary"
          name="CurrentSalary"
          placeholder='300000'
          value={formData.CurrentSalary}
          onChange={handleChange}
        />
      </div>
      <div className='description common'>
        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          rows="10"
          cols="50"
        />
      </div>
      <div className="button common">
      <button type="button" className='btn-cancel'>Cancel</button>
      {param.id ? <button type="submit" className='btn'>Update</button> : <button type="submit" className='btn'>Save</button>}  
      </div>
    </form>
    </>
  );
};


export default RegistrationForm;