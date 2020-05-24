import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import TimelinePage from './pages/TimelinePage/TimelinePage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ProfilePage />
      </Route>
      <Route exact path="/calendar">
        <CalendarPage />
      </Route>
      <Route exact path="/timeline">
        <TimelinePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRoutes;
