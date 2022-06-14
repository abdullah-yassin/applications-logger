import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { SwitchRouteComponent } from './Components';
import { AppRoutes } from './Routes';

const App = () => {
    return (
        <Router>
            <SwitchRouteComponent routes={AppRoutes} />
        </Router>
    );
};

export default App;
