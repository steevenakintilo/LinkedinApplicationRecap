import './home.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Totos = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     startDate: "",
  //     endDate: "",
  //     minDate: null,
  //     maxDate: null,
  //     linkedinData:null
  //   };
    
  // }

  // const handleStartDateChange = (event) => {
  //   this.setState({ startDate: event.target.value });
  // };

  // const handleEndDateChange = (event) => {
  //   this.setState({ endDate: event.target.value });
  // };

  // const testfunction = () => {
  //   console.log("Start date:", this.state.startDate);
  //   console.log("End date:", this.state.endDate);

  // };

  
  // const get_min_and_max_date_of_application = () => {
  //   console.log("totot bog");

  //   fetch("http://127.0.0.1:8000/min_and_max_date_of_application")
  //     .then(response => response.json())
  //     .then(application_date_data => {

  //       //console.log("FULL RESPONSE:", application_date_data);

  //       // Save full response
  //       this.setState({ 
  //         minDate: application_date_data.jsonData.min,
  //         maxDate: application_date_data.jsonData.max 
        
  //       } , 
  //       () => console.log("STATE updated:", this.state.minDate)
  //     );

  //       // Example: access nested JSON
  //       //console.log("MIN DATE:", application_date_data.jsonData.min);
  //       // Save nested data separately
  //       // this.setState({ data: application_date_data.jsonData });
  //     })
  //     .catch(error => console.error("Fetch error:", error));
  // };
  
  
  // const send_date_and_retrieve_data = () => {
  //   const blob = {"start_date":this.state.startDate,"end_date":this.state.endDate};
  //   const blob2 = [this.state.startDate,this.state.endDate];
    
  //   console.log(blob2);
  //   fetch("http://127.0.0.1:8000/GenerateData", {
  //       method: 'POST',
  //       headers: {"Content-Type" : "application/json"},
  //       body:JSON.stringify(blob2)
  //   })
  //   .then((response) => response.json())
  //   .then(linkedin_retrieved_data => {
  //     this.setState(
  //       {linkedinData:linkedin_retrieved_data.jsonData}
  //     )
  //     // console.log("tototot " , this.state.linkedinData.number_of_application);
  //     console.log("tototot " , linkedin_retrieved_data);
  //     if (linkedin_retrieved_data.message === "Data processed well") {
  //       alert("La data a bien été generé")
  //       // Change page and send the data/keep it to the next page
        
  //     } else if (linkedin_retrieved_data.message === "Not enough data on the given date") {
  //       alert("Tu n'as postuler entre les 2 dates choisies, choisis en d'autre.")  
  //     } else {
  //       alert("Une erreur est apparue regénere la data.")
  //     }
  //   })
  // }
    
  // const componentDidMount() {
  //   this.get_min_and_max_date_of_application();
  // }

    return (
      <div>
        <h1 className="toto">LinkedinApplicationRecap</h1>

        {/* <h2 className="toto">Pour comprendre comment marche le site lis d'abord <a href={'https://github.com/steevenakintilo/LinkedinApplicationRecap'} target="_blank">ça</a> </h2> */}
        
        {/* <input 
          type="date"
          name="start_date"
          value={this.state.startDate}
          min={this.state.minDate}
          max={this.state.maxDate}
          onChange={this.handleStartDateChange}
        />

        <input 
          type="date"
          name="end_date"
          min={this.state.minDate}
          max={this.state.maxDate}
          value={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
        <button onClick={this.send_date_and_retrieve_data}>
          Génère la data
        </button> */}
        {/* <p>{this.state.linkedinData}</p> */}
      </div>
    );
  }

export default Totos;

