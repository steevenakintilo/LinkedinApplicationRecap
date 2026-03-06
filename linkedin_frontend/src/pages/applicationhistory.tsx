import './home.css'

import { useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { ToastContainer, toast } from 'react-toastify';
import Custom_navbar from "./navbar.tsx"
import {make_navbar_element,make_a_graphic,add_space,generate_list_of_dict2,make_a_graphic3,make_a_graphic2} from "../utility_function/utility_function.tsx"
import { AgCharts } from 'ag-charts-react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";


const ApplicationHistory = () => {
    // useEffect(() => {

    // }, []);

    const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));

    let navbar_data_display = make_navbar_element(retrieved_data)
    const [text_input, settext_input] = useState("");
    const [reverse_input, setreverse_input_input] = useState(false);
    
    function generate_list_of_dict(list_:any,list2_:any,list3_:any) {
      let list_of_dict:any = [];
      let temp_list:any = [];
      let number_ : number = 0;
      let pourcentage : number = 0;
      list_.forEach((data: string, index : number) => {
        // if (data.toLowerCase().includes(text_input.toLowerCase()) === true || list2_[index].toLowerCase().includes(text_input.toLowerCase()) === true || list3_[index].toLowerCase().includes(text_input.toLowerCase()) === true) {
        //   list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index]});
        //   number_+=list2_[index]
        //   pourcentage+=list3_[index]
        // }
        
        //console.log("Dataaaaa " , data , data.toLowerCase().includes(text_input.toLowerCase() , text_input.length))
        if (data.toLowerCase().includes(text_input.toLowerCase()) === true || list2_[index].toLowerCase().includes(text_input.toLowerCase()) === true || list3_[index].toLowerCase().includes(text_input.toLowerCase()) === true) {
          list_of_dict.push({ data: data.split("#")[0], number: list2_[index],rate: list3_[index] , index_:index});
          number_+=list2_[index]
          pourcentage+=list3_[index]
        }
        
        else if (text_input.length === 0) {
          
          list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index],index_:index});
        }
      });

      return list_of_dict

      // # A BIT SLOW
      // if (text_input.length === 0) {
      //   return list_of_dict
      // }

      // temp_list.push({ data: text_input, number: number_,rate: pourcentage.toFixed(2)})
      // const final_array:any = temp_list.concat(list_of_dict);
      // return final_array
    }
    function handle_text_input (event) {
        // console.log("tototo");
        settext_input(event.target.value)
    }
    
    function handle_revere_input() {
        // console.log("tototo");
        setreverse_input_input(!reverse_input);
    }
    
    function make_board(data_dict:any) {
        return (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Nom de l'entreprise</TableCell>
                      <TableCell>Nom du poste</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data_dict.map((data_dict:any) => (
                      <TableRow key={data_dict.id}>
                        <TableCell>{data_dict.data.split("#")[0]}</TableCell>
                        <TableCell>{data_dict.number}/{retrieved_data[4]}</TableCell>
                        <TableCell>{data_dict.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        )
    }

    console.log("blabla " , reverse_input)
    console.log(retrieved_data.number_of_application_per_day_name_value.length)
    let data_dict = {}
    if (reverse_input === true) {
        data_dict = generate_list_of_dict(retrieved_data.all_application_time_sorted,retrieved_data.all_company_time_sorted,retrieved_data.all_job_name_time_sorted)
    } else {
        data_dict = generate_list_of_dict(retrieved_data.all_application_time_sorted.reverse(),retrieved_data.all_company_time_sorted.reverse(),retrieved_data.all_job_name_time_sorted.reverse())
    }
    
    return (
        <div className="backgroundcolour">
            {Custom_navbar(1,navbar_data_display)}
            {add_space(5)}
            <input name="myInput" placeholder="Cherche ton élement" onChange={handle_text_input}/>
            {add_space(5)}
            <h1 className="center_text">Historique des candidatures 📅</h1>
            {add_space(7)}
            <button className="medium_button" onClick={handle_revere_input}>🔄</button>
            {add_space(2)}
            {make_board(data_dict)}
            
            
        </div>
    )
}

export default ApplicationHistory