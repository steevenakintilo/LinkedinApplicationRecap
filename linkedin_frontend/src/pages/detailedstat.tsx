import './home.css'
import React from 'react';
import { data, useNavigate } from 'react-router';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router';
import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
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

import Custom_navbar from "./navbar.tsx"
import {add_space,go_back_to_the_main_page} from "../utility_function/utility_function.tsx"


// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DetailedStat = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const [text_input, settext_input] = useState("");
  const location = useLocation();
  // const retrieved_data = location.state;
  const retrieved_data = JSON.parse(localStorage.getItem("detailed_data"));
  // console.log("le riz est laaaaaaa")
  // console.log(retrieved_data)
  const navigate = useNavigate();
  
  function generate_list_of_dict(list_:any,list2_:any,list3_:any) {
      let list_of_dict:any = [];
      let temp_list:any = [];
      let number_ : number = 0;
      let pourcentage : number = 0;
      list_.forEach((data: string, index : number) => {
        if (data.toLowerCase().includes(text_input.toLowerCase()) === true) {
          list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index]});
          number_+=list2_[index]
          pourcentage+=list3_[index]
        }
        else if (text_input.length === 0) {
          list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index]});
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
  
  
  let data_dict = generate_list_of_dict(retrieved_data[0],retrieved_data[1],retrieved_data[2])

  console.log("DETAILED STATSSSS")
  console.log(retrieved_data)
  function go_home() {
    navigate('/');
  }

    return (
      <div>

        {Custom_navbar(2,"")}
        <h1 className="nice_font">Statistiques detaillées</h1>
        {add_space(5)}
        
         <button onClick={go_back_to_the_main_page} className="medium_button">
          ❌
        </button>
        {add_space(5)}

        <input name="myInput" placeholder="Cherche ton élement" onChange={handle_text_input}/>
        {add_space(5)}
        <br></br>

        {(() => {
          if (retrieved_data[5] === 0) {
            return (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Element</TableCell>
                      <TableCell>Nombre de fois qu'il est présent</TableCell>
                      <TableCell>Son %</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data_dict.map((data_dict:any) => (
                      <TableRow key={data_dict.data}>
                        <TableCell>{data_dict.data}</TableCell>
                        <TableCell>{data_dict.number}/{retrieved_data[4]}</TableCell>
                        <TableCell>{data_dict.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          } else if (retrieved_data[5] === 1) {
            return (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Element</TableCell>
                      <TableCell>Nombre de jours où tu as postulé</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data_dict.map((data_dict:any) => (
                      <TableRow key={data_dict.data}>
                        <TableCell>{data_dict.data}</TableCell>
                        <TableCell>{data_dict.number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )

          } else if (retrieved_data[5] === 2) {
            return (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Element</TableCell>
                      <TableCell>Nombre de candidatures</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data_dict.map((data_dict:any) => (
                      <TableRow key={data_dict.data}>
                        <TableCell>{data_dict.data}</TableCell>
                        <TableCell>{data_dict.number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )

          } 
          
          else {
            return (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Element</TableCell>
                      <TableCell>Nombre de jours consécutif</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data_dict.map((data_dict:any) => (
                      <TableRow key={data_dict.data}>
                        <TableCell>{data_dict.data}</TableCell>
                        <TableCell>{data_dict.number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }
        })()}
      </div>
    );
  }

export default DetailedStat;

