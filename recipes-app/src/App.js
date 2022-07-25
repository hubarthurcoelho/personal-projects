import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import MyProvider from './Context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </MyProvider>
  );
}

export default App;
