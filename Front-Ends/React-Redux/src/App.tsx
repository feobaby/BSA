import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/sign-up';
import Header from './Components/Header/header';
import './App.css';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Header} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </Router>
  );
};
