import './home.css'
import React from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DataDisplay = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const location = useLocation();
  const retrieved_data = location.state;
  console.log(retrieved_data)
  
  function generate_list_of_dict(list_,list2_) {
      let list_of_dict = [];

      list_.forEach((data, index) => {
        if (index < 10) {
          list_of_dict.push({ month: data, iceCreamSales: list2_[index] });
        }
      });

      return list_of_dict
  }
  function generate_list(list_) {
    let generated_list = [];
    list_.forEach((data, index) => {
      generated_list.push(<li key={index}>{data}</li>);
    });

    return generated_list
  }
  
  const navigate = useNavigate();
  function go_home() {
    navigate('/');
  }

  function go_to_detailed_stat_page(value_list,occurence_list,ratio_list,len_of_list) {
    console.log("kddg")
    navigate('/detailed_stat',{state: [value_list,occurence_list,ratio_list,retrieved_data,len_of_list]});

  }
  
  const dictos = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_company_value,retrieved_data.number_of_time_you_applied_to_a_company_occurence)
  const dictos2 = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_company_value,retrieved_data.number_of_time_you_applied_to_a_company_ratio)
  
  const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: dictos,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
        title: { text: 'Nombre de candidatures par jour de la semaine' },
    });
  
  const [chartOptions2, setChartOptions2] = useState({
        // Data: Data to be displayed in the chart
        data: dictos2,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'pie', legendItemKey: 'month', angleKey: 'iceCreamSales' }],
        title: { text: 'Pourcentage de candidatures par jour de la semaine' }
    });
  
  
  let all_company_list = generate_list(retrieved_data.all_company);

    return (
      <div>
        <h1 className="nice_font">Voici les statistiques de tes candidatures:</h1>
        <br></br>
        <br></br>
        <br></br>
        
        <h2 className="nice_font">Tu as postuler à 4156 offres</h2>
        <h1>{retrieved_data.number_of_application}</h1>
        
        {/* <ul>{all_company_list}</ul> */}
        


        {(() => {
          if (retrieved_data.all_company.length === 0) {
            return (
              <div>
              </div>
            )
          } else if (retrieved_data.all_company.length <= 1000) {
            return (
              <div>
                <AgCharts options={chartOptions} />        
                <AgCharts options={chartOptions2} />
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
                  Toutes les statistiques
                </button>
                
              </div>
            )
          } else {
            return (
              <div>
                <AgCharts options={chartOptions} />        
                <AgCharts options={chartOptions2} />
              </div>
            )
          }
        })()}
        
        <br></br>
        <button onClick={go_home}>
          🏠
        </button>
      </div>
    );
  }

export default DataDisplay;

