import './home.css'

import { useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { ToastContainer, toast } from 'react-toastify';
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,generate_list_of_dict,add_space,go_to_detailed_stat_page,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';
import { useTranslation } from 'react-i18next'

const CompanyStatistics = () => {
    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));

    // 📅 Historique des candidatures

    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (retrieved_data.language == "fr") {
            i18n.changeLanguage("fr");
        } else {
            i18n.changeLanguage("en");
            console.log("the page should be in english");
        }
    }, []);
    
    let navbar_data_display = make_navbar_element(retrieved_data)

    const dict_number_of_time_you_applied_to_a_company_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_company_value,retrieved_data.number_of_time_you_applied_to_a_company_occurence,10)
    const dict_number_of_time_you_applied_to_a_job_name_value = generate_list_of_dict(retrieved_data.number_of_time_you_applied_to_a_job_name_value,retrieved_data.number_of_time_you_applied_to_a_job_name_occurence,5)
    const dict_all_word_sorted_value = generate_list_of_dict(retrieved_data.all_word_sorted_value,retrieved_data.all_word_occurence,10)
    const dict_all_word_occurence_to_job_name_value = generate_list_of_dict(retrieved_data.all_word_occurence_to_job_name_value,retrieved_data.all_word_occurence_to_job_name_occurence,10)
    
    
    
    
    const chart_number_of_time_you_applied_to_a_company_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_company_value,t("Nombre de candidatures par entreprise"))
    const chart_number_of_time_you_applied_to_a_job_name_value = make_a_graphic("bar" , dict_number_of_time_you_applied_to_a_job_name_value,t("Nombre de candidatures par poste"))
    const chart_all_word_sorted_value = make_a_graphic("bar" , dict_all_word_sorted_value,t("Les mots les plus présents parmis la liste de tout les mots"))
    const chart_all_word_occurence_to_job_name_value = make_a_graphic("bar" , dict_all_word_occurence_to_job_name_value,t("Les mots les plus présents dans le titre des annonces"))
    

    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <h1 className="center_text">{t("Statistiques liées aux entreprises/postes/mots 📊 :")}</h1>
            {add_space(7)}
            {(() => {
                if (retrieved_data.all_company.length === 0) {
                return (
                    <div>
                    </div>
                )
                } else if (retrieved_data.all_company.length <= 10) {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key13", { 
                            a: retrieved_data.number_of_company, 
                        })}
                    </h1>
                    
                    <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />        
                    </div>
                )
                } else {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key13", { 
                            a: retrieved_data.number_of_company, 
                        })}
                    </h1>
 
                    <AgCharts options={chart_number_of_time_you_applied_to_a_company_value} />
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.number_of_time_you_applied_to_a_company_value,
                                retrieved_data.number_of_time_you_applied_to_a_company_occurence,
                                retrieved_data.number_of_time_you_applied_to_a_company_ratio,
                                retrieved_data.number_of_application,
                                retrieved_data,
                                0
                            )
                            }
                        >
                            {t("Toutes les statistiques 📊")}
                        </button>
                    </div>            
                    </div>
                )
                }
            })()}
    
            {add_space(7)}
            {(() => {
                if (retrieved_data.number_of_different_job_name <= 5) {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key14", { 
                            a: retrieved_data.number_of_different_job_name, 
                        })}
                    </h1>
 
                    <AgCharts options={chart_number_of_time_you_applied_to_a_job_name_value} />        
                    </div>
                )
                } else {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key15", { 
                            a: retrieved_data.number_of_different_job_name, 
                        })}
                    </h1>
 
                    <AgCharts options={chart_number_of_time_you_applied_to_a_job_name_value} />
                    <div className="center_button">
                        <button className="btn btn-secondary"
                    
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.number_of_time_you_applied_to_a_job_name_value,
                                retrieved_data.number_of_time_you_applied_to_a_job_name_occurence,
                                retrieved_data.number_of_time_you_applied_to_a_job_name_ratio,
                                retrieved_data.number_of_application,
                                retrieved_data,
                                0
                            )
                            }
                        >
                            {t("Toutes les statistiques 📊")}
                        </button>
                    </div>            
                    </div>
                )
                }
            })()}
            {add_space(7)}

            {(() => {
                if (retrieved_data.number_of_word <= 10) {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key15", { 
                            a: retrieved_data.number_of_word,
                            b: retrieved_data.number_of_different_word
                            
                        })}
                    </h1>
 
                    <AgCharts options={chart_all_word_sorted_value} />        
                    </div>
                )
                } else {
                return (
                    <div>
                    <h1 className="nice_font">
                        {t("key15", { 
                            a: retrieved_data.number_of_word,
                            b: retrieved_data.number_of_different_word
                            
                        })}
                    </h1>
                    <AgCharts options={chart_all_word_sorted_value} />
                    <div className="center_button">
                        <button className="btn btn-secondary"
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.all_word_sorted_value,
                                retrieved_data.all_word_occurence,
                                retrieved_data.all_word_occurence_ratio,
                                retrieved_data.number_of_word,
                                retrieved_data,
                                0
                            )
                            }
                        >
                            {t("Toutes les statistiques 📊")}
                        </button>
                    </div>                            
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
            
            {(() => {
                if (retrieved_data.all_company.number_of_different_word <= 10) {
                return (
                    <div>
                    <h1 className="nice_font">{t("La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce le mot peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présence parmis tous les mots sera faible")}</h1>
                    <AgCharts options={chart_all_word_occurence_to_job_name_value} />        
                    </div>
                )
                } else {
                return (
                    <div>
                    <h1 className="nice_font">{t("La différence avec l'autre statistique est qu'ici on regarde si un mot apparait dans le texte de l'annonce")}</h1>
                    <h1 className="nice_font"> {t("Le mot peut être présent sur 3 annonces sur 3 mais si les annonces ont 500 mots sont % de présences parmis tout les mots sera faible")}</h1>
                    <AgCharts options={chart_all_word_occurence_to_job_name_value} />
                    <div className="center_button">
                        <button className="btn btn-secondary"
                    
                            onClick={() =>
                            go_to_detailed_stat_page(
                                retrieved_data.all_word_occurence_to_job_name_value,
                                retrieved_data.all_word_occurence_to_job_name_occurence,
                                retrieved_data.all_word_occurence_to_job_name_ratio,
                                retrieved_data.number_of_different_job_name,
                                retrieved_data,
                                0
                            )
                            }
                        >
                            {t("Toutes les statistiques 📊")}
                        </button>
                    </div>            
                    </div>
                )
                }
            })()}
            
            {add_space(7)}
        </div>
    )
}

export default CompanyStatistics