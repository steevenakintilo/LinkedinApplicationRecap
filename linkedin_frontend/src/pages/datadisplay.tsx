import './home.css'
import React from 'react';

class DataDisplay extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      test:""
    };
    
  }


//   handleStartDateChange = (event) => {
//     this.setState({ startDate: event.target.value });
//   };

//   handleEndDateChange = (event) => {
//     this.setState({ endDate: event.target.value });
//   };

//   testfunction = () => {
//     console.log("Start date:", this.state.startDate);
//     console.log("End date:", this.state.endDate);

//   };

  
//   componentDidMount() {
//     this.get_min_and_max_date_of_application(); // ✅ runs once on page startup
//   }

  render() {
    return (
      <div>
        <h1 className="toto">MASTERC</h1>
      </div>
    );
  }
}

export default DataDisplay;