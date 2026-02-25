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
  const toto = location.state;
  console.log("yiii 1")
  console.log(toto)
  console.log("yiii 2")
  console.log(toto.number_of_application)
  
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
  
  const dictos = generate_list_of_dict(toto.number_of_application_per_day_name_value,toto.number_of_application_per_day_name_occurence)
  const dictos2 = generate_list_of_dict(toto.number_of_application_per_day_name_value,toto.number_of_application_per_day_name_ratio)
  
  const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: dictos,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    });
  
  const [chartOptions2, setChartOptions2] = useState({
        // Data: Data to be displayed in the chart
        data: dictos2,
        
        // Series: Defines which chart type and data to use
        series: [{ type: 'pie', legendItemKey: 'month', angleKey: 'iceCreamSales' }],
    });
  
  
  let all_company_list = generate_list(toto.all_company);

    return (
      <div>
        <h1 className="toto">CACAPOPOTOTO</h1>
        <h1>{toto.number_of_application}</h1>
        
        {/* <ul>{all_company_list}</ul> */}

        <AgCharts options={chartOptions} />        
        <AgCharts options={chartOptions2} />
        
      </div>
    );
  }

export default DataDisplay;

