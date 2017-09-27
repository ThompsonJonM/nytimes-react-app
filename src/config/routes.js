// Dependencies
import React from 'react';
import Router from 'react-router';
import Saved from '../Components/Saved';
import Search from '../Components/Search';
import Main from '../Components/Main';

const Route = Router.Route;

const IndexRoute = Router.IndexRoute;

const appRoutes = (
    <Route path='/' component={Main}>

        <Route path='Search' component={Search} />

        <Route path='Saved' component={Saved} />

        <IndexRoute component={Search} />

    </ Route>
);

export default appRoutes;