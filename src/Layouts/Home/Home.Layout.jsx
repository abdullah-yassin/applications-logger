import React from 'react';
import {HeaderComponent} from './Sections';
import ApplicationsView from '../../Views/Home/applications-logger/ApplicationsLogger.View';
import './Home.Style.scss';

const HomeLayout = () => {
  return (
    <>
      <HeaderComponent />
      <div className="container-wrapper">
        <ApplicationsView />
      </div>
    </>
  );
};

export default HomeLayout;
