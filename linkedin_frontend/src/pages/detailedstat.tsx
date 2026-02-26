import './home.css'
import React from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import {useLocation} from 'react-router-dom';
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

// Enable all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const DetailedStat = () => {
  const [linkedin_data, setLinkedin_data] = useState("");
  const [text_input, settext_input] = useState("");
  const location = useLocation();
  const retrieved_data = location.state;
  
  // console.log("le riz est laaaaaaa")
  // console.log(retrieved_data)
  const navigate = useNavigate();
  
  function generate_list_of_dict(list_,list2_,list3_) {
      let list_of_dict = [];

      list_.forEach((data: string, index : number) => {
        if (data.toLowerCase().includes(text_input.toLowerCase()) === true) {
          list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index]});
        }
        else if (text_input.length === 0) {
          list_of_dict.push({ data: data, number: list2_[index],rate: list3_[index]});
        }
      });

      return list_of_dict
  }
  function generate_list(list_,list2_,list3_) {
    let generated_list = [];
    list_.forEach((data, index) => {      
      if (data.toLowerCase().includes(text_input.toLowerCase()) === true) {
        console.log("ok 1")
        generated_list.push(<li key={index}>{data} {" |     "} {list2_[index]} {" |     "} {list3_[index]}</li>);
      }
      else if (text_input.length === 0) {
        generated_list.push(<li key={index}>{data} {" |     "} {list2_[index]} {" |     "} {list3_[index]}</li>);
      }
    });

    return generated_list
  }
  
  function handle_text_input (event) {
    // console.log("tototo");
    settext_input(event.target.value)
  }
  
  let datalist = generate_list(retrieved_data[0],retrieved_data[1],retrieved_data[2])
  let data_dict = generate_list_of_dict(retrieved_data[0],retrieved_data[1],retrieved_data[2])

  console.log("kok(opkpo(kop'(kpo")
  console.log(datalist)
  function go_home() {
    navigate('/');
  }

  function go_back_to_the_main_page() {
    navigate('/display_data',{state: retrieved_data[3]});
  }

    return (
      <div>
        <h1 className="nice_font">Statistiques detaillées</h1>
        <br></br>
        <br></br>
        <h1>{retrieved_data.number_of_application}</h1>
         <button onClick={go_home}>
          🏠
        </button>
        <br></br>
        <br></br>
        
        <button onClick={go_back_to_the_main_page}>
          ⬅️
        </button>
        <br></br>
        <br></br>
        
        <input name="myInput" placeholder="Cherche ton élement" onChange={handle_text_input}/>
        <br></br>

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
            {data_dict.map((data_dict) => (
              <TableRow key={data_dict.data}>
                <TableCell>{data_dict.data}</TableCell>
                <TableCell>{data_dict.number}/{retrieved_data[4]}</TableCell>
                <TableCell>{data_dict.rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }

export default DetailedStat;

