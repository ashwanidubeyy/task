import React from 'react'
import EmployeeList from './EmployeeList';
import EmployeeDropdown from './EmployeeDropDown';

const Home = () => {
  return (
    <div>
        <div>
        {/* <h2>dropdown </h2> <span> Search employee  </span> <span> all employee -- every employee name with the  </span>  
        {/* when  clicked on search then only */}
        {/* <h1>Add Employee - this will redirect them to employee registration form</h1> */} 

        </div>

        <div className="employeeList">
            <EmployeeDropdown/>
            <EmployeeList />
        </div>

    </div>
  )
}

export default Home;