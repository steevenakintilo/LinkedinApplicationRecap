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

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const location = useLocation();
  const retrieved_data = location.state;
  const big_line = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  
  useEffect(() => {
      generete_popup("La data a bien été generé");
    }, []);

  function generete_popup(text:string) {
    const notify = () => toast.success(text, {
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
  
  console.log(retrieved_data)
  
  function generate_list_of_dict(list_:any,list2_:any,big_index:number) {
      let list_of_dict:any = [];

      list_.forEach((data, index) => {
        if (index < big_index) {
          list_of_dict.push({ data_name: data, data_number: list2_[index] });
        }
      });

      return list_of_dict
  }

  function generate_list_of_dict2(list_:any,list2_:any,big_index:number) {
      let list_of_dict:any = [];

      list_.forEach((data, index) => {
        if (index < big_index && list2_[index] > 0) {
          list_of_dict.push({ data_name:  new Date(data), data_number: list2_[index] });
        }
      });

      return list_of_dict
  }
  
  function generate_list(list_:any) {
    let generated_list:any = [];
    list_.forEach((data, index:number) => {
      generated_list.push(<li key={index}>{data}</li>);
    });

    return generated_list
  }
  
  const navigate = useNavigate();
  function go_home() {
    navigate('/');
  }

  function go_to_detailed_stat_page(value_list:any,occurence_list:any,ratio_list:any,len_of_list:any) {
    //navigate('/detailed_stat',{state: [value_list,occurence_list,ratio_list,retrieved_data,len_of_list]});
    localStorage.setItem(
      "detailed_data",
      JSON.stringify([value_list, occurence_list, ratio_list, retrieved_data, len_of_list])
    );

    window.open('/detailed_stat', '_blank');
  }

  function generate_random_colour() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }
  
  function make_a_graphic(type:string,dict_data:string,graph_title:string) {
    
    let series_data: any = []
    if (type === "bar") {
      series_data = [{ type: 'bar', xKey: 'data_name', yKey: 'data_number' , fill:generate_random_colour()}]
    } else if (type === "pie") {
      series_data = [{ type: 'pie', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}]
    } else if (type === "line") {
      series_data = [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}]
    } else if (type === "donut") {
      series_data = [{ type: 'donut', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}]
    } else if (type === "area") {
      series_data = [{ type: 'area', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}]
    }
    const [graph_data, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: dict_data,
        series: series_data,
        title: { text: graph_title },
    });

    return graph_data
  }

  function make_a_graphic2(type:string,value1:string,var_name1:string,value2:string,var_name2:string,graph_title:string) {
    
    let series_data: any = []
    if (type === "bar") {
      series_data = [{ type: 'bar', xKey: 'data_name', yKey: 'data_number' , fill:generate_random_colour()}]
    } else if (type === "pie") {
      series_data = [{ type: 'pie', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}]
    } else if (type === "line") {
      series_data = [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}]
    } else if (type === "donut") {
      series_data = [{ type: 'donut', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}]
    }
    
    const [graph_data, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [
          { data_name: var_name1, data_number: value1},
          { data_name: var_name2, data_number: value2},
        ],
        
        series: series_data,
        title: { text: graph_title },
    });

    return graph_data
  }

  function make_a_graphic3(type:string,dict_data:string,graph_title:string) {
    
    let series_data: any = []
    
    series_data = [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}]
    
    const [graph_data, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: dict_data,
        series: series_data,
        title: { text: graph_title },
    });

    return graph_data
  }

  
  const max_number_for_display = 450
  const dict_number_of_application_per_day_name_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_day_name_value_sorted,retrieved_data.number_of_application_per_day_name_occurence_sorted,10)
  const dict_number_of_application_per_day_name_value = generate_list_of_dict(retrieved_data.number_of_application_per_day_name_value,retrieved_data.number_of_application_per_day_name_ratio,10)
  const dict_number_of_application_per_hour_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_hour_value_sorted,retrieved_data.number_of_application_per_hour_occurence_sorted,1000)
  const dict_number_of_application_per_hour_ratio = generate_list_of_dict(retrieved_data.number_of_application_per_hour_value,retrieved_data.number_of_application_per_hour_ratio,1000)
  const dict_number_of_time_you_applied_to_a_company_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_company_value,retrieved_data.number_of_time_you_applied_to_a_company_occurence,10)
  const dict_number_of_time_you_applied_to_a_job_name_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_job_name_value,retrieved_data.number_of_time_you_applied_to_a_job_name_occurence,5)
  const dict_all_word_sorted_value = generate_list_of_dict(retrieved_data.all_word_sorted_value,retrieved_data.all_word_occurence,10)
  const dict_all_word_occurence_to_job_name_value = generate_list_of_dict(retrieved_data.all_word_occurence_to_job_name_value,retrieved_data.all_word_occurence_to_job_name_occurence,10)
  const dict_all_question_sorted_value = generate_list_of_dict(retrieved_data.all_question_sorted_value,retrieved_data.all_question_occurence,5)
  const dict_number_of_question_per_application_value_sorted = generate_list_of_dict(retrieved_data.number_of_question_per_application_value_sorted,retrieved_data.number_of_question_per_application_occurence_sorted,100)
  const dict_number_of_question_per_application_value = generate_list_of_dict(retrieved_data.number_of_question_per_application_value,retrieved_data.number_of_question_per_application_ratio,100)
  const dict_number_of_question_per_application_value2 = generate_list_of_dict(retrieved_data.number_of_question_per_application_value2,retrieved_data.number_of_question_per_application_ratio2,100)
  const dict_application_day_streak_value = generate_list_of_dict(retrieved_data.application_day_streak_value,retrieved_data.application_day_streak_occurence,10)
  const dict_non_application_day_streak_value = generate_list_of_dict(retrieved_data.non_application_day_streak_value,retrieved_data.non_application_day_streak_occurence,10)
  const dict_application_day_streak_excluding_weekend_value = generate_list_of_dict(retrieved_data.application_day_streak_excluding_weekend_value,retrieved_data.application_day_streak_excluding_weekend_occurence,10)
  const dict_non_application_day_streak_excluding_weekend_value = generate_list_of_dict(retrieved_data.non_application_day_streak_excluding_weekend_value,retrieved_data.non_application_day_streak_excluding_weekend_occurence,10)
  
  const dict_number_of_application_over_time_date_split_in_20 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_20,retrieved_data.number_of_application_over_time_split_in_20,200)
  const dict_number_of_application_over_time_date_split_in_10 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_10,retrieved_data.number_of_application_over_time_split_in_10,10)
  const dict_number_of_application_over_time_date_split_in_5 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_5,retrieved_data.number_of_application_over_time_split_in_5,10)
  const dict_number_of_application_over_time_date_split_in_3 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_3,retrieved_data.number_of_application_over_time_split_in_3,10)
  
  const dict_all_day_application_occurence_rate_value_sorted = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted,9999999)
  const dict_all_day_application_occurence_rate_value_sorted2 = generate_list_of_dict2(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted2,9999999)

  if (retrieved_data.number_of_day_between_first_and_last_application < max_number_for_display) {
    const dict_all_day_application_occurence_rate_value_sorted = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted,9999999)
    const dict_all_day_application_occurence_rate_value_sorted2 = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted2,9999999)
  }
  
  
  const dict_all_day_application_occurence_rate_value = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value,retrieved_data.all_day_application_occurence,10)
  const dict_number_of_application_per_year_value = generate_list_of_dict(retrieved_data.number_of_application_per_year_value,retrieved_data.number_of_application_per_year_occurence,10)
  const dict_number_of_application_per_year_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_year_value,retrieved_data.number_of_application_per_year_rate,10)
  
  const dict_number_of_application_per_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_occurence,15)
  const dict_number_of_application_per_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_rate,15)
  

  const dict_number_of_application_per_distinct_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_occurence,500)
  const dict_number_of_application_per_distinct_month_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted,retrieved_data.number_of_application_per_distinct_month_occurence_sorted,500)
  const dict_number_of_application_per_distinct_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_rate,500)
  
  const dict_application_per_week_value = generate_list_of_dict(retrieved_data.application_per_week_value,retrieved_data.application_per_week_occurence,10)
  const dict_application_week_streak = generate_list_of_dict(retrieved_data.application_week_streak,retrieved_data.application_week_streak_occurence,5)
  const dict_non_application_week_streak = generate_list_of_dict(retrieved_data.non_application_week_streak,retrieved_data.non_application_week_streak_occurence,5)
  
  
  const chart_number_of_application_per_day_name_value_sorted = make_a_graphic("bar" , dict_number_of_application_per_day_name_value_sorted,"Nombre de candidatures par jour de la semaine")
  const chart_number_of_application_per_day_name_value = make_a_graphic("pie" , dict_number_of_application_per_day_name_value,"Pourcentage de candidatures par jour de la semaine")
  const chart_number_of_application_per_hour_value_sorted = make_a_graphic("line" , dict_number_of_application_per_hour_value_sorted,"Nombre de candidatures par heure")
  const chart_number_of_application_per_hour_ratio = make_a_graphic("bar" , dict_number_of_application_per_hour_ratio,"Pourcentage de candidatures par heure")
  const chart_number_of_time_you_applied_to_a_company_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_company_value,"Nombre de candidatures par entreprise")
  const chart_number_of_time_you_applied_to_a_job_name_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_company_value,"Nombre de candidatures par poste")
  const chart_all_word_sorted_value = make_a_graphic("bar" , dict_all_word_sorted_value,"Les mots les plus présents parmis la liste de tout les mots")
  const chart_all_word_occurence_to_job_name_value = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,"Les mots les plus présents dans le titre des annonces")
  const chart_all_question_sorted_value = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,"Les questions les plus demandées")
  const chart_number_of_question_per_application_value_sorted = make_a_graphic("line" , dict_all_word_occurence_to_job_name_value,"Nombre de questions par offres")
  const chart_number_of_question_per_application_value = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,"Pourcentage de questions par offres qui ont au moins 1 question")
  const chart_number_of_question_per_application_value2 = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,"Pourcentage de questions par offres")
  
  
  const chart_number_of_application_with_question_ratio = make_a_graphic2("pie" , retrieved_data.number_of_application_with_question_ratio ,"Candidatures avec question",retrieved_data.number_of_application_withouth_question_ratio ,"Candidatures sans question","Pourcentage de candidature avec et sans questions")
  
  const chart_application_day_streak_value = make_a_graphic("bar" , dict_application_day_streak_value,"Nombre de jours consécutif ou tu as postulé")
  const chart_non_application_day_streak_value = make_a_graphic("bar" , dict_non_application_day_streak_value,"Nombre de jours consécutif ou tu n'as pas postulé")
  const chart_application_day_streak_excluding_weekend_value = make_a_graphic("bar" , dict_application_day_streak_excluding_weekend_value,"Nombre de jours consécutif ou tu as postulé (sans compter les week-ends)")
  const chart_non_application_day_streak_excluding_weekend_value = make_a_graphic("bar" , dict_non_application_day_streak_excluding_weekend_value,"Nombre de jours consécutif ou tu n'as pas postuleé (sans compter les week-ends)")
  const chart_number_of_day_you_applied = make_a_graphic2("pie" , retrieved_data.number_of_day_you_applied_you_didnt_apply_rate,"Jour ou tu n'as pas postulé",retrieved_data.number_of_day_you_applied_rate,"Jour ou tu as postulé","Pourcentage de jours ou tu as postulé")
  const chart_number_of_day_you_applied_excluding_weekend = make_a_graphic2("pie" , retrieved_data.number_of_day_you_applied_you_didnt_apply_rate,"Jour ou tu n'as pas postulé",retrieved_data.number_of_day_you_applied_rate,"Jour ou tu as postulé","Pourcentage de jours ou tu as postulé sans compter les week-ends")
  const chart_all_day_application_occurence_rate_value_sorted = make_a_graphic("line" , dict_all_day_application_occurence_rate_value_sorted,"Nombre de fois que tu as postulé par jour")
  const chart_dict_all_day_application_occurence_rate_value = make_a_graphic("bar" , dict_all_day_application_occurence_rate_value,"Jours ou tu as le plus postulé")
  const chart_number_of_application_per_year_value = make_a_graphic("bar" , dict_number_of_application_per_year_value,"Nombre de fois que tu as postulé par an")
  const chart_number_of_application_per_year_value_rate = make_a_graphic("pie" , dict_number_of_application_per_year_value_rate,"Pourcentage de candidatures par an")
  const chart_number_of_application_on_weekend2 = make_a_graphic2("pie" , retrieved_data.number_of_application_on_weekend,"Nombre de candidatures le weekend",retrieved_data.number_of_non_application_on_weekend,"Nombre de non candidatures le weekend","Nombre de candidature et non candidature le weekend")
  const chart_number_of_application_on_weekend = make_a_graphic2("pie" , retrieved_data.rate_of_application_based_only_on_weekend_day,"Pourcentage de candidatures le weekend",retrieved_data.rate_of_non_application_based_only_on_weekend_day,"Pourcentage de non candidatures le weekend","Pourcentage de candidature et non candidature le weekend")
  const chart_rate_of_application_on_non_weekend_day = make_a_graphic2("pie" , retrieved_data.rate_of_application_on_non_weekend_day,"Pourcentage de candidatures les jours de semaines",retrieved_data.rate_of_application_on_weekend_day,"Pourcentage de candidatures les week-ends","Pourcentage de candidature et non candidature le weekend")
  const chart_number_of_application_per_month_value = make_a_graphic("bar" , dict_number_of_application_per_month_value,"Nombres de candidatures par mois")
  const chart_number_of_application_per_month_value_rate = make_a_graphic("line" , dict_number_of_application_per_month_value_rate,"Pourcentages de candidatures par mois")
  const chart_number_of_application_per_distinct_month_value = make_a_graphic("bar" , dict_number_of_application_per_distinct_month_value,"Nombres de candidatures par mois distinct avec au moins 1 candidatures")
  const chart_number_of_application_per_distinct_month_value_rate = make_a_graphic("donut" , dict_number_of_application_per_distinct_month_value_rate,"Pourcentages de candidatures par mois distinct")
  const chart_number_of_application_per_distinct_month_value_sorted = make_a_graphic("line" , dict_number_of_application_per_distinct_month_value_sorted,"Nombres de candidatures par mois distinct")
  const chart_dict_application_per_week_value = make_a_graphic("bar" , dict_application_per_week_value,"Semaine ou tu as le plus postulé")
  const chart_dict_application_week_streak = make_a_graphic("bar" , dict_application_week_streak,"Nombre de semaines consécutives ou tu as postulé")
  const chart_dict_non_application_week_streak = make_a_graphic("bar" , dict_non_application_week_streak,"Nombre de semaines consécutives ou tu n'as pas postulé")
  const chart_number_of_week_you_applied = make_a_graphic2("bar" , retrieved_data.number_of_week_you_applied ,"Nombre de semaine ou tu as postulé",retrieved_data.number_of_week_you_didnt_applied ,"Nombre de semaine ou tu n'as pas postulé","Nombre de semaine ou tu as postulé / pas postulé")
  const chart_number_of_week_you_applied_rate = make_a_graphic2("pie" , retrieved_data.number_of_week_you_applied ,"Pourcentage de semaine ou tu as postulé",retrieved_data.number_of_week_you_applied_rate ,"Pourcentage de semaine ou tu n'as pas postulé","Pourcentage de semaine ou tu as postulé / pas postulé")
  const chart_number_of_postualation_on_even_day_ratio = make_a_graphic2("pie" , retrieved_data.number_of_postualation_on_even_day_ratio ,"Pourcentage de jour pair ou tu as postulé",retrieved_data.number_of_postualation_on_odd_day_ratio ,"Pourcentage de jour impair ou tu as postulé","Pourcentage de jour pair/impair ou tu as postulé")


  const chart_number_of_application_split_in_20 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_20,"blobloblo 200")
  const chart_number_of_application_split_in_10 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_10,"blobloblo 100")
  const chart_number_of_application_split_in_5 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_5,"blobloblo 555")
  const chart_number_of_application_split_in_3 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_3,"blobloblo 333")

    // let all_company_list = generate_list(retrieved_data.all_company);

    return (
      <div>
        <ToastContainer />
        {Custom_navbar()}
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
        

        <div>
          <AgCharts options={chart_number_of_application_split_in_20} />  
        </div>
        <div className="spacer"></div>        

        <div>
          <AgCharts options={chart_number_of_application_split_in_10} />  
        </div>
        <div className="spacer"></div>        

        <div>
          <AgCharts options={chart_number_of_application_split_in_5} />  
        </div>
        <div className="spacer"></div>        

        <div>
          <AgCharts options={chart_number_of_application_split_in_3} />  
        </div>
        <div className="spacer"></div>        

        {(() => {
          if (retrieved_data.number_of_application_per_day_name_value.length >= 1) {
            return (
            <div>
              <AgCharts options={chart_number_of_application_per_day_name_value_sorted} />  
            </div>
            )
          }
        })()}

        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.number_of_application_per_day_name_value.length >= 1) {
            return (
            <div>
              <AgCharts options={chart_number_of_application_per_day_name_value} />  
            </div>
            )
          }
        })()}
        

        <h2>{big_line}</h2>
        <h2 className="nice_font">Tu as postulé à {retrieved_data.number_of_application_on_weekend} offre(s) pendant le week-end</h2>

        {(() => {
          if (retrieved_data.weekday_day_nb >= 2) {
            return (
            <div>
              <AgCharts options={chart_number_of_application_on_weekend} />              
            </div>
            )
          }
        })()}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.weekday_day_nb >= 2) {
            return (
            <div>
              <AgCharts options={chart_number_of_application_on_weekend2} />              
            </div>
            )
          }
        })()}
        <br></br>
        <br></br>
  
      
        <div>
          <AgCharts options={chart_rate_of_application_on_non_weekend_day} />              
        </div>
            
        <h2>{big_line}</h2>
        
        <div>
          <AgCharts options={chart_number_of_application_per_hour_value_sorted} />
        </div>
        
        <div>
          <AgCharts options={chart_number_of_application_per_hour_ratio} />
        </div>
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
        

        {(() => {
          if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_day_you_applied} />        
              </div>
            )
        }})()}

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
        

        {(() => {
          if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_day_you_applied_excluding_weekend} />        
              </div>
            )
        }})()}


        <div className="spacer"></div>        
        <h2>{big_line}</h2>

        {(() => {
          if (retrieved_data.number_of_day_between_first_and_last_application > 1 && retrieved_data.number_of_day_between_first_and_last_application < max_number_for_display) {
            return (
              <div>
                <AgCharts options={chart_all_day_application_occurence_rate_value_sorted} />        
              </div>
            )
        }})()}

        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.all_day_application_occurence_rate_value.length <= 10) {
            return (
              <div>
                <AgCharts options={chart_dict_all_day_application_occurence_rate_value} />        
              </div>
            )
        } else {
            return (
              <div>
                <AgCharts options={chart_dict_all_day_application_occurence_rate_value} />        
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.all_day_application_occurence_rate_value,
                      retrieved_data.all_day_application_occurence,
                      retrieved_data.all_day_application_occurence_rate,
                      999998
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
              </div>
            )
          }
        })()}
        
        

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
          if (retrieved_data.application_day_streak_value.length <= 10 && retrieved_data.application_day_streak_value.length > 0) {
            return (
              <div>
                <AgCharts options={chart_application_day_streak_value} />        
              </div>
            )
          } else if (retrieved_data.application_day_streak_value.length > 0){
            return (
              <div>
                <AgCharts options={chart_application_day_streak_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.application_day_streak_value,
                      retrieved_data.application_day_streak_occurence,
                      -999,
                      -999
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
            
        {(() => {
          if (retrieved_data.non_application_day_streak_value.length <= 10 &&  retrieved_data.non_application_day_streak_occurence.length > 0) {
            return (
              <div>
                <AgCharts options={chart_non_application_day_streak_value} />        
              </div>
            )
          } else if (retrieved_data.non_application_day_streak_occurence.length > 0) {
            return (
              <div>
                <AgCharts options={chart_non_application_day_streak_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.non_application_day_streak_value,
                      retrieved_data.non_application_day_streak_occurence,
                      -999,
                      -999
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
              </div>
            )
          }
        })()}

         {(() => {
          if (retrieved_data.application_day_streak_excluding_weekend_value.length <= 10 && retrieved_data.application_day_streak_excluding_weekend_value.length > 0) {
            return (
              <div>
                <AgCharts options={chart_application_day_streak_excluding_weekend_value} />        
              </div>
            )
          } else if (retrieved_data.application_day_streak_excluding_weekend_value.length > 0) {
            return (
              <div>
                <AgCharts options={chart_application_day_streak_excluding_weekend_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.application_day_streak_excluding_weekend_value,
                      retrieved_data.application_day_streak_excluding_weekend_occurence,
                      -999,
                      -999
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
        
        {(() => {
          if (retrieved_data.non_application_day_streak_excluding_weekend_value.length <= 10 && retrieved_data.non_application_day_streak_excluding_weekend_value.length > 0) {
            return (
              <div>
                <AgCharts options={chart_non_application_day_streak_excluding_weekend_value} />        
              </div>
            )
          } else if (retrieved_data.non_application_day_streak_excluding_weekend_value.length > 0) {
            return (
              <div>
                <AgCharts options={chart_non_application_day_streak_excluding_weekend_value} />
                <button
                  onClick={() =>
                    go_to_detailed_stat_page(
                      retrieved_data.non_application_day_streak_excluding_weekend_value,
                      retrieved_data.non_application_day_streak_excluding_weekend_occurence,
                      -999,
                      -999
                    )
                  }
                >
                  Toutes les statistiques 📊
                </button>
              </div>
            )
          }
        })()}
        

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
        
        {(() => {
          if (retrieved_data.application_per_week_value.length >= 1) {
            return (
              <div>
                <AgCharts options={chart_dict_application_per_week_value} />        
              </div>
            )
          }
        })()}
        
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.application_per_week_value.length >= 1) {
            return (
              <div>
                <AgCharts options={chart_dict_application_week_streak} />        
              </div>
            )
          }
        })()}
       
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.number_of_week_you_didnt_applied > 1) {
            return (
              <div>
                <AgCharts options={chart_dict_non_application_week_streak} />        
              </div>
            )
          }
        })()}
        
        <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.application_per_week_value.length >= 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_week_you_applied} />        
              </div>
            )
          }
        })()}
       
       <br></br>
        <br></br>
        
        {(() => {
          if (retrieved_data.application_per_week_value.length >= 1) {
            return (
              <div>
                <AgCharts options={chart_number_of_week_you_applied_rate} />        
              </div>
            )
          }
        })()}
       
        <div className="spacer"></div>        
        
        {(() => {
          if (retrieved_data.application_per_week_value.length > 1) {
            return (
              <div>
                <h2>{big_line}</h2>
              </div>
            )
        }})()}

        <h1 className="nice_font">Tu as postulé lors de {retrieved_data.number_of_postualation_on_odd_day} jours pair et {retrieved_data.number_of_postualation_on_even_day} jours impaire</h1>
        
        <br></br>
        
        
        {(() => {
          if (retrieved_data.number_of_application >= 2) {
            return (
              <div>
                <AgCharts options={chart_number_of_postualation_on_even_day_ratio} />        
              </div>
            )
          }
        })()}
       
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

