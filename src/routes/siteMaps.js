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
          name: 'Event Attendence',
          to: paths.eventAttendence,
          active: true
        },
        {
          name: 'Event Check-In',
          to: paths.eventCheckIn,
          active: true
        }
      ]
    },
    {
      name: 'Marketing',
      icon: 'chart-line',
      active: true,
      children: [
        {
          name: 'item-to-be-set',
          to: '404',
          active: true
        }
      ]
    },
    {
      name: 'Reports',
      icon: 'chart-pie',
      active: true,
      children: [
        {
          name: 'item-to-be-set',
          to: '404',
          active: true
        }
      ]
    },
    {
      name: 'Miscellaneous',
      icon: 'shapes',
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
          // to: paths.emailDetail,
          active: true
        },
        {
          name: 'Audience management',
          to: paths.audience,
          active: true
        },
        {
          name: 'User Role Permission management',
          // to: paths.emailDetail,
          active: true
        }
      ]
    }
  ]
};

export default [dashboardRoutes, appRoutes];
