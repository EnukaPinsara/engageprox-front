// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';
// import logo from 'assets/img/illustrations/falcon.png';

// const Logo = ({ at = 'auth', width = 58, className, textClass, ...rest }) => {
//   return (
//     <Link
//       to="/"
//       className={classNames(
//         'text-decoration-none',
//         { 'navbar-brand text-left': at === 'navbar-vertical' },
//         { 'navbar-brand text-left': at === 'navbar-top' }
//       )}
//       {...rest}
//     >
//       <div
//         className={classNames(
//           'd-flex',
//           {
//             'align-items-center py-3': at === 'navbar-vertical',
//             'align-items-center': at === 'navbar-top',
//             'flex-center fw-bolder fs-4 mb-4': at === 'auth'
//           },
//           className
//         )}
//       >
//         <img className="me-2" src={logo} alt="Logo" width={width} />
//         <span className={classNames('font-sans-serif', textClass)}>falcon</span>
//       </div>
//     </Link>
//   );
// };

// Logo.propTypes = {
//   at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
//   width: PropTypes.number,
//   className: PropTypes.string,
//   textClass: PropTypes.string
// };

// export default Logo;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logo from 'assets/img/logos/logo-white-bg-horizontal-transparent.png';

const Logo = ({ at = 'auth', className, ...rest }) => {
  const getLogoWidth = () => {
    if (window.innerWidth >= 1200) return 200;
    if (window.innerWidth >= 992) return 160;
    if (window.innerWidth >= 768) return 120;
    return 100;
  };

  return (
    <Link
      to="/"
      className={classNames(
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          'd-flex',
          {
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center': at === 'auth'
          },
          className
        )}
      >
        <img
          src={logo}
          alt="Logo"
          width={getLogoWidth()} // Dynamically set the width based on screen size
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  className: PropTypes.string
};

export default Logo;

// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';
// import logo from 'assets/img/logos/logo-white-bg-horizontal-transparent.png';

// const Logo = ({ at = 'auth', width = '100%', className, ...rest }) => {
//   return (
//     <Link
//       to="/"
//       className={classNames(
//         { 'navbar-brand text-left': at === 'navbar-vertical' },
//         { 'navbar-brand text-left': at === 'navbar-top' }
//       )}
//       {...rest}
//     >
//       <div
//         className={classNames(
//           'd-flex',
//           {
//             'align-items-center py-3': at === 'navbar-vertical',
//             'align-items-center': at === 'navbar-top',
//             'flex-center': at === 'auth'
//           },
//           className
//         )}
//       >
//         <img
//           src={logo}
//           alt="Logo"
//           width={width}
//           style={{ maxWidth: '100%', height: 'auto' }} // Ensures it takes the full available space
//         />
//       </div>
//     </Link>
//   );
// };

// Logo.propTypes = {
//   at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   className: PropTypes.string
// };

// export default Logo;
