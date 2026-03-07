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
import { useTranslation } from 'react-i18next'

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
  
  const { t, i18n } = useTranslation()

  console.log("retrieved_data " , retrieved_data)
  //const retrieved_data = location.state;
  
  useEffect(() => {
      //generete_popup("La data a bien été generé");
      if (retrieved_data.language == "fr") {
          i18n.changeLanguage("fr");
      } else {
          i18n.changeLanguage("en");
          console.log("the page should be in english");
      }
      //generete_popup(t('La data a bien été generé'));
      
    }, []);

  function generete_popup(text:any) {
    const notify = () => toast.success(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
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
        <h1 className="nice_font">{t('Voici les statistiques de tes candidatures:')}</h1>
        
        <div className="spacer"></div>        
        
        {/* <h2 className="nice_font">tu as postulé à {retrieved_data.number_of_application} offres</h2> */}
        
        <h2 className="nice_font">{t('key1', { a: retrieved_data.number_of_application, b: retrieved_data.choosen_date1, c:retrieved_data.choosen_date2 })}</h2>     
        {/* <h2>{t('key1', { var1: retrieved_data.number_of_application, var2: retrieved_data.choosen_date1 , var3: retrieved_data.choosen_date2 })}</h2> */}
        

        <h2 className="nice_font">
          {t('key2', { 
            a: retrieved_data.first_application_date, 
            b: retrieved_data.last_application_date 
          })}
        </h2>


        <h2 className="nice_font">
          {t('key3', { 
            a: retrieved_data.number_of_application_ratio_per_day, 
            b: retrieved_data.number_of_day_between_first_and_last_application 
          })}
        </h2>

        <h2 className="nice_font">
          {t('key4', { 
            a: retrieved_data.number_of_application_ratio.weeks 
          })}
        </h2>

        <h2 className="nice_font">
          {t('key5', { 
            a: retrieved_data.number_of_application_ratio.months 
          })}
        </h2>

        <h2 className="nice_font">
          {t('key6', { 
            a: retrieved_data.number_of_application_ratio.years 
          })}
        </h2>
        <br></br>
        <h2 className="nice_font">{t('Les différentes statistiques sont accesibles par thémes situés au-dessus')}</h2>
        
      </div>
    );
  }

export default DataDisplay;

