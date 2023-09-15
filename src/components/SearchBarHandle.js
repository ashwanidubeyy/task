import { useEffect, useState } from "react";
import '../css/SearchBar.css'

const SearchBarHandle = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [allData, setAllData] = useState([]);
    
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        fetch(`https://sweede.app/DeliveryBoy/Get-Employee/`)
        .then(response => response.json())
        .then(data => setAllData(data))
        .catch(error => console.error('Error fetching employee data:', error));
    },[])
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setSearchResults(allData.filter(item => item.FirstName.toLowerCase().includes(searchTerm)))
        if(e.target.value === ""){
            setSearchResults([])
        }
      };
  
    return (
      <div className="contianer">
        <div className="search-bar">
            <div className="search-icon">
                <i className="search"></i>
            </div>
            <input
                type="text"
                placeholder="Search for employee name..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
        <div className="search-results">
          {searchResults.map(employee => (
            <div className="employee-card" key={employee.id}>
              <h2>{employee.FirstName}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default SearchBarHandle;