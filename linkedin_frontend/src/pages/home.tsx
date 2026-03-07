import './home.css'

import { useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { ToastContainer, toast } from 'react-toastify';
import Custom_navbar from "./navbar.tsx"
import {add_space} from "../utility_function/utility_function.tsx"
import { useTranslation } from 'react-i18next'


polyfillCountryFlagEmojis();

const HomePage = () => {
  const [min_date_choosen, setMin_date] = useState("");
  const [max_date_choosen, setMax_date] = useState("");
  const [min_date_to_choose_possible, setMin_date_possible_to_choose] = useState("");
  const [max_date_to_choose_possible, setMax_date_possible_to_choose] = useState("");
  const navigate = useNavigate();
  const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
  //console.log("local storage "  , retrieved_data)
  useEffect(() => {
    get_min_and_max_date_of_application();
    if (retrieved_data.language == "fr") {
    i18n.changeLanguage("fr");
    } else {
        i18n.changeLanguage("en");
        console.log("the page should be in english");
    }

  }, []);

  
  const { t, i18n } = useTranslation()

  function Toto(blabla:string) {
    return <h1>{blabla}</h1>
  }
  function generete_popup(text:string) {
      const notify = () => toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });;
      notify()
  }
  // linkedin_data

  function send_date_and_retrieve_data () {
    
    let blob2 = [min_date_choosen,max_date_choosen];
    
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
      console.log("kporkgokgopkrgopekrpgke" , linkedin_retrieved_data.message)
      
      

      //let language = {"language": "french"}
      if (Object.keys(linkedin_retrieved_data.jsonData).length > 10) {
        // alert("La data a bien été generé")
        //generete_popup("La data a bien été generé");
        
        let dataList = [linkedin_retrieved_data.jsonData]
        let language = {"language": i18n.language}
        dataList.push(language)
        linkedin_retrieved_data.jsonData.language = i18n.language
        localStorage.setItem(
        "detailed_data",
          JSON.stringify(linkedin_retrieved_data.jsonData),
        );
        
        navigate('/display_data');
        //navigate('/display_data',{state: linkedin_retrieved_data.jsonData});
        
      } else if (linkedin_retrieved_data.message === "Not enough data on the given date") {
//        alert("Tu n'as postuler entre les 2 dates choisies, choisis en d'autre.")

        generete_popup(t("Tu n'as postuler entre les 2 dates choisies, choisis en d'autre."))
      } else if (linkedin_retrieved_data.message === "date1 bigger than date2") {
//        alert("La date 1 doit être plus petite que la date2.")
        generete_popup(t("La date 1 doit être plus petite que la date2."))
      } else if (linkedin_retrieved_data.message === "same date") {
//        alert("Les 2 dates doivent être différentes.")
        generete_popup(t("Les 2 dates doivent être différentes."))
      } else {
 //       alert("Une erreur est apparue regénere la data.")
        generete_popup(t("Une erreur est apparue regénere la data."))
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
    
    function change_lang() {
      i18n.changeLanguage("en");
    }
    function change_language(event:any, language:string) {
      if (language == "en") {
          console.log("language to english")
          i18n.changeLanguage("en");
      }   

      if (language == "fr") {
          console.log("language to french")
          i18n.changeLanguage("fr");
      }     
    }

    return (
      <div className="backgroundcolour">
        
        <nav className="navbar navbar-expand-lg  navbarBGcolor fixed-top navbar_color">
          <div className="container-fluid">
              <a className="navbar-brand navbar_text_color" href="/">LinkedinApplicationRecap</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle navbar_text_color" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {t('Langue')}
                  </a>
                  <ul className="dropdown-menu">
                      <li><a className="flag_button dropdown-item" onClick={(event) => change_language(event,"en")} href="#">🇬🇧</a></li>
                      <li><a className="flag_button dropdown-item" onClick={(event) => change_language(event,"fr")} href="#">🇫🇷</a></li>
                  </ul>
                  </li>
              </ul>
              </div>
          </div>
        </nav>
      
        {/* {toto_nav()} */}
        {/* <Custom_navbar/> */}
        {/* {Custom_navbar()} */}


        {add_space(3)}        
        <h1 className="nice_font">{t('Pour avoir les statistiques de tes candidatures choisis 2 dates différentes.')}</h1> 
        <h1 className="nice_font">{t('Le site va ensuite afficher les statistiques entres les 2 dates choisis.')}</h1> 

        {add_space(1)}
        
        <h1 className="nice_font">{t('Si tu veux les statistiques depuis ta premiére candidature choisit aucune date.')}</h1> 

        {add_space(5)}
        <input 
          className="date_input"
          type="date"
          name="start_date"
          value={min_date_choosen}
          min={min_date_to_choose_possible}
          max={max_date_to_choose_possible}
          onChange={handleDateChangeMin}
        />

        <input
          className="big_date_input" 
          type="date"
          name="end_date"
          value={max_date_choosen}
          min={min_date_to_choose_possible}
          max={max_date_to_choose_possible}
          onChange={handleDateChangeMax}
        />

        {add_space(3)}

        {/* <button className="flag_button">🇬🇧</button> */}

        {add_space(5)}        
        
        

        {/* <button className="flag_button dropdown-item">🇬🇧</button>
        <button className="flag_button dropdown-item">🇫🇷</button> */}
         
        <button onClick={send_date_and_retrieve_data} type="button" className="btn btn-secondary btn-lg position-absolute top-50 start-50 translate-middle">{t('Génére la data')}</button>
         
        
        <ToastContainer />
      </div>
    );
  }
  

export default HomePage;