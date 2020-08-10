import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieDetails from '../pages/MovieDetails';
import UpcomingMovies from '../pages/UpcomingMovies';
import SignUp from '../pages/SignUp';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={UpcomingMovies} />

    <Route path="/login" component={SignUp} />

    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
);

export default Router;
