import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import { Input, TextField } from '@mui/material';



const API_KEY = process.env.REACT_APP_API_KEY;



export default function Weather() {
    
    const [country,setCountry] = useState(null);
    const [region,setRegion] = useState(null);
    const [localTime,setLocalTime] = useState(null);
    const [location,setLocation] = useState(null);

    //location set by input

    // let country ;
    // let region;
    // let localTime;

    const handleSearch = (e)=>{
      // setLocation(e.target.value);
      let location = e.target.value;
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
      .then(response=>{
      console.log(response.data);
      setLocation(response.data.location.name);
      setCountry(response.data.location.country);
      setRegion(response.data.location.region);
      setLocalTime(response.data.location.localtime);
      // console.log(location);

      // console.log(country,region,localTime);
      
   })
   .catch((error)=>{
    console.log(error);
   });

    }

   

   function createData(Country, Region, LocalTime) {
    return {  Country, Region, LocalTime };
  }
  
  const rows = [
     
    createData(country,region,localTime),
  
  ];
  



  return (
    <TableContainer component={Paper}>
      <input        
         type="text"
         placeholder='Enter Location'
         onChange={handleSearch}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align='right'>Country</TableCell>
            <TableCell align="right">Region</TableCell>
            <TableCell align="right">Local Time</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={location}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >         
              <TableCell component="th" scope="row">
                {location}
              </TableCell>
              
              <TableCell align="right">{row.Country}</TableCell>
              <TableCell align="right">{row.Region}</TableCell>
              <TableCell align="right">{row.LocalTime}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
