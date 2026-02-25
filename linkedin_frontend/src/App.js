import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/home.tsx';
import DataDisplay from './pages/datadisplay.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>    
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/display_data" element={<DataDisplay/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
