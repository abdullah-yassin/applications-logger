import { HomeRoutes } from './Children';

import HomeLayout from '../Layouts/Home/Home.Layout';

export const AppRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeLayout,
    layout: '',
    default: true,
    isRecursive: true,
    authorize: true,
    roles: [],
    isExact: false,
    isRoute: true,
    children: HomeRoutes,
  },
];
