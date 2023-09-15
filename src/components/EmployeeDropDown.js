import React, { useState, useEffect } from 'react';
import '../css/EmployeeDropDown.css'
import DatePicker from './DatePicker';
import SearchBarHandle from './SearchBarHandle';

const EmployeeDropdown = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [ open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch employee data
    fetch('https://sweede.app/DeliveryBoy/Get-Employee/')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error('Error fetching employee data:', error));
  }, []);

  const handleClick = () => {
    setOpen(prev=> !prev)
  }

  const handleParentCheckboxChange = () => {
    setSelectAll(prev => !prev);
    if (!selectAll) {
      setSelectedEmployees(employeeData.map(employee => employee.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleCheckboxChange = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  return (
    <div className="container">
      <div className="employee-dropdown">
        <div className="container-2">
          <div className="count">{employeeData.length}</div>
          <div className="dropdown-icon" onClick={handleClick}>Search Employee</div>
        </div>
        {open &&  
        <div className="dropdown-content-emp">
          <SearchBarHandle />
            <div className="employee-category">
              All Employees ({employeeData.length})
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleParentCheckboxChange}
              />
            </div>
            {employeeData.map(employee => (
              <div className="employee-category" key={employee.id}>
                {employee.FirstName}
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </div>
            ))}
          </div>
        }
        
      </div>
        
        <div className="datepicker">
          <DatePicker />
        </div>
    </div>
  );
};

export default EmployeeDropdown;