import './home.css'
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,generate_list_of_dict,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';

const MonthStatistics = () => {
    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));

    // 📅 Historique des candidatures

    let navbar_data_display = make_navbar_element(retrieved_data)

    const dict_number_of_application_per_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_occurence,15)
    const dict_number_of_application_per_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_rate,15)
    
    const dict_number_of_application_per_distinct_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_occurence,500)
    const dict_number_of_application_per_distinct_month_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted,retrieved_data.number_of_application_per_distinct_month_occurence_sorted,500)
    const dict_number_of_application_per_distinct_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_rate,500)
    
    const chart_number_of_application_per_month_value = make_a_graphic("bar" , dict_number_of_application_per_month_value,"Nombres de candidatures par mois")
    const chart_number_of_application_per_month_value_rate = make_a_graphic("line" , dict_number_of_application_per_month_value_rate,"Pourcentages de candidatures par mois")
    const chart_number_of_application_per_distinct_month_value = make_a_graphic("bar" , dict_number_of_application_per_distinct_month_value,"Nombres de candidatures par mois distinct avec au moins 1 candidatures")
    const chart_number_of_application_per_distinct_month_value_rate = make_a_graphic("donut" , dict_number_of_application_per_distinct_month_value_rate,"Pourcentages de candidatures par mois distinct")
    const chart_number_of_application_per_distinct_month_value_sorted = make_a_graphic("line" , dict_number_of_application_per_distinct_month_value_sorted,"Nombres de candidatures par mois distinct")
    
    console.log("blabla " , retrieved_data.number_of_application_per_day_name_value_sorted)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">Statistiques liée aux mois 📊 :</h1>
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.number_of_application_per_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_month_value} />        
                    </div>
                )
            }})()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_application_per_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_month_value_rate} />        
                    </div>
                )
            }})()}
                        
            
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_distinct_month_value_sorted} />        
                    </div>
                )
            }})()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_distinct_month_value} />        
                    </div>
                )
            }})()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_distinct_month_value_rate} />        
                    </div>
                )
            }})()}
            
            {add_space(7)}
        </div>
    )
}

export default MonthStatistics