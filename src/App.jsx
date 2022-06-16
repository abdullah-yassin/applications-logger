import React from 'react';
import { HeaderComponent } from './Layouts/Home/Sections/Header/Header.Component';
import ApplicationsView from './Views/Home/applications-logger/ApplicationsLogger.View';

const App = () => {
    return (
    <>
      <HeaderComponent />
      <div className="container-wrapper">
        <ApplicationsView />
      </div>
    </>
    );
};

export default App;
