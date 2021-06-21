import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/home';
import SignIn from './components/user-auth/sign-in';
import SignUp from './components/user-auth/sign-up';
import Dashboard from './components/user-auth/dashboard';
import EditAccount from './components/user-auth/edit-account';
import DepositToPersonalAccount from './components/user-auth/deposit-money-to-account';
import DepositToGroupAccount from './components/user-auth/deposit-money-to-group';
import Groups from './components/groups/groups';
import PartGroups from './components/groups/part-of-group';
import Group from './components/groups/get-a-group';
import CreateGroup from './components/groups/create-group';
import UpdateGroup from './components/groups/update-group';
import TransactionHistory from './components/transactions/history';
import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/settings" component={EditAccount} />
        <Route exact path="/groups" component={Groups} />
        <Route exact path="/group/:email" component={PartGroups} />
        <Route exact path="/add-money" component={DepositToPersonalAccount} />
        <Route exact path="/create-group" component={CreateGroup} />
        <Route exact path="/update-group/:id" component={UpdateGroup} />
        <Route
          exact
          path="/group-money/:id"
          component={DepositToGroupAccount}
        />
        <Route exact path="/one-group/:id" component={Group} />
        <Route exact path="/history" component={TransactionHistory} />
      </Switch>
    </Router>
  );
}
