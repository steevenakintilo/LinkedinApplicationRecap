import './home.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [min_date_choosen, setMin_date] = useState("");
  const [max_date_choosen, setMax_date] = useState("");
  const [min_date_to_choose_possible, setMin_date_possible_to_choose] = useState("");
  const [max_date_to_choose_possible, setMax_date_possible_to_choose] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    get_min_and_max_date_of_application();
  }, []);
  
  
  // linkedin_data
  function send_date_and_retrieve_data () {
    const blob2 = [min_date_choosen,max_date_choosen];
    
    console.log(blob2);
    fetch("http://127.0.0.1:8000/GenerateData", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body:JSON.stringify(blob2)
    })
    .then((response) => response.json())
    .then(linkedin_retrieved_data => {
      

       
      //console.log(Object.keys(linkedin_retrieved_data.jsonData).length)
      console.log("tototot " , linkedin_retrieved_data);
      console.log(typeof(linkedin_retrieved_data.jsonData))
      if (Object.keys(linkedin_retrieved_data.jsonData).length > 10) {
        alert("La data a bien été generé")
        navigate('/display_data',{state: linkedin_retrieved_data.jsonData});
        
      } else if (linkedin_retrieved_data.message === "Not enough data on the given date") {
        alert("Tu n'as postuler entre les 2 dates choisies, choisis en d'autre.")  
      } else {
        alert("Une erreur est apparue regénere la data.")
      }
    })
  }
  
    function get_min_and_max_date_of_application () {
      console.log("totot bog");

      fetch("http://127.0.0.1:8000/min_and_max_date_of_application")
        .then(response => response.json())
        .then(application_date_data => {

          setMin_date_possible_to_choose(application_date_data.jsonData.min)
          setMax_date_possible_to_choose(application_date_data.jsonData.max)
        
        })
        .catch(error => console.error("Fetch error:", error));
    };
    
    function handleDateChangeMin (event) {
      console.log("tototo");
      setMin_date(event.target.value)
    }

    function handleDateChangeMax (event) {
      console.log("tototo");
      setMax_date(event.target.value)
    }
    
    return (
      <div>
        <h1 className="toto">LinkedinApplicationRecap</h1>

        <h2 className="toto">Pour comprendre comment marche le site lis d'abord <a href={'https://github.com/steevenakintilo/LinkedinApplicationRecap'} target="_blank">ça</a> </h2>
        

        <input 
          type="date"
          name="start_date"
          value={min_date_choosen}
          min={min_date_to_choose_possible}
          max={max_date_to_choose_possible}
          onChange={handleDateChangeMin}
        />

        <input 
          type="date"
          name="end_date"
          value={max_date_choosen}
          min={min_date_to_choose_possible}
          max={max_date_to_choose_possible}
          onChange={handleDateChangeMax}
        />

        <button onClick={send_date_and_retrieve_data}>
          Génère la data
        </button>
      </div>
    );
  }

export default HomePage;

