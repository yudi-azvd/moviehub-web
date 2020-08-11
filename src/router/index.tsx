import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieDetails from '../pages/MovieDetails';
import UpcomingMovies from '../pages/UpcomingMovies';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={UpcomingMovies} />

    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />

    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
);

export default Router;
