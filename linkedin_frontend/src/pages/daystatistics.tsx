import './home.css'

import { useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { ToastContainer, toast } from 'react-toastify';
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,generate_list_of_dict,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2,go_to_detailed_stat_page} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';

const DayStatistics = () => {
    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));

    // 📅 Historique des candidatures

    let navbar_data_display = make_navbar_element(retrieved_data)
    let max_number_for_display : number = 450
    const dict_number_of_application_per_day_name_value = generate_list_of_dict(retrieved_data.number_of_application_per_day_name_value,retrieved_data.number_of_application_per_day_name_ratio,10)
    const dict_number_of_application_per_day_name_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_day_name_value_sorted,retrieved_data.number_of_application_per_day_name_occurence_sorted,10)
    
    const dict_number_of_application_over_time_date_split_in_20 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_20,retrieved_data.number_of_application_over_time_split_in_20,200)
    const dict_number_of_application_over_time_date_split_in_10 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_10,retrieved_data.number_of_application_over_time_split_in_10,10)
    const dict_number_of_application_over_time_date_split_in_5 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_5,retrieved_data.number_of_application_over_time_split_in_5,10)
    const dict_number_of_application_over_time_date_split_in_3 = generate_list_of_dict2(retrieved_data.number_of_application_over_time_date_split_in_3,retrieved_data.number_of_application_over_time_split_in_3,10)
    const dict_number_of_application_per_hour_value_sorted = generate_list_of_dict(retrieved_data.number_of_application_per_hour_value_sorted,retrieved_data.number_of_application_per_hour_occurence_sorted,1000)
    const dict_number_of_application_per_hour_ratio = generate_list_of_dict(retrieved_data.number_of_application_per_hour_value,retrieved_data.number_of_application_per_hour_ratio,1000)
    
    const dict_all_day_application_occurence_rate_value_sorted = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted,9999999)
    const dict_all_day_application_occurence_rate_value = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value,retrieved_data.all_day_application_occurence,10)
    const dict_application_day_streak_value = generate_list_of_dict(retrieved_data.application_day_streak_value,retrieved_data.application_day_streak_occurence,10)
    const dict_non_application_day_streak_value = generate_list_of_dict(retrieved_data.non_application_day_streak_value,retrieved_data.non_application_day_streak_occurence,10)
    const dict_application_day_streak_excluding_weekend_value = generate_list_of_dict(retrieved_data.application_day_streak_excluding_weekend_value,retrieved_data.application_day_streak_excluding_weekend_occurence,10)
    const dict_non_application_day_streak_excluding_weekend_value = generate_list_of_dict(retrieved_data.non_application_day_streak_excluding_weekend_value,retrieved_data.non_application_day_streak_excluding_weekend_occurence,10)
    
    //const dict_all_day_application_occurence_rate_value_sorted2 = generate_list_of_dict2(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted2,9999999)

    
    // if (retrieved_data.number_of_day_between_first_and_last_application < max_number_for_display) {
    // // const dict_all_day_application_occurence_rate_value_sorted = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted,9999999)
    // // const dict_all_day_application_occurence_rate_value_sorted2 = generate_list_of_dict(retrieved_data.all_day_application_occurence_rate_value_sorted,retrieved_data.all_day_application_occurence_sorted2,9999999)
    // }
    

    const chart_number_of_application_per_day_name_value = make_a_graphic("pie" , dict_number_of_application_per_day_name_value,"Pourcentage de candidatures par jour de la semaine")
    const chart_number_of_application_per_day_name_value_sorted = make_a_graphic("bar" , dict_number_of_application_per_day_name_value_sorted,"Nombre de candidatures par jour de la semaine")
    
    const chart_number_of_application_split_in_20 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_20,"Evolution des candidatures sur 20 dates distinctes")
    const chart_number_of_application_split_in_10 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_10,"Evolution des candidatures sur 10 dates distinctes")
    const chart_number_of_application_split_in_5 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_5,"Evolution des candidatures sur 5 dates distinctes")
    const chart_number_of_application_split_in_3 = make_a_graphic3("line" , dict_number_of_application_over_time_date_split_in_3,"Evolution des candidatures sur 3 dates distinctes")
    const chart_number_of_application_per_hour_value_sorted = make_a_graphic("line" , dict_number_of_application_per_hour_value_sorted,"Nombre de candidatures par heure")
    const chart_number_of_application_per_hour_ratio = make_a_graphic("bar" , dict_number_of_application_per_hour_ratio,"Pourcentage de candidatures par heure")
    const chart_all_day_application_occurence_rate_value_sorted = make_a_graphic("line" , dict_all_day_application_occurence_rate_value_sorted,"Nombre de fois que tu as postulé par jour")
    const chart_dict_all_day_application_occurence_rate_value = make_a_graphic("bar" , dict_all_day_application_occurence_rate_value,"Jours où tu as le plus postulé")
    
    const chart_application_day_streak_value = make_a_graphic("bar" , dict_application_day_streak_value,"Nombre de jours consécutif où tu as postulé")
    const chart_non_application_day_streak_value = make_a_graphic("bar" , dict_non_application_day_streak_value,"Nombre de jours consécutif où tu n'as pas postulé")
    const chart_application_day_streak_excluding_weekend_value = make_a_graphic("bar" , dict_application_day_streak_excluding_weekend_value,"Nombre de jours consécutif où tu as postulé (sans compter les week-ends)")
    const chart_non_application_day_streak_excluding_weekend_value = make_a_graphic("bar" , dict_non_application_day_streak_excluding_weekend_value,"Nombre de jours consécutif où tu n'as pas postuleé (sans compter les week-ends)")
    const chart_number_of_day_you_applied = make_a_graphic2("pie" , retrieved_data.number_of_day_you_applied_you_didnt_apply_rate,"Jour où tu n'as pas postulé",retrieved_data.number_of_day_you_applied_rate,"Jour où tu as postulé","Pourcentage de jours où tu as postulé")
    const chart_number_of_day_you_applied_excluding_weekend = make_a_graphic2("pie" , retrieved_data.number_of_day_you_applied_you_didnt_apply_rate,"Jour où tu n'as pas postulé",retrieved_data.number_of_day_you_applied_rate,"Jour où tu as postulé","Pourcentage de jours où tu as postulé sans compter les week-ends")
    
    const chart_number_of_day_you_applied_not_applied = make_a_graphic2("bar" , retrieved_data.number_of_day_you_applied,"Jour où tu aspostulé",retrieved_data.number_of_day_you_applied_you_didnt_apply,"Jour où tu n'as pas postulé","Nombres de jour où tu as postulé/pas postulé")
    const chart_number_of_day_you_applied_not_applied_excluding_weekend = make_a_graphic2("bar" , retrieved_data.number_of_day_you_applied_excluding_weekend,"Jour où tu as postulé",retrieved_data.number_of_day_you_didnt_apply_excluding_weekend,"Jour où tu n'as pas postulé","Pourcentage de jours où tu as postulé sans compter les week-ends")
    const chart_number_of_postualation_on_even_day_ratio = make_a_graphic2("pie" , retrieved_data.number_of_postualation_on_even_day_ratio ,"Pourcentage de jour pair où tu as postulé",retrieved_data.number_of_postualation_on_odd_day_ratio ,"Pourcentage de jour impair où tu as postulé","Pourcentage de jour pair/impair où tu as postulé")
    
    console.log("daaaayyyyyy " , retrieved_data.number_of_application_per_day_name_value_sorted)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)
    console.log(chart_number_of_application_per_day_name_value_sorted)

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">Statistiques liée aux jours/heures 📊 :</h1>
            {add_space(7)}
            
            <div>
                <AgCharts options={chart_number_of_application_per_hour_value_sorted} />
            </div>
            {add_space(7)}
            <div>
                <AgCharts options={chart_number_of_application_per_hour_ratio} />
            </div>
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application >= 20) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_split_in_20} />  
                </div>
                )
                }
            })()}

            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application >= 10) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_split_in_10} />  
                </div>
                )
                }
            })()}
            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application >= 5) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_split_in_5} />  
                </div>
                )
                }
            })()}
            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application >= 3) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_split_in_3} />  
                </div>
                )
                }
            })()}
            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_application_per_day_name_value.length >= 1) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_per_day_name_value_sorted} />  
                </div>
                )
                }
            })()}

            {add_space(7)}
            
            {(() => {
                if (retrieved_data.number_of_application_per_day_name_value.length >= 1) {
                return (
                <div>
                    <AgCharts options={chart_number_of_application_per_day_name_value} />  
                </div>
                )
                }
            })()}
            
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application > 1 && retrieved_data.number_of_day_between_first_and_last_application < max_number_for_display) {
                return (
                    <div>
                    <AgCharts options={chart_all_day_application_occurence_rate_value_sorted} />        
                    </div>
                )
            }})()}

            {add_space(1)}

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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.all_day_application_occurence_rate_value,
                                retrieved_data.all_day_application_occurence,
                                retrieved_data.all_day_application_occurence_rate,
                                0,
                                retrieved_data,
                                2
                            )
                            }
                        >
                            Toutes les statistiques 📊
                        </button>
                    </div>
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.application_day_streak_value,
                                retrieved_data.application_day_streak_occurence,
                                0,
                                0,
                                retrieved_data,
                                3
                            )
                            }
                        >
                            Toutes les statistiques 📊
                        </button>
                    </div>
                    </div>
                )
                }
            })()}

            {add_space(7)}
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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.non_application_day_streak_value,
                                retrieved_data.non_application_day_streak_occurence,
                                0,
                                0,
                                retrieved_data,
                                3
                            )
                            }
                        >
                            Toutes les statistiques 📊
                        </button>
                    </div>
                    </div>
                )
                }
            })()}
            
            {add_space(7)}

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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.application_day_streak_excluding_weekend_value,
                                retrieved_data.application_day_streak_excluding_weekend_occurence,
                                0,
                                0,
                                retrieved_data,
                                3
                            )
                            }
                        >
                            Toutes les statistiques 📊
                        </button>
                    </div>
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
                    
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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.non_application_day_streak_excluding_weekend_value,
                                retrieved_data.non_application_day_streak_excluding_weekend_occurence,
                                0,
                                0,
                                retrieved_data,
                                3
                            )
                            }
                        >
                            Toutes les statistiques 📊
                        </button>
                    </div>
                    </div>
                    )
                }
            })()}

            {add_space(4)}

            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_day_you_applied} />        
                    </div>
                )
            }})()}
            
            {add_space(4)}

            {(() => {
                if (retrieved_data.number_of_day_between_first_and_last_application > 1) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_day_you_applied_excluding_weekend} />        
                    </div>
                )
            }})()}

            {add_space(4)}
    
            <div>
                <AgCharts options={chart_number_of_day_you_applied_not_applied} />        
            </div>

            {add_space(7)}
            
            <div>
                <AgCharts options={chart_number_of_day_you_applied_not_applied_excluding_weekend} />        
            </div>
            
            {add_space(5)}
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
            
            
        </div>
    )
}

export default DayStatistics