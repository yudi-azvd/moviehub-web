import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieDetails from '../pages/MovieDetails';
import UpcomingMovies from '../pages/UpcomingMovies';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={UpcomingMovies} />

    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />

    <Route exact path="/movies/:movieId" component={MovieDetails} />
    {/* ESSA ROTA DEVE SER _PRIVADA_ */}
    <Route path="/profile" component={Profile} />
  </Switch>
);

export default Router;
