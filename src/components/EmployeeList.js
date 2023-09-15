import React, { useEffect, useState } from 'react'
import '../css/EmployeeList.css'
import { Link } from 'react-router-dom';

    const EmployeeList = () => {
        const [employees, setEmployees] = useState([]);
        const [loading, setLoading] = useState(true)
      
        useEffect(() => {
          fetch('https://sweede.app/DeliveryBoy/Get-Employee/')
            .then(response => response.json())
            .then(data => {setEmployees(data)
              setLoading(false)});

            
        }, []);

      
        const handleActionClick = (action, employee) => {
          if (action === 'view') {
            alert(`Viewing details for ${employee.FirstName}`);
          } else if (action === 'edit') {
            alert(`Editing details for ${employee.FirstName}`);
          }
        };

       

        const handleDelete = (id) => {
            // Send DELETE request to the API
            fetch(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`, {
              method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'success') {
                console.log(data)
                // Update the state after successful deletion
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
              } else {
                alert('Error deleting employee');
              }
            });
          };
      
        return (
            <>
            <div className='tophead'>
                <h1>Employee List</h1>
                <Link to="/register" className='button' >Add Employee</Link>
            </div>

            {loading ? <p style={{textAlign: "center"}}>Loading....</p> : 
             <div className="table-container">
             <table  className="employee-table">
               <thead>
                 <tr>
                   <th>Name</th>
                   <th>DOB</th>
                   <th>Start Date</th>
                   <th>End Date</th>
                   <th>Description</th>
                 </tr>
               </thead>
               <tbody>
                 {employees.map(employee => (
                   <tr key={employee.id}>
                     <td>{employee.FirstName + ' ' + employee.LastName}</td>
                     <td>{employee.DOB}</td>
                     <td>{employee.StartDate}</td>
                     <td>{employee.EndDate}</td>
                     <td id="desc">{employee.Description}</td>
                     <td>
                     <div className="action-dropdown">
                       <div className="action-dots"></div>
                           <div className="dropdown-content">
                           <div onClick={() => handleActionClick('view', employee)}>View</div>
                           <div><Link to={`/register/${employee.id}`} className='link'>Edit</Link></div>
                           <div onClick={() => handleDelete(employee.id)}>Delete</div>
                           </div>
                       </div>
                     </td>
                     
                     
                   </tr>
                 ))}
               </tbody>
             </table>
             </div>}
           
          </>
        );
    };
      

export default EmployeeList