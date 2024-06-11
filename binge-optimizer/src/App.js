
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import CustomAppBar from './components/AppBar';

function App() {
  return (
    <BrowserRouter>
    <CustomAppBar/>
      <Routes>
        <Route key='Home' path='/' element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
