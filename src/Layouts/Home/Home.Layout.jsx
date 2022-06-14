import React from 'react';
import { SwitchRouteComponent } from '../../Components';
import { HomeRoutes } from '../../Routes';
import {HeaderComponent} from './Sections';
import './Home.Style.scss';

const HomeLayout = () => {
  return (
    <>
      <HeaderComponent />
      <div className="container-wrapper">
        <SwitchRouteComponent routes={HomeRoutes} />
      </div>
    </>
  );
};

export default HomeLayout;
