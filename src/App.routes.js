import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ActivityDetailPage from './pages/ActivityDetailPage/ActivityDetailPage';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <ProfilePage />
      </Route>
      <Route exact path="/calendar">
        <CalendarPage />
      </Route>
      <Route exact path="/activity/:activityID">
        <ActivityDetailPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default AppRoutes;
