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
  const location = useLocation();
  const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
  
  //const retrieved_data = location.state;
  const big_line = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  
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

  
  const max_number_for_display = 450
  const dict_number_of_time_you_applied_to_a_company_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_company_value,retrieved_data.number_of_time_you_applied_to_a_company_occurence,10)
  const dict_number_of_time_you_applied_to_a_job_name_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_job_name_value,retrieved_data.number_of_time_you_applied_to_a_job_name_occurence,5)
  const dict_all_word_sorted_value = generate_list_of_dict(retrieved_data.all_word_sorted_value,retrieved_data.all_word_occurence,10)
  const dict_all_word_occurence_to_job_name_value = generate_list_of_dict(retrieved_data.all_word_occurence_to_job_name_value,retrieved_data.all_word_occurence_to_job_name_occurence,10)
  const dict_all_question_sorted_value = generate_list_of_dict(retrieved_data.all_question_sorted_value,retrieved_data.all_question_occurence,5)
  const dict_number_of_question_per_application_value_sorted = generate_list_of_dict(retrieved_data.number_of_question_per_application_value_sorted,retrieved_data.number_of_question_per_application_occurence_sorted,100)
  const dict_number_of_question_per_application_value = generate_list_of_dict(retrieved_data.number_of_question_per_application_value,retrieved_data.number_of_question_per_application_ratio,100)
  const dict_number_of_question_per_application_value2 = generate_list_of_dict(retrieved_data.number_of_question_per_application_value2,retrieved_data.number_of_question_per_application_ratio2,100)
  
  
  const dict_number_of_application_per_year_value = generate_list_of_dict(retrieved_data.number_of_application_per_year_value,retrieved_data.number_of_application_per_year_occurence,10)
  const dict_number_of_application_per_year_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_year_value,retrieved_data.number_of_application_per_year_rate,10)
  
  const dict_number_of_application_per_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_occurence,15)
  const dict_number_of_application_per_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_rate,15)
  

  const dict_number_of_application_per_distinct_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_occurence,500)
  const dict_number_of_application_per_distinct_month_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted,retrieved_data.number_of_application_per_distinct_month_occurence_sorted,500)
  const dict_number_of_application_per_distinct_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_rate,500)
  
  
  
  const chart_number_of_time_you_applied_to_a_company_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_company_value,"Nombre de candidatures par entreprise")
  const chart_number_of_time_you_applied_to_a_job_name_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_job_name_value,"Nombre de candidatures par poste")
  const chart_all_word_sorted_value = make_a_graphic("bar" , dict_all_word_sorted_value,"Les mots les plus présents parmis la liste de tout les mots")
  const chart_all_word_occurence_to_job_name_value = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,"Les mots les plus présents dans le titre des annonces")
  const chart_all_question_sorted_value = make_a_graphic("bar" , dict_all_question_sorted_value,"Les questions les plus demandées")
  const chart_number_of_question_per_application_value_sorted = make_a_graphic("line" , dict_number_of_question_per_application_value_sorted,"Nombre de questions par offres")
  const chart_number_of_question_per_application_value = make_a_graphic("bar" , dict_number_of_question_per_application_value,"Pourcentage de questions par offres qui ont au moins 1 question")
  const chart_number_of_question_per_application_value2 = make_a_graphic("bar" , dict_number_of_question_per_application_value2,"Pourcentage de questions par offres")
  
  
  const chart_number_of_application_with_question_ratio = make_a_graphic2("pie" , retrieved_data.number_of_application_with_question_ratio ,"Pourcentage de candidatures avec question",retrieved_data.number_of_application_withouth_question_ratio ,"Pourcentage de candidatures sans question","Pourcentage de candidature avec et sans questions")
  
  const chart_number_of_application_per_year_value = make_a_graphic("bar" , dict_number_of_application_per_year_value,"Nombre de fois que tu as postulé par an")
  const chart_number_of_application_per_year_value_rate = make_a_graphic("pie" , dict_number_of_application_per_year_value_rate,"Pourcentage de candidatures par an")
  
  const chart_number_of_application_per_month_value = make_a_graphic("bar" , dict_number_of_application_per_month_value,"Nombres de candidatures par mois")
  const chart_number_of_application_per_month_value_rate = make_a_graphic("line" , dict_number_of_application_per_month_value_rate,"Pourcentages de candidatures par mois")
  const chart_number_of_application_per_distinct_month_value = make_a_graphic("bar" , dict_number_of_application_per_distinct_month_value,"Nombres de candidatures par mois distinct avec au moins 1 candidatures")
  const chart_number_of_application_per_distinct_month_value_rate = make_a_graphic("donut" , dict_number_of_application_per_distinct_month_value_rate,"Pourcentages de candidatures par mois distinct")
  const chart_number_of_application_per_distinct_month_value_sorted = make_a_graphic("line" , dict_number_of_application_per_distinct_month_value_sorted,"Nombres de candidatures par mois distinct")
  

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
        
        <h2>{big_line}</h2>
        {/* <h2 className="nice_font">{retrieved_data.number_of_application_sentence}</h2>         */}
        {/* <ul>{all_company_list}</ul> */}
        <div className="spacer"></div>        
        
        <br></br>
        <br></br>
        <h2>{big_line}</h2>
        <h2 className="nice_font">Tu as postulé à {retrieved_data.number_of_application_on_weekend} offre(s) pendant le week-end</h2>

            
        <h2>{big_line}</h2>
        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        
        
        {(() => {
          if (retrieved_data.all_company.length === 0) {
            return (
              <div>
              </div>
            )
          } else if (retrieved_data.all_company.length <= 10) {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé à {retrieved_data.number_of_company} différentes entreprises</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé à {retrieved_data.number_of_company} différentes entreprises</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.number_of_time_you_applied_to_a_company_value,
                      retrieved_data.number_of_time_you_applied_to_a_company_occurence,
                      retrieved_data.number_of_time_you_applied_to_a_company_ratio,
                      retrieved_data.number_of_application
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
                      
              </div>
            )
          }
        })()}

        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        {(() => {
          if (retrieved_data.number_of_different_job_name <= 5) {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé à {retrieved_data.number_of_different_job_name} différents postes</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_job_name_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé à {retrieved_data.number_of_different_job_name} différents postes</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_job_name_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.number_of_time_you_applied_to_a_job_name_value,
                      retrieved_data.number_of_time_you_applied_to_a_job_name_occurence,
                      retrieved_data.number_of_time_you_applied_to_a_job_name_ratio,
                      retrieved_data.number_of_application
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
                      
              </div>
            )
          }
        })()}

        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        {(() => {
          if (retrieved_data.number_of_word <= 10) {
            return (
              <div>
                <h1 className="nice_font">Parmi toutes les annonces auxquelles tu as postulé, il y avait {retrieved_data.number_of_word} mots et {retrieved_data.number_of_different_word} mots différents</h1>
                <AgCharts options={chart_all_word_sorted_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Parmi toutes les annonces auxquelles tu as postulé, il y avait {retrieved_data.number_of_word} mots et {retrieved_data.number_of_different_word} mots différents</h1>
                <AgCharts options={chart_all_word_sorted_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.all_word_sorted_value,
                      retrieved_data.all_word_occurence,
                      retrieved_data.all_word_occurence_ratio,
                      retrieved_data.number_of_word
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
                      
              </div>
            )
          }
        })()}
        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        {(() => {
          if (retrieved_data.all_company.number_of_different_word <= 10) {
            return (
              <div>
                <h1 className="nice_font">La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce le mot peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présence parmis tous les mots sera faible</h1>
                <AgCharts options={chart_all_word_occurence_to_job_name_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce</h1>
                <h1 className="nice_font"> Le mot peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présences parmis tout les mots sera faible</h1>
                <AgCharts options={chart_all_word_occurence_to_job_name_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.all_word_occurence_to_job_name_value,
                      retrieved_data.all_word_occurence_to_job_name_occurence,
                      retrieved_data.all_word_occurence_to_job_name_ratio,
                      retrieved_data.number_of_different_job_name
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
                      
              </div>
            )
          }
        })()}
        
        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        {(() => {
          if (retrieved_data.number_of_question <= 5 && retrieved_data.number_of_question > 0) {
            return (
              <div>
                <h1 className="nice_font">Tu as répondu à {retrieved_data.number_of_question} question(s) dont {retrieved_data.number_of_different_question} différente(s)</h1>
                <AgCharts options={chart_all_question_sorted_value} />        
              </div>
            )
          } else if (retrieved_data.number_of_question > 0) {
            return (
              <div>
                <h1 className="nice_font">Tu as répondu à {retrieved_data.number_of_question} question(s) dont {retrieved_data.number_of_different_question} différente(s)</h1>
                <AgCharts options={chart_all_question_sorted_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.all_question_sorted_value,
                      retrieved_data.all_question_occurence,
                      retrieved_data.all_question_occurence_ratio,
                      retrieved_data.number_of_question
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
                      
              </div>
            )
          }
        })()}

        <br></br>
        <br></br>

        <h1 className="nice_font">Il y a {retrieved_data.number_of_application_with_question} candidatures avec au moins 1 question et {retrieved_data.number_of_application_withouth_question} sans question</h1>
        <h1 className="nice_font">Tu dois répondres en moyenne à {retrieved_data.number_of_question_in_average_per_application} questions par candidatures</h1>
        
        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
            <div>
              <h1 className="nice_font">Quand une candidature a au moins 1 question tu dois répondres en moyenne à {retrieved_data.number_of_question_in_average_per_application_withouth_0} questions</h1>          
            </div>
            
            )
          }
        })()}
        
        <br></br>
        <br></br>

        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
            <div>
              <AgCharts options={chart_number_of_application_with_question_ratio} />  
              <br></br>
              <br></br>
                    
            </div>
            )
          }
        })()}
        
        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
              <div>
                <AgCharts options={chart_number_of_question_per_application_value_sorted} /> 
                <br></br>
                <br></br>
                      
              </div>      
            )
          }
        })()}
        
        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
            <div>
              <AgCharts options={chart_number_of_question_per_application_value2} />  
              <br></br>
              <br></br>
                    
            </div>
            
            )
          }
        })()}
        
        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
            <div>
              <AgCharts options={chart_number_of_question_per_application_value} />    
              <br></br>
              <br></br>
                  
            </div>
            
            )
          }
        })()}
        
        
        
        <br></br>
        <br></br>
        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
             
        {(() => {
          if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
            return (
              <div>
                <h1 className="nice_font">Sur {retrieved_data.number_of_day_between_first_and_last_application} jours tu as passé {retrieved_data.number_of_day_you_applied} jours à postuler et {retrieved_data.number_of_day_you_applied_you_didnt_apply} à ne pas postuler</h1>       
              </div>
            )
        }})()}
        <br></br>
        <br></br>
        
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
            return (
              <div>
                <h1 className="nice_font">Sur {retrieved_data.number_of_day_between_first_and_last_application - retrieved_data.weekday_day_nb} jours sans compter les week-ends tu as passé {retrieved_data.number_of_day_you_applied_excluding_weekend} jours à postuler et {retrieved_data.number_of_day_you_didnt_apply_excluding_weekend} à ne pas postuler</h1>       
              </div>
            )
        }})()}
        <br></br>
        <br></br>
        

        <div className="spacer"></div>        
        <h2>{big_line}</h2>

        <br></br>
        <br></br>
        

        {(() => {
          if (retrieved_data.number_of_application_per_year_value.length > 1) {
            return (
              <div>
                <div className="spacer"></div>        
                <h2>{big_line}</h2>
              </div>
            )
        }})()}

        <br></br>
        <br></br>
          

        {(() => {
          if (retrieved_data.number_of_application_per_year_value.length > 1) {
            return (
              <div>
                <div className="spacer"></div>        
                <h2>{big_line}</h2>
              </div>
            )
        }})()}

        {(() => {
          if (retrieved_data.number_of_application_per_year_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_year_value} />        
              </div>
            )
        }})()}

        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.number_of_application_per_year_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_year_value_rate} />        
              </div>
            )
        }})()}
        
        
        {(() => {
          if (retrieved_data.number_of_application_per_year_value.length > 1) {
            return (
              <div>
                <div className="spacer"></div>        
                <h2>{big_line}</h2>
              </div>
            )
        }})()}
        
        
        {(() => {
          if (retrieved_data.number_of_application_per_month_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_month_value} />        
              </div>
            )
        }})()}
        
        <br></br>
        <br></br>

        {(() => {
          if (retrieved_data.number_of_application_per_month_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_month_value_rate} />        
              </div>
            )
        }})()}
        
        <div className="spacer"></div>        
        
        {(() => {
          if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
            return (
              <div>
                <h2>{big_line}</h2>
              </div>
            )
        }})()}
        
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_distinct_month_value_sorted} />        
              </div>
            )
        }})()}
        
        <br></br>
        <br></br>

        {(() => {
          if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_distinct_month_value} />        
              </div>
            )
        }})()}
        
        <br></br>
        <br></br>

        {(() => {
          if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_application_per_distinct_month_value_rate} />        
              </div>
            )
        }})()}
        
        <div className="spacer"></div>        
        
        
        {(() => {
          if (retrieved_data.application_per_week_value.length > 1) {
            return (
              <div>
                <h2>{big_line}</h2>
              </div>
            )
        }})()}
        
        <h1 className="nice_font">Sur {retrieved_data.number_of_week_you_applied + retrieved_data.number_of_week_you_didnt_applied} semaines tu as postulé lors de {retrieved_data.number_of_week_you_applied} semaines</h1>
        
        <br></br>
        <br></br>
        
        <div className="spacer"></div>        
        
        {(() => {
          if (retrieved_data.application_per_week_value.length > 1) {
            return (
              <div>
                <h2>{big_line}</h2>
              </div>
            )
        }})()}

       
        {(() => {
          if (retrieved_data.number_of_application > 1) {
            return (
              <div>
                <h2>{big_line}</h2>
              </div>
            )
        }})()}
      </div>
    );
  }

export default DataDisplay;

