import React from 'react';
import App from 'App';
import paths, { rootPaths } from './paths';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import Landing from 'components/pages/landing/Landing';
import Profile from 'components/pages/user/profile/Profile';
import Settings from 'components/pages/user/settings/Settings';
import EventList from 'components/app/events/event-list/EventList';
import EventDetail from 'components/app/events/event-detail/EventDetail';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import Dashboard from 'components/dashboards/default';
import CardLogin from 'components/authentication/card/Login';
import CardLogout from 'components/authentication/card/Logout';
import CardOTPVerification from 'components/authentication/card/OTPVerification';
import Events from 'components/pages/events';
import CreateEvent from 'components/app/events/create-an-event/CreateEvent';
import EventDetails from 'components/pages/events/view-details';
import Employees from 'components/pages/employee';
import EmployeeDetails from 'components/pages/employee/employee-details';
import IndividualRecord from 'components/pages/employee/create-employee/IndividualRecord';
import Users from 'components/pages/users';
import AddUser from 'components/pages/users/create-user';
import Audience from 'components/pages/audince/audience';
import AudienceSettings from 'components/pages/audience-settings/audience-settings';
import CreateAudience from 'components/pages/create-audince/create-audience';
import AddContact from 'components/pages/audience-settings/add-contacts';
import Designations from 'components/pages/miscellaneous/designations';
import CreateDesignation from 'components/pages/miscellaneous/designations/create-designation';
import Departments from 'components/pages/miscellaneous/departments';
import CreateDepartment from 'components/pages/miscellaneous/departments/create-department';
import BusinessUnits from 'components/pages/miscellaneous/business-units';
import CreateBusinessUnit from 'components/pages/miscellaneous/business-units/create-business-unit';
import EmployeeTypes from 'components/pages/miscellaneous/employee-types';
import CreateEmployeeType from 'components/pages/miscellaneous/employee-types/create-employee-type';
import EventRegister from 'components/pages/events/event-register';
import ProtectedRoute from 'helpers/protect-route';
import EventAttendence from 'components/pages/event-attendence';
import EventCheckIn from 'components/pages/event-attendence/event-checkIn';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: 'landing',
        element: <Landing />
      },
      {
        path: rootPaths.errorsRoot,
        element: <ErrorLayout />,
        children: [
          {
            path: paths.error404,
            element: <Error404 />
          },
          {
            path: paths.error500,
            element: <Error500 />
          }
        ]
      },
      {
        path: rootPaths.authRoot,
        children: [
          {
            path: rootPaths.authCardRoot,
            children: [
              {
                path: paths.cardLogin,
                element: <CardLogin />
              },
              {
                path: paths.cardLogout,
                element: <CardLogout />
              },
              {
                path: paths.cardOTPVerification,
                element: <CardOTPVerification />
              }
            ]
          }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
          },
          {
            path: rootPaths.eventsRoot,
            children: [
              {
                path: paths.events,
                element: <Events />
              },
              {
                path: paths.createEvent,
                element: (
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                )
              },
              {
                path: paths.viewEvent,
                element: (
                  <ProtectedRoute>
                    <EventDetails />
                  </ProtectedRoute>
                )
              },
              {
                path: paths.eventDetail,
                element: <EventDetail />
              },
              {
                path: paths.eventRegister,
                element: <EventRegister />
              }
              // {
              //   path: paths.eventList,
              //   element: <EventList />
              // }
            ]
          },
          {
            path: rootPaths.attendenceRoot,
            children: [
              {
                path: paths.eventAttendence,
                element: <EventAttendence />
              },
              {
                path: paths.eventCheckIn,
                element: <EventCheckIn />
              }
            ]
          },
          {
            path: rootPaths.miscellaneousRoot,
            children: [
              {
                path: paths.designations,
                element: <Designations />
              },
              {
                path: paths.addDesignation,
                element: <CreateDesignation />
              },
              {
                path: paths.departments,
                element: <Departments />
              },
              {
                path: paths.addDepartment,
                element: <CreateDepartment />
              },
              {
                path: paths.businessUnits,
                element: <BusinessUnits />
              },
              {
                path: paths.addBusinessUnit,
                element: <CreateBusinessUnit />
              },
              {
                path: paths.employeeTypes,
                element: <EmployeeTypes />
              },
              {
                path: paths.addEmployeeType,
                element: <CreateEmployeeType />
              }
            ]
          },
          {
            path: rootPaths.eCommerceRoot,
            children: [
              {
                path: paths.employees,
                element: <Employees />
              },
              {
                path: paths.employeeDetails,
                element: <EmployeeDetails />
              },
              {
                path: paths.addEmployeeOptions,
                element: <Employees />
              },
              {
                path: paths.addBulkEmployees,
                element: <Employees />
              },
              {
                path: paths.addIndividualEmployee,
                element: <IndividualRecord />
              },
              {
                path: paths.users,
                element: <Users />
              },
              {
                path: paths.addUser,
                element: <AddUser />
              },
              {
                path: paths.audience,
                element: <Audience />
              },
              {
                path: paths.audienceSettings,
                element: <AudienceSettings />
              },
              {
                path: paths.audienceCreate,
                element: <CreateAudience />
              },
              {
                path: paths.addContact,
                element: <AddContact />
              }
            ]
          },
          {
            path: rootPaths.userRoot,
            children: [
              {
                path: paths.userProfile,
                element: <Profile />
              },
              {
                path: paths.userSettings,
                element: <Settings />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to={paths.error404} replace />
      }
    ]
  }
];

export const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL
});

export default routes;
