import ApplicationsView from '../../../Views/Home/applications-logger/ApplicationsLogger.View';

export const HomeRoutes = [
  {
    id: 1,
    path: '/administration/applications-logger',
    name: 'applications-logger',
    component: ApplicationsView,
    layout: '/home',
    default: true,
    isExact: true,
    isRoute: true,
    authorize: true,
    roles: [],
    icon: 'mdi mdi-log',
    isDisabled: false,
    children: [],
  },
];