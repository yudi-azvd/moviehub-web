import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieDetails from '../pages/MovieDetails';
import UpcomingMovies from '../pages/UpcomingMovies';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={UpcomingMovies} />
    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
);

export default Router;
