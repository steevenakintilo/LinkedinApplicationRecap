import './App.css';
import { BrowserRouter, Routes, Route,Switch, Link } from 'react-router-dom';

import HomePage from './pages/home';
import DataDisplay from './pages/datadisplay';
import DetailedStat from './pages/detailedstat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/> 
        <Route path="/display_data" element={<DataDisplay />} />
        <Route path="/detailed_stat" element={<DetailedStat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;