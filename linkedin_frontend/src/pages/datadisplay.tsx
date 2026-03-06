import './home.css'
import React from 'react';
import { data, useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import Custom_navbar from "./navbar.tsx"


//import { AgCharts } from 'ag-charts-react';
import { AgCharts } from 'ag-charts-react';


import { blue } from '@mui/material/colors';
import { ToastContainer, toast } from 'react-toastify';
import {generate_list,generate_list_of_dict2,generate_list_of_dict,generate_random_colour,go_to_detailed_stat_page,make_a_graphic,make_a_graphic2,make_a_graphic3, make_navbar_element} from "../utility_function/utility_function.tsx"

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
  
  //const retrieved_data = location.state;
  
  useEffect(() => {
      generete_popup("La data a bien été generé");
    }, []);

  function generete_popup(text:string) {
    const notify = () => toast.success(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });;
    notify()
  }
  
  //console.log(retrieved_data)
  
  const navigate = useNavigate();
  

  function go_to_detailed_stat_page(value_list:any,occurence_list:any,ratio_list:any,len_of_list:any) {
    //navigate('/detailed_stat',{state: [value_list,occurence_list,ratio_list,retrieved_data,len_of_list]});
    localStorage.setItem(
      "detailed_data",
      JSON.stringify([value_list, occurence_list, ratio_list, retrieved_data, len_of_list])
    );

    window.open('/detailed_stat', '_blank');
  }
  
  function send_data_to_localstorage() {
    localStorage.setItem(
      "detailed_data",
      JSON.stringify(retrieved_data)
    );

  }

  let navbar_data_display = make_navbar_element(retrieved_data,true)
  
  send_data_to_localstorage()



  //<a className="navbar-brand navbar_text_color " aria-current="page" href="/"> fjofjkopzfpozf</a>

    // let all_company_list = generate_list(retrieved_data.all_company);

    return (
      <div>
        <ToastContainer />
        {Custom_navbar(1,navbar_data_display)}
        <header>
        </header>
        <h1 className="nice_font">Voici les statistiques de tes candidatures:</h1>
        
        <div className="spacer"></div>        
        
        {/* <h2 className="nice_font">tu as postulé à {retrieved_data.number_of_application} offres</h2> */}
        
        <h2 className="nice_font">Tu as postulé à {retrieved_data.number_of_application} offres entre {retrieved_data.choosen_date1} et {retrieved_data.choosen_date2}</h2>
        <h2 className="nice_font">Ta premiére candidature date du {retrieved_data.first_application_date} et la dernière du {retrieved_data.last_application_date}</h2>
        <h2 className="nice_font">Ce qui fait une moyenne d'environ {retrieved_data.number_of_application_ratio_per_day} candidature(s) par jour depuis {retrieved_data.number_of_day_between_first_and_last_application} jours</h2>
        <h2 className="nice_font">Environ {retrieved_data.number_of_application_ratio.weeks} candidatures par semaine</h2>
        <h2 className="nice_font">Environ {retrieved_data.number_of_application_ratio.months} candidatures par mois</h2>
        <h2 className="nice_font">Environ {retrieved_data.number_of_application_ratio.years} candidatures par année</h2>
        <br></br>     
        <h2 className="nice_font">Les différentes statistiques sont accesibles par thémes situés au-dessus</h2>
        
      </div>
    );
  }

export default DataDisplay;

