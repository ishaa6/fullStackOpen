import { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './weather'

const App = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/';
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [dispData, setDispData] = useState([])
  const [selected, setSelected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);

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

  const dispCountry = (name) => {
    setSelected(true);
    console.log(name);
    setSelectedCountry(dispData.find(country => country.name.common === name));
  }

  return (
    <div>
      find countries <input onChange={searchQuery} value={query}/><br/>

      {!selected && (
        <>
          {dispData.length>10 && (
            <p>Too many matches, specify another filter</p>
          )}

          {dispData.length<=10 && dispData.length>1 && (dispData.map(country => {
            return (
              <div key={country.name.common}>
                {country.name.common} <button onClick={()=>dispCountry(country.name.common)}>show</button>
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
        </>
      )}

      {selected && (
        <>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital {selectedCountry.capital}</p>
          <p>Area {selectedCountry.area}</p>

          <h2>Languages</h2>
          <ul>
              {Object.values(selectedCountry.languages).map((lang, ind) => <li key={ind}>{lang}</li>)}
          </ul>

          <img src={selectedCountry.flags.png} height="200px" width="200px"/>

          <Weather city={selectedCountry.capital[0]}/>
        </>
      )}
    </div>
  );
};

export default App;