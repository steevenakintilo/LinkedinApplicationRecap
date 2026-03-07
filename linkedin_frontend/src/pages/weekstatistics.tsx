import './home.css'

import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,generate_list_of_dict,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';
import {useEffect } from 'react';
import { useTranslation } from 'react-i18next'

const WeekStatistics = () => {
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

    const dict_application_per_week_value = generate_list_of_dict(retrieved_data.application_per_week_value,retrieved_data.application_per_week_occurence,10)
    const dict_application_week_streak = generate_list_of_dict(retrieved_data.application_week_streak,retrieved_data.application_week_streak_occurence,5)
    const dict_non_application_week_streak = generate_list_of_dict(retrieved_data.non_application_week_streak,retrieved_data.non_application_week_streak_occurence,5)
    
    const chart_number_of_week_you_applied_rate = make_a_graphic2("pie" , retrieved_data.number_of_week_you_applied_rate ,t("Pourcentage de semaines où tu as postulé"),retrieved_data.number_of_week_you_didnt_applied_rate ,t("Pourcentage de semaines où tu n'as pas postulé"),t("Pourcentage de semaines où tu as postulé / pas postulé"))
    const chart_number_of_week_you_applied = make_a_graphic2("bar" , retrieved_data.number_of_week_you_applied ,t("Nombre de semaines où tu as postulé"),retrieved_data.number_of_week_you_didnt_applied ,t("Nombre de semaines où tu n'as pas postulé"),t("Nombre de semaines où tu as postulé / pas postulé"))
    const chart_rate_of_application_on_non_weekend_day2 = make_a_graphic2("bar" , retrieved_data.number_of_application - retrieved_data.number_of_application_on_weekend,t("Nombre de candidatures les jours de semaines"),retrieved_data.number_of_application_on_weekend,t("Nombre de candidatures les week-ends"),t("Nombre de candidatures les jours de la semaines et week-ends"))
    const chart_rate_of_application_on_non_weekend_day = make_a_graphic2("pie" , retrieved_data.rate_of_application_on_non_weekend_day,t("Pourcentage de candidatures les jours de semaines"),retrieved_data.rate_of_application_on_weekend_day,t("Pourcentage de candidatures les week-ends"),t("Pourcentage de candidature et non candidature le week-end"))
    const chart_dict_application_per_week_value = make_a_graphic("bar" , dict_application_per_week_value,t("Les semaines où tu as le plus postulé"))
    const chart_dict_application_week_streak = make_a_graphic("bar" , dict_application_week_streak,t("Nombre de semaines consécutives où tu as postulé"))
    const chart_dict_non_application_week_streak = make_a_graphic("bar" , dict_non_application_week_streak,t("Nombre de semaines consécutives où tu n'as pas postulé"))
    
    


    const chart_number_of_application_on_weekend = make_a_graphic2("pie" , retrieved_data.rate_of_application_based_only_on_weekend_day,t("Pourcentage de candidatures le week-end"),retrieved_data.rate_of_non_application_based_only_on_weekend_day,t("Pourcentage de non candidatures le week-end"),t("Pourcentage de candidature et non candidature le week-end"))

    const chart_number_of_application_on_weekend2 = make_a_graphic2("bar" , retrieved_data.number_of_different_weekend_you_applied,t("Nombre de week-ends où tu as postulé"),retrieved_data.number_of_non_application_on_weekend,t("Nombre de week-ends où tu n'as pas postulé"),t("Nombre de week-ends différents où tu as postulé / pas postulé"))

    console.log("blabla " , retrieved_data.weekday_day_nb_single, retrieved_data.number_of_different_weekend_you_applied)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)
    //onsole.log(chart_number_of_application_per_day_name_value_sorted)

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">{t("Statistiques liées aux semaines/week-ends 📊 :")}</h1>
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.application_per_week_value.length >= 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_week_you_applied} />        
                    </div>
                )
                }
            })()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.application_per_week_value.length >= 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_week_you_applied_rate} />        
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.application_per_week_value.length >= 1) {
                return (
                    <div>
                    <AgCharts options={chart_dict_application_per_week_value} />        
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.application_per_week_value.length >= 1) {
                return (
                    <div>
                    <AgCharts options={chart_dict_application_week_streak} />        
                    </div>
                )
                }
            })()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_week_you_didnt_applied > 1) {
                return (
                    <div>
                    <AgCharts options={chart_dict_non_application_week_streak} />        
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
            
            <div>
                <AgCharts options={chart_rate_of_application_on_non_weekend_day2} />        
            </div>
            {add_space(7)}
            
            <div>
                <AgCharts options={chart_number_of_application_on_weekend2} />        
            </div>
            {add_space(7)}
            
            <div>
                <AgCharts options={chart_number_of_application_on_weekend} />        
            </div>
            
            {add_space(4)}
            
            <div>
                <AgCharts options={chart_rate_of_application_on_non_weekend_day} />        
            </div>
            {add_space(7)}
        </div>
    )
}

export default WeekStatistics