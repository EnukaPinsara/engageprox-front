import paths, { rootPaths } from './paths';

export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      to: rootPaths.root
    }
  ]
};

export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Events Management',
      icon: 'trophy',
      active: true,
      children: [
        {
          name: 'Create new event',
          to: paths.createEvent,
          active: true
        },
        {
          name: 'View all events',
          to: paths.events,
          active: true
        }
        // {
        //   name: 'Event Registration',
        //   to: paths.eventList,
        //   active: true
        // }
      ]
    },
    {
      name: 'Post Events Management',
      icon: 'clock',
      active: true,
      children: [
        {
          name: 'QR Manager',
          to: paths.eventAttendence,
          active: true
        },
        {
          name: 'Parking Management',
          to: '404',
          active: true
        },
      ]
    },
    {
      name: 'Attendance Management',
      icon: 'user',
      active: true,
      children: [
        {
          name: 'Event Check-In',
          to: paths.eventCheckIn,
          active: true
        },
        {
          name: 'Parking Check-In',
          to: '404',
          active: true
        },
      ]
    },
    {
      name: 'Marketing Management',
      icon: 'chart-line',
      active: true,
      children: [
        {
          name: 'View all Campaigns',
          to: '404',
          active: true
        },
        {
          name: 'Create new Campaign',
          to: '404',
          active: true
        }
      ]
    },
    {
      name: 'Reports and Analytics',
      icon: 'chart-pie',
      active: true,
      // children: [
      //   {
      //     name: 'item-to-be-set',
      //     to: '404',
      //     active: true
      //   }
      // ]
    },
    {
      name: 'Settings',
      icon: 'wrench',
      active: true,
      children: [
        {
          name: 'Employee management',
          to: paths.employees,
          active: true
        },
        {
          name: 'User management',
          to: paths.users,
          active: true
        },
        {
          name: 'Role/Group management',
          to: '404',
          active: true
        },
        {
          name: 'Audience management',
          to: paths.audience,
          active: true
        },
        {
          name: 'Miscellaneous',
          active: true,
          children: [
            {
              name: 'Designations',
              to: paths.designations,
              active: true
            },
            {
              name: 'Departments',
              to: paths.departments,
              active: true
            },
            {
              name: 'Business Units',
              to: paths.businessUnits,
              active: true
            },
            {
              name: 'Employee Types',
              to: paths.employeeTypes,
              active: true
            }
          ]
        },
      ]
    }
  ]
};

export default [dashboardRoutes, appRoutes];
