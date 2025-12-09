import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/';
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [dispData, setDispData] = useState([])

  useEffect(() => {
    axios
      .get(`${url}/api/all`)
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
  }, []);

  const searchQuery = (event) => {
    const value = event.target.value;
    setQuery(value);
    setDispData(data.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase())));
    console.log(dispData);
  }

  return (
    <div>
      find countries <input onChange={searchQuery} value={query}/><br/>

      {dispData.length>10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {dispData.length<=10 && dispData.length>1 && (dispData.map(country => {
        return (
          <div key={country.name.common}>{
            country.name.common}
          </div>
        )
      }))}

      {dispData.length==1 && (
        () => {
          const filter = dispData[0];
          return(
            <div>
              <h1>{filter.name.common}</h1>
              <p>Capital {filter.capital}</p>
              <p>Area {filter.area}</p>

              <h2>Languages</h2>
              <ul>
                {Object.values(filter.languages).map((lang, ind) => <li key={ind}>{lang}</li>)}
              </ul>

              <img src={filter.flags.png} height="200px" width="200px"/>
            </div>
        )}
      )()}
    </div>
  );
};

export default App;