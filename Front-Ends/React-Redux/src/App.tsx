import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Auth/sign-up';
import Homepage from './Components/Homepage/homepage';
import Dashboard from './Components/Dashboard/Main-Dashboard/main-dashboard';
import ProtectedRoute from './Routes/Protect-Routes/protect.route';
import SignIn from './Components/Auth/sign-in';
import './App.css';
import DashboardCreatedGroups from './Components/Dashboard/All-Created-Groups/all-created-groups';
import LineChartAnalytics from './Components/Analytics/Line-Chart/line-chart';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/signin" Component={DashboardCreatedGroups} />
        <Route path="/c" Component={LineChartAnalytics} />

      </Routes>
    </Router>
  );
};
