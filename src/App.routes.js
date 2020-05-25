import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CalendarPage from './pages/CalendarPage/CalendarPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ProfilePage />
      </Route>
      <Route exact path="/calendar">
        <CalendarPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRoutes;
