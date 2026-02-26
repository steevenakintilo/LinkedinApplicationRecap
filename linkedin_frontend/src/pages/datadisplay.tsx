import './home.css'
import React from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { blue } from '@mui/material/colors';

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const location = useLocation();
  const retrieved_data = location.state;
  const big_line = "--------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
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
    console.log("kddg")
    navigate('/detailed_stat',{state: [value_list,occurence_list,ratio_list,retrieved_data,len_of_list]});

  }

  function generate_random_colour() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  }
  
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

  //console.log("caaccaca")
  //console.log(dict_number_of_application_per_day_name_value)
  ///const dict_number_of_application_per_hour_occurence_sorted = generate_list_of_dict()
  
  const [chart_number_of_application_per_day_name_value_sorted, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_application_per_day_name_value_sorted,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number' , fill:generate_random_colour()}],
        title: { text: 'Nombre de candidatures par jour de la semaine' },
    });
  
  const [chart_number_of_application_per_day_name_value, setChartOptions2] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_application_per_day_name_value,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'pie', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Pourcentage de candidatures par jour de la semaine' }
    });
  
  
  const [chart_number_of_application_per_hour_value_sorted, setChartOptions3] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_application_per_hour_value_sorted,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Nombre de candidatures par heures' }
    });
  
  
    const [chart_number_of_application_per_hour_ratio, setChartOptions4] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_application_per_hour_ratio,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Pourcentage de candidatures par heures' }
    });

    const [chart_number_of_time_you_applied_to_a_company_value, setChartOptions5] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_time_you_applied_to_a_company_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Nombre de candidatures par entreprise' }
    });
    
    const [chart_number_of_time_you_applied_to_a_job_name_value, setChartOptions6] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_time_you_applied_to_a_job_name_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Nombre de candidatures par poste' }
    });
    
    const [chart_all_word_sorted_value, setChartOptions7] = useState({
        // Data: Data to be displayed in the chart
        data: dict_all_word_sorted_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Les mots les plus présents parmis la liste de tout les mots' }
    });

    const [chart_all_word_occurence_to_job_name_value, setChartOptions8] = useState({
        // Data: Data to be displayed in the chart
        data: dict_all_word_occurence_to_job_name_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Les mots les plus présents dans le titre des annonces' }
    });
    

    const [chart_all_question_sorted_value, setChartOptions9] = useState({
        // Data: Data to be displayed in the chart
        data: dict_all_question_sorted_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Les questions les plus demandées' }
    });
    
    const [chart_number_of_question_per_application_value_sorted, setChartOptions10] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_question_per_application_value_sorted,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Nombre de question par offres' }
    });

    
    const [chart_number_of_question_per_application_value, setChartOptions11] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_question_per_application_value,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Pourcentage de question par offres qui ont au moins 1 questions' }
    });
    
    const [chart_number_of_question_per_application_value2, setChartOptions12] = useState({
        // Data: Data to be displayed in the chart
        data: dict_number_of_question_per_application_value2,
        
        // Series: Defines which chart type and data to use
        
        series: [{ type: 'bar', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Pourcentage de question par offres' }
    });

      const [chart_number_of_application_with_question_ratio, setChartOptions13] = useState({
        // Data: Data to be displayed in the chart
        data: [
          { data_name: 'Candidatures avec question', data_number: retrieved_data.number_of_application_with_question_ratio},
          { data_name: 'Candidatures sans question', data_number: retrieved_data.number_of_application_withouth_question_ratio},
        ],
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'pie', legendItemKey: 'data_name', angleKey: 'data_number', fill:generate_random_colour()}],
        title: { text: 'Pourcentage de candidature avec et sans questions' }
    });
  
    
    // let all_company_list = generate_list(retrieved_data.all_company);

    return (
      <div>
        <h1 className="nice_font">Voici les statistiques de tes candidatures:</h1>
        
        <div className="spacer"></div>        
        
        {/* <h2 className="nice_font">Tu as postuler à {retrieved_data.number_of_application} offres</h2> */}
        
        <h2 className="nice_font">Tu as postuler à {retrieved_data.number_of_application} offres entre le {retrieved_data.first_application_date} et {retrieved_data.last_application_date}</h2>
        <h2 className="nice_font">Ce qui fait une moyenne d'environ {retrieved_data.number_of_application_ratio_per_day} candidatures par jour depuis {retrieved_data.number_of_day_between_first_and_last_application} jours</h2>
        {/* <h2 className="nice_font">{retrieved_data.number_of_application_sentence}</h2>         */}
        {/* <ul>{all_company_list}</ul> */}
        <div className="spacer"></div>        
        
        <h2>{big_line}</h2>
        <div>
          <AgCharts options={chart_number_of_application_per_day_name_value_sorted} />        
          <AgCharts options={chart_number_of_application_per_day_name_value} />
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
                <h1 className="nice_font">Tu as postulé a {retrieved_data.number_of_company} différentes entreprises</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé a {retrieved_data.number_of_company} différentes entreprises</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />
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
                  Toutes les statistiques
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
                <h1 className="nice_font">Tu as postulé a {retrieved_data.number_of_different_job_name} différents postes</h1>
                <AgCharts options={chart_number_of_time_you_applied_to_a_job_name_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Tu as postulé a {retrieved_data.number_of_different_job_name} différents postes</h1>
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
                  Toutes les statistiques
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
                  Toutes les statistiques
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
                <h1 className="nice_font">La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce le texte peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présences parmis tout les mots sera faible</h1>
                <AgCharts options={chart_all_word_occurence_to_job_name_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce</h1>
                <h1 className="nice_font"> Le texte peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présences parmis tout les mots sera faible</h1>
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
                  Toutes les statistiques
                </button>
                      
              </div>
            )
          }
        })()}
        
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        {(() => {
          if (retrieved_data.all_company.number_of_question <= 5) {
            return (
              <div>
                <h1 className="nice_font">Tu as répondu à {retrieved_data.number_of_question} question dont {retrieved_data.number_of_different_question} différentes</h1>
                <AgCharts options={chart_all_question_sorted_value} />        
              </div>
            )
          } else {
            return (
              <div>
                <h1 className="nice_font">Tu as répondu à {retrieved_data.number_of_question} question dont {retrieved_data.number_of_different_question} différentes</h1>
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
                  Toutes les statistiques
                </button>
                      
              </div>
            )
          }
        })()}

        <br></br>
        <br></br>

        <h1 className="nice_font">Il y a {retrieved_data.number_of_application_with_question} candidatures avec au moins 1 question et {retrieved_data.number_of_application_withouth_question} sans question</h1>
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
        
        <h1 className="nice_font">Tu dois répondres en moyenne à {retrieved_data.number_of_question_in_average_per_application} questions par candidatures</h1>
        
        {(() => {
          if (retrieved_data.number_of_application_with_question >= 5) {
            return (
            <div>
              <h1 className="nice_font">Quand une candidature à au moins 1 question tu dois répondres en moyenne à {retrieved_data.number_of_question_in_average_per_application_withouth_0} questions</h1>          
            </div>
            
            )
          }
        })()}
        <div className="spacer"></div>        
        <h2>{big_line}</h2>
        
        
        <br></br>
        <button onClick={go_home}>
          🏠
        </button>
      </div>
    );
  }

export default DataDisplay;

