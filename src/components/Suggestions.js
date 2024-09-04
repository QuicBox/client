import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';

function Suggestions({ searchTerm, onSelect }) {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState(null);

  // Updated dummy data with defined positive and negative post counts
  const dummyCompanies = [
    { id: 1, name: 'Apple Inc.', positivePostCount: 120, negativePostCount: 30 },
    { id: 2, name: 'Google LLC', positivePostCount: 85, negativePostCount: 20 },
    { id: 3, name: 'Microsoft Corporation', positivePostCount: 150, negativePostCount: 40 },
    { id: 4, name: 'Amazon.com, Inc.', positivePostCount: 200, negativePostCount: 50 },
    { id: 5, name: 'Facebook, Inc.', positivePostCount: 90, negativePostCount: 25 },
    { id: 6, name: 'Tesla, Inc.', positivePostCount: 110, negativePostCount: 35 },
    { id: 7, name: 'Netflix, Inc.', positivePostCount: 75, negativePostCount: 15 },
    { id: 8, name: 'Adobe Systems Incorporated', positivePostCount: 95, negativePostCount: 22 },
    { id: 9, name: 'IBM Corporation', positivePostCount: 130, negativePostCount: 45 },
    { id: 10, name: 'Intel Corporation', positivePostCount: 140, negativePostCount: 37 },
    { id: 11, name: 'Oracle Corporation', positivePostCount: 110, negativePostCount: 30 },
    { id: 12, name: 'Salesforce.com, Inc.', positivePostCount: 120, negativePostCount: 28 },
    { id: 13, name: 'SAP SE', positivePostCount: 100, negativePostCount: 20 },
    { id: 14, name: 'Uber Technologies, Inc.', positivePostCount: 140, negativePostCount: 33 },
    { id: 15, name: 'Twitter, Inc.', positivePostCount: 80, negativePostCount: 18 }
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Simulate fetching data
        // const response = await fetch('http://localhost:8080/organizations');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        // const data = await response.json();
        
        // Use dummy data instead of fetching
        const data = dummyCompanies;
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError(error.message);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchTerm, companies]);

  return (
    <div className="suggestions">
      <h5 className="text-secondary">Top Searched Companies</h5>
      {error ? (
        <p className="text-danger">Error: {error}</p>
      ) : filteredCompanies.length > 0 ? (
        <ul className="list-group">
          {filteredCompanies.map((company) => (
            <li
              key={company.id}
              className="list-group-item list-group-item-action"
              onClick={() => onSelect(company.name, company.id)} // Pass both name and id
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>{company.name}</span>
              <div>
              
                <Chip
                  label={`+${company.positivePostCount}`}
                  style={{ 
                    marginRight: '8px', 
                    backgroundColor: '#66bb6a', 
                    color: '#fff', 
                    fontSize: '12px', // Smaller font size
                    padding: '0px 7px' // Smaller padding
                  }}
                  
                />
                <Chip
                  label={`-${company.negativePostCount}`}
                  style={{ 
                    backgroundColor: '#ef5350', 
                    color: '#fff', 
                    fontSize: '12px', // Smaller font size
                    padding: '0px 7px' // Smaller padding
                  }}
                  variant="outlined"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No companies found.</p>
      )}
    </div>
  );
}

export default Suggestions;
  