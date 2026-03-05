import './App.css';
import { BrowserRouter, Routes, Route,Switch, Link } from 'react-router';

import HomePage from './pages/home';
import DataDisplay from './pages/datadisplay';
import DetailedStat from './pages/detailedstat';
import DayStatistics from './pages/daystatistics';
import WeekStatistics from './pages/weekstatistics';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/> 
        <Route path="/display_data" element={<DataDisplay />} />
        <Route path="/detailed_stat" element={<DetailedStat />} />
        <Route path="/day_statistics" element={<DayStatistics />} />
        <Route path="/week_statistics" element={<WeekStatistics />} />
        <Route path="/back_statistics" element={<DataDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;