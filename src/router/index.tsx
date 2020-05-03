import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieDetails from '../pages/MovieDetails';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/movies/:id" component={MovieDetails} />
  </Switch>
);

export default Router;
