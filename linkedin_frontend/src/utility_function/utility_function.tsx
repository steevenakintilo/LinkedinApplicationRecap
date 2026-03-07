
import { useState} from 'react';
import { useTranslation } from 'react-i18next'

export function generate_list_of_dict(list_:any,list2_:any,big_index:number) {
    let list_of_dict:any = [];

    list_.forEach((data, index) => {
    if (index < big_index) {
        list_of_dict.push({ data_name: data, data_number: list2_[index] });
    }
    });

    return list_of_dict
}

export function generate_list_of_dict2(list_:any,list2_:any,big_index:number) {
    let list_of_dict:any = [];

    list_.forEach((data, index) => {
        if (index < big_index && list2_[index] > 0) {
        list_of_dict.push({ data_name:  new Date(data), data_number: list2_[index] });
        }
    });

    return list_of_dict
}

export function generate_list(list_:any) {
    let generated_list:any = [];
    list_.forEach((data, index:number) => {
    generated_list.push(<li key={index}>{data}</li>);
    });

    return generated_list
}

export function go_to_detailed_stat_page(value_list:any,occurence_list:any,ratio_list:any,len_of_list:any,retrieved_data:any,type_nb:number) {
    //navigate('/detailed_stat',{state: [value_list,occurence_list,ratio_list,retrieved_data,len_of_list]});
    localStorage.setItem(
        "detailed_data_stat",
        JSON.stringify([value_list, occurence_list, ratio_list, retrieved_data, len_of_list,type_nb])
    );
    
    window.open('/detailed_stat', '_blank');
    }
    
    export function generate_random_colour() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
    
export function make_a_graphic(type:string,dict_data:string,graph_title:string) {
    
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
    
    let graph_data = {
        data: dict_data,
        series: series_data,
        title: { text: graph_title },
        
    }
    
    return graph_data
}


export function make_a_graphic2(type:string,value1:string,var_name1:string,value2:string,var_name2:string,graph_title:string) {
    
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
    
    let graph_data = {
        data: [
            { data_name: var_name1, data_number: value1},
            { data_name: var_name2, data_number: value2},
        ],
        
        series: series_data,
        title: { text: graph_title },
        
    }
    
    return graph_data
    }

export function make_a_graphic3(type:string,dict_data:string,graph_title:string) {
    
    let series_data: any = []
    
    series_data = [{ type: 'line', xKey: 'data_name', yKey: 'data_number', fill:generate_random_colour()}]

    let graph_data = {
        data: dict_data,
        series: series_data,
        title: { text: graph_title },
        
    }
    
    return graph_data
    }
    
export function make_navbar_element(retrieved_data:any,no_return_button:boolean=false) {
    const { t, i18n } = useTranslation()
    let data_to_display_element_list_name : any = [t("Jour 📊")]
    let data_to_display_element_page_list_name : any = ["day"]
    
    if (retrieved_data.number_of_day_between_first_and_last_application > 7) {
        data_to_display_element_list_name.push(t("zebi"))
        data_to_display_element_page_list_name.push("week")
    }

    if (retrieved_data.number_of_day_between_first_and_last_application > 31) {
        data_to_display_element_list_name.push(t("Mois 📊"))
        data_to_display_element_page_list_name.push("month")
    }
    
    if (retrieved_data.number_of_day_between_first_and_last_application > 365) {
        data_to_display_element_list_name.push(t("Année 📊"))
        data_to_display_element_page_list_name.push("year")
    }
    
    if (retrieved_data.number_of_application_with_question >= 5) {
        data_to_display_element_list_name.push(t("Question 📊"))
        data_to_display_element_page_list_name.push("question")
    }

    if (retrieved_data.number_of_application >= 0) {
        data_to_display_element_list_name.push(t("Entreprise 📊"))
        data_to_display_element_page_list_name.push("company")
    }

    if (retrieved_data.number_of_application >= 0) {
        data_to_display_element_list_name.push(t("Historique des candidatures 📅"))
        data_to_display_element_page_list_name.push("application_history")
    }
    

    // data_to_display_element_list_name.push("Retour ⬅️")
    // data_to_display_element_page_list_name.push("back")

    // data_to_display_element_list_name.push("Historique des candidatures 📅")
    // data_to_display_element_page_list_name.push("application")

    let navbar_data_display : any = []
    for (let i = 0 ; i < data_to_display_element_list_name.length ; i++) {
        let page_to_go = "/"+data_to_display_element_page_list_name[i]+"_statistics"
        //console.log("page_to_go " , page_to_go.replace(" ",""))
        navbar_data_display.push(<a className="navbar-brand navbar_text_color " aria-current="page" href={page_to_go.replace(" ","")}> {data_to_display_element_list_name[i]} </a>)
    }
    if (no_return_button === true) {
        return navbar_data_display    
    }
    navbar_data_display.push(<a className="navbar-brand navbar_text_color " aria-current="page" href="/display_data"> ⬅️ </a>)
    return navbar_data_display
}

export function add_space(number: number) {
      const br_list:any = []
      for (let i = 0 ; i < number ; i++) {
        br_list.push(<br></br>)  
      }

      return br_list
}

export function go_back_to_the_main_page() {
    window.open("about:blank", "_self");
    window.close();
    
}