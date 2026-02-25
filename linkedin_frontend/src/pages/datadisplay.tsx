import './home.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router-dom';


const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const location = useLocation();
  const toto = location.state;
  console.log("yiii 1")
  console.log(toto)
  console.log("yiii 2")
  console.log(toto.number_of_application)
    return (
      <div>
        <h1 className="toto">CACAPOPOTOTO</h1>
        <h1>{toto.number_of_application}</h1>
      </div>
    );
  }

export default DataDisplay;

