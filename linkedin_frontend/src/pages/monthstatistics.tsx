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

    
    let dict_number_of_application_per_month_value = {}
    if (i18n.language === "en") {
        dict_number_of_application_per_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_month_value_english,retrieved_data.number_of_application_per_month_occurence,10)
    } else {
        dict_number_of_application_per_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_occurence,10)
    
    } 

    let dict_number_of_application_per_month_value_rate = {}
    if (i18n.language === "en") {
        dict_number_of_application_per_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_month_value_english,retrieved_data.number_of_application_per_month_rate,10)
    } else {
        dict_number_of_application_per_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_month_value,retrieved_data.number_of_application_per_month_rate,10)
    
    }     
    
    let dict_number_of_application_per_distinct_month_value = {}
    if (i18n.language === "en") {
        dict_number_of_application_per_distinct_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_english,retrieved_data.number_of_application_per_distinct_month_occurence,100)
    } else {
        dict_number_of_application_per_distinct_month_value = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_occurence,100)
    
    }    
    
    
    let dict_number_of_application_per_distinct_month_value_sorted = {}
    if (i18n.language === "en") {
        dict_number_of_application_per_distinct_month_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted_english,retrieved_data.number_of_application_per_distinct_month_occurence_sorted,100)
    } else {
        dict_number_of_application_per_distinct_month_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted,retrieved_data.number_of_application_per_distinct_month_occurence_sorted,100)
    
    }     
    
    let dict_number_of_application_per_distinct_month_value_rate = {}
    if (i18n.language === "en") {
        dict_number_of_application_per_distinct_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_english,retrieved_data.number_of_application_per_distinct_month_rate,100)
    } else {
        dict_number_of_application_per_distinct_month_value_rate = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value,retrieved_data.number_of_application_per_distinct_month_rate,100)
    
    }    

    let dict_nb_of_application_per_month_over_time = {}
    if (i18n.language === "en") {
        dict_nb_of_application_per_month_over_time = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted_english,retrieved_data.nb_of_application_per_month_over_time,100)
    } else {
        dict_nb_of_application_per_month_over_time = generate_list_of_dict(retrieved_data.number_of_application_per_distinct_month_value_sorted,retrieved_data.nb_of_application_per_month_over_time,100)
    
    }    
    
    
    
    const chart_number_of_application_per_month_value = make_a_graphic("bar" , dict_number_of_application_per_month_value,t("Nombres de candidatures par mois"))
    const chart_number_of_application_per_month_value_rate = make_a_graphic("line" , dict_number_of_application_per_month_value_rate,t("Pourcentages de candidatures par mois"))
    const chart_number_of_application_per_distinct_month_value = make_a_graphic("bar" , dict_number_of_application_per_distinct_month_value,t("Nombres de candidatures par mois distinct avec au moins 1 candidatures"))
    const chart_number_of_application_per_distinct_month_value_rate = make_a_graphic("donut" , dict_number_of_application_per_distinct_month_value_sorted,t("Pourcentages de candidatures par mois distinct"))
    const chart_number_of_application_per_distinct_month_value_sorted = make_a_graphic("line" , dict_number_of_application_per_distinct_month_value_sorted,t("Nombres de candidatures par mois distinct"))
    const chart_nb_of_application_per_month_over_time = make_a_graphic("line" , dict_nb_of_application_per_month_over_time,t("Evolution des candidatures à travers les mois"))
    
    console.log("blabla " , retrieved_data.number_of_application_per_day_name_value_sorted)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">{t("Statistiques liées aux mois 📊 :")}</h1>
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
          
            {(() => {
                if (retrieved_data.number_of_application_per_distinct_month_value.length > 1) {
                return (
                    <div>
                    <AgCharts options={chart_nb_of_application_per_month_over_time} />        
                    </div>
                )
            }})()}
                        
            {add_space(7)}
        </div>
    )
}

export default MonthStatistics