
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';



import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {



  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route key='Home' path='/' element={<HomePage/>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
