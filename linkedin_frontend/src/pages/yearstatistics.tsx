import './home.css'
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,generate_list_of_dict,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';
import {useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const MonthStatistics = () => {
    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
    const { t, i18n } = useTranslation()
    useEffect(() => {
        if (retrieved_data.language == "fr") {
        i18n.changeLanguage("fr");
        } else {
            i18n.changeLanguage("en");
            console.log("the page should be in english");
        }
    
    }, []);
    
    // 📅 Historique des candidatures

    let navbar_data_display = make_navbar_element(retrieved_data)

    const dict_number_of_application_per_year_value_overtime = generate_list_of_dict(retrieved_data.all_year_sorted,retrieved_data.number_of_application_over_time_year,10)
    const dict_number_of_application_per_year_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_year_value,retrieved_data.number_of_application_per_year_rate,10)
    const dict_number_of_application_per_year_value_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_year_value_sorted,retrieved_data.number_of_application_per_year_occurence_sorted,10)
    

    const chart_number_of_application_per_year_overtime = make_a_graphic("line" , dict_number_of_application_per_year_value_overtime,t("Evolution du nombres de candidatures au cour des années"))
    const chart_number_of_application_per_year_value_rate = make_a_graphic("pie" , dict_number_of_application_per_year_value_rate,t("Pourcentage de candidatures par an"))
    const chart_number_of_application_per_year_value_rate_sorted = make_a_graphic("bar" , dict_number_of_application_per_year_value_value_sorted,t("Nombres de fois que tu as postulé par an"))
    
    console.log("blabla " , retrieved_data.number_of_application_per_day_name_value_sorted)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">{t("Statistiques liées aux années 📊 :")}</h1>
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.number_of_application_per_year_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_year_value_rate_sorted} />        
                    </div>
                )
            }})()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_application_per_year_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_year_value_rate} />        
                    </div>
                )
            }})()}

            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_application_per_year_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_application_per_year_overtime} />        
                    </div>
                )
            }})()}
            
            
        </div>
    )
}

export default MonthStatistics