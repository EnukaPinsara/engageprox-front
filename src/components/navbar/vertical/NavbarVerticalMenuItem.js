// import React from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Flex from 'components/common/Flex';
// import SubtleBadge from 'components/common/SubtleBadge';

// const NavbarVerticalMenuItem = ({ route }) => {
//   return (
//     <Flex alignItems="center">
//       {route.icon && (
//         <span className="nav-link-icon">
//           <FontAwesomeIcon icon={route.icon} />
//         </span>
//       )}
//       <span className="nav-link-text ps-1">{route.name}</span>
//       {route.badge && (
//         <SubtleBadge pill bg={route.badge.type} className="ms-2">
//           {route.badge.text}
//         </SubtleBadge>
//       )}
//     </Flex>
//   );
// };

// // prop-types
// const routeShape = {
//   active: PropTypes.bool,
//   name: PropTypes.string.isRequired,
//   to: PropTypes.string,
//   icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
// };
// routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
// NavbarVerticalMenuItem.propTypes = {
//   route: PropTypes.shape(routeShape).isRequired
// };

// export default React.memo(NavbarVerticalMenuItem);

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Flex from 'components/common/Flex';
// import SubtleBadge from 'components/common/SubtleBadge';

// const NavbarVerticalMenuItem = ({ route }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     // You can use CSS or a prop to determine dark/light mode; here’s a basic example:
//     const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(darkModeMediaQuery.matches);

//     darkModeMediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
//     return () => darkModeMediaQuery.removeEventListener('change', (e) => setIsDarkMode(e.matches));
//   }, []);

//   const itemStyle = {
//     padding: '8px 16px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'background-color 0.3s',
//     color: isDarkMode ? '#FFFFFF' : '#333333', // White for dark mode, dark gray for light mode
//   };

//   const iconStyle = {
//     fontSize: '1.2em',
//     color: isDarkMode ? '#8ab4f8' : '#007bff', // Light blue for dark mode, primary blue for light mode
//   };

//   const textStyle = {
//     fontSize: '1em',
//     fontWeight: '500',
//     paddingLeft: '8px',
//     color: isDarkMode ? '#FFFFFF' : '#333333',
//   };

//   const handleMouseEnter = (e) => {
//     e.target.style.backgroundColor = isDarkMode ? '#333333' : '#e9ecef';
//   };

//   const handleMouseLeave = (e) => {
//     e.target.style.backgroundColor = 'transparent';
//   };

//   return (
//     <Flex
//       style={itemStyle}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {route.icon && (
//         <span className="me-2" style={iconStyle}>
//           <FontAwesomeIcon icon={route.icon} />
//         </span>
//       )}
//       <span style={textStyle}>{route.name}</span>
//       {route.badge && (
//         <SubtleBadge pill bg={route.badge.type} className="ms-2">
//           {route.badge.text}
//         </SubtleBadge>
//       )}
//     </Flex>
//   );
// };

// const routeShape = {
//   active: PropTypes.bool,
//   name: PropTypes.string.isRequired,
//   to: PropTypes.string,
//   icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
// };
// routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
// NavbarVerticalMenuItem.propTypes = {
//   route: PropTypes.shape(routeShape).isRequired,
// };

// export default React.memo(NavbarVerticalMenuItem);

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Flex from 'components/common/Flex';
// import SubtleBadge from 'components/common/SubtleBadge';

// const NavbarVerticalMenuItem = ({ route }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(darkModeMediaQuery.matches);
//     darkModeMediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
//     return () => darkModeMediaQuery.removeEventListener('change', (e) => setIsDarkMode(e.matches));
//   }, []);

//   const itemStyle = {
//     padding: '8px 16px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'background-color 0.3s, border 0.3s',
//     color: isDarkMode ? '#FFFFFF' : '#333333',
//     borderLeft: isHovered ? (isDarkMode ? '3px solid #8ab4f8' : '3px solid #007bff') : '3px solid transparent',
//     backgroundColor: isHovered ? (isDarkMode ? '#151E2C' : '#EFEEEA') : 'transparent',
//   };

//   const iconStyle = {
//     fontSize: '1.2em',
//     color: isDarkMode ? '#606D82' : '#007bff',
//   };

//   const textStyle = {
//     fontSize: '1em',
//     fontWeight: '500',
//     paddingLeft: '8px',
//     color: isDarkMode ? '#606D82' : '#333333',
//   };

//   const handleMouseEnter = () => setIsHovered(true);
//   const handleMouseLeave = () => setIsHovered(false);

//   return (
//     <Flex
//       style={itemStyle}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {route.icon && (
//         <span className="me-2" style={iconStyle}>
//           <FontAwesomeIcon icon={route.icon} />
//         </span>
//       )}
//       <span style={textStyle}>{route.name}</span>
//       {route.badge && (
//         <SubtleBadge pill bg={route.badge.type} className="ms-2">
//           {route.badge.text}
//         </SubtleBadge>
//       )}
//     </Flex>
//   );
// };

// const routeShape = {
//   active: PropTypes.bool,
//   name: PropTypes.string.isRequired,
//   to: PropTypes.string,
//   icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
// };
// routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
// NavbarVerticalMenuItem.propTypes = {
//   route: PropTypes.shape(routeShape).isRequired,
// };

// export default React.memo(NavbarVerticalMenuItem);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import SubtleBadge from 'components/common/SubtleBadge';

const NavbarVerticalMenuItem = ({ route, isActive }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);

    // Set initial dark mode state
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const itemStyle = {
    padding: '8px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s, border 0.3s',
    color: isDarkMode ? '#FFFFFF' : '#333333',
    borderLeft: isHovered || isActive ? (isDarkMode ? '3px solid #8ab4f8' : '3px solid #007bff') : '3px solid transparent',
    backgroundColor: isHovered || isActive ? (isDarkMode ? '#EFEEEA' : '#151E2C') : 'transparent',
  };

  const iconStyle = {
    fontSize: '1.2em',
    color: isDarkMode ? '#606D82' : '#007bff',
  };

  const textStyle = {
    fontSize: '1em',
    fontWeight: '500',
    paddingLeft: '8px',
    color: isDarkMode ? '#606D82' : '#333333',
  };

  return (
    <Flex
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {route.icon && (
        <span className="me-2" style={iconStyle}>
          <FontAwesomeIcon icon={route.icon} />
        </span>
      )}
      <span style={textStyle}>{route.name}</span>
      {route.badge && (
        <SubtleBadge pill bg={route.badge.type} className="ms-2">
          {route.badge.text}
        </SubtleBadge>
      )}
    </Flex>
  );
};

const routeShape = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape(routeShape).isRequired,
};

export default React.memo(NavbarVerticalMenuItem);
