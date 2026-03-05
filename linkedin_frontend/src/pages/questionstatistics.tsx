import './home.css'

import { useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { ToastContainer, toast } from 'react-toastify';
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,go_to_detailed_stat_page,make_a_graphic,generate_list_of_dict,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';

const QuestionStatistics = () => {
    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));

    // 📅 Historique des candidatures

    let navbar_data_display = make_navbar_element(retrieved_data)

    const dict_all_question_sorted_value = generate_list_of_dict(retrieved_data.all_question_sorted_value,retrieved_data.all_question_occurence,5)
    const dict_number_of_question_per_application_value_sorted = generate_list_of_dict(retrieved_data.number_of_question_per_application_value_sorted,retrieved_data.number_of_question_per_application_occurence_sorted,100)
    const dict_number_of_question_per_application_value = generate_list_of_dict(retrieved_data.number_of_question_per_application_value,retrieved_data.number_of_question_per_application_ratio,100)
    const dict_number_of_question_per_application_value2 = generate_list_of_dict(retrieved_data.number_of_question_per_application_value2,retrieved_data.number_of_question_per_application_ratio2,100)
    
    const chart_all_question_sorted_value = make_a_graphic("bar" , dict_all_question_sorted_value,"Les questions les plus demandées")
    const chart_number_of_question_per_application_value_sorted = make_a_graphic("line" , dict_number_of_question_per_application_value_sorted,"Nombre de questions par offres")
    const chart_number_of_question_per_application_value = make_a_graphic("bar" , dict_number_of_question_per_application_value,"Pourcentage de questions par offres qui ont au moins 1 question")
    const chart_number_of_question_per_application_value2 = make_a_graphic("bar" , dict_number_of_question_per_application_value2,"Pourcentage de questions par offres")
    const chart_number_of_application_with_question_ratio = make_a_graphic2("pie" , retrieved_data.number_of_application_with_question_ratio ,"Pourcentage de candidatures avec question",retrieved_data.number_of_application_withouth_question_ratio ,"Pourcentage de candidatures sans question","Pourcentage de candidature avec et sans questions")
    
    
  
    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">Statistiques liées  au questions 📊 :</h1>
            {add_space(7)}
            
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
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.all_question_sorted_value,
                                retrieved_data.all_question_occurence,
                                retrieved_data.all_question_occurence_ratio,
                                retrieved_data.number_of_question,
                                retrieved_data,
                                0
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
            {add_space(4)}
            <div>
            <AgCharts options={chart_number_of_application_with_question_ratio} />                 
            </div>      

            {add_space(7)}
   
            {(() => {
                if (retrieved_data.number_of_application_with_question >= 5) {
                return (
                    <div>
                    <AgCharts options={chart_number_of_question_per_application_value_sorted} />                 
                    </div>      
                )
                }
            })()}
            
            {add_space(7)}
            
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
            
            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_application_with_question >= 5) {
                return (
                <div>
                    <AgCharts options={chart_number_of_question_per_application_value} />                
                </div>
                
                )
                }
            })()}
            
        </div>
    )
}

export default QuestionStatistics