import React,{useEffect,useState} from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,

} from '@material-ui/core';
import Table from './components/Table';
import {sortData} from './Util';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";


import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
  const [countries,setCountries]=useState([]);
  const[country,setCountry]=useState("worldwide"); 
  const[countryInfo,setCountryInfo]=useState([]);
  const[tableData,setTableData]=useState([]);
  const[mapCenter,setMapCenter]=useState({lat:34.80746 ,lng:-40.4796});
  const[mapZoom,setMapZoom]=useState(3);
  const[mapCountries,setMapCountries]=useState([]);
  useEffect(()=>{
    fetch(process.env.REACT_APP_COUNTRY_INFO) 
    .then(response=> response.json())
    .then(data=>{
      setCountryInfo(data);
      console.log(countryInfo)
    });
  },[])
  useEffect(()=>{
    const getCountriesData= async () => {
      await fetch(process.env.REACT_APP_COUNTRY_NAME)
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        const sortedData=sortData(data)
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
        console.log(countries);
      });
    }
    getCountriesData();

  },[]);
  const onCountryChange= async(event)=>{
          const countryCode= event.target.value;
          console.log('yoooooo', countryCode);
          
         const url= countryCode==='worldwide'? process.env.REACT_APP_COUNTRY_INFO:
         
         `${process.env.REACT_APP_COUNTRY_INFO}/${countryCode}`; 
          await fetch(url)
          .then((response)=>response.json())
          .then((data)=>{
            setCountry(countryCode);
             setCountryInfo(data);
             setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
             setMapZoom(4);
          });
  };  
  console.log('yeeeeeh',countryInfo); 
  return (
    <div className="App">
      <div className="app__left">
      <div className="App-header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className='form'>
        <Select variant='outlined'
        onChange={onCountryChange}
        value={country}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countries.map((country)=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      </div>
      <div className='stats'>
        <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

      </div>
       <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
      </div>
      <Card className='app__right'> 
         <CardContent>
           <h3>Live Cases by Country</h3>
           <Table countries={tableData} />
           <h3>Worldwide new cases</h3>
           <LineGraph />
           
         </CardContent>

      </Card>

    </div>
  );
}

export default App;
