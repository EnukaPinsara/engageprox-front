// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Card, Col, Row } from 'react-bootstrap';
// import Background from 'components/common/Background';
// import Flex from 'components/common/Flex';
// import Section from 'components/common/Section';
// import { Player } from '@lottiefiles/react-lottie-player';

// import bgShape from 'assets/img/illustrations/bg-shape.png';
// import shape1 from 'assets/img/illustrations/shape-1.png';
// import halfCircle from 'assets/img/illustrations/half-circle.png';
// import loginAnimation from 'assets/animations/login-animation.json';

// const AuthCardLayout = ({ leftSideContent, children, footer = true }) => {
//   return (
//     <Section fluid className="py-0">
//       <Row className="g-0 min-vh-100 flex-center">
//         <Col lg={8} xxl={5} className="py-3 position-relative">
//           <img
//             className="bg-auth-circle-shape"
//             src={bgShape}
//             alt=""
//             width="250"
//           />
//           <img
//             className="bg-auth-circle-shape-2"
//             src={shape1}
//             alt=""
//             width="150"
//           />
//           <Card className="overflow-hidden z-1">
//             <Card.Body className="p-0">
//               <Row className="h-100 g-0">
//                 <Col md={5} className="text-white text-center bg-card-gradient">
//                   <div className="position-relative p-4 pt-md-5 pb-md-7">
//                     <Background
//                       image={halfCircle}
//                       className="bg-auth-card-shape"
//                     />
//                     {/* <h3 className="font-sans-serif fw-medium fs-6">Welcome to EngageProX</h3> */}
//                     <div className="d-flex justify-content-center align-items-center">
//                       <Player
//                         autoplay
//                         loop
//                         src={loginAnimation}
//                         style={{ height: '400px', width: 'auto' }}
//                       />
//                     </div>
//                   </div>
//                 </Col>
//                 <Col
//                   md={7}
//                   as={Flex}
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <div className="p-4 p-md-5 flex-grow-1">{children}</div>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Section>
//   );
// };

// AuthCardLayout.propTypes = {
//   leftSideContent: PropTypes.node,
//   children: PropTypes.node.isRequired,
//   footer: PropTypes.bool
// };

// export default AuthCardLayout;

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card } from 'react-bootstrap';
import Section from 'components/common/Section';
import { Player } from '@lottiefiles/react-lottie-player';
import Background from 'components/common/Background';

import bgShape from 'assets/img/illustrations/bg-shape.png';
import shape1 from 'assets/img/illustrations/shape-1.png';
import halfCircle from 'assets/img/illustrations/half-circle.png';

const AuthCardLayout = ({ leftSideContent, children, showLeftSection }) => {
  return (
    <Section fluid className="py-0">
      <Row className="g-0 min-vh-100 flex-center">
        <Col lg={8} xxl={5} className="py-3 position-relative">
          <img
            className="bg-auth-circle-shape"
            src={bgShape}
            alt=""
            width="250"
          />
          <img
            className="bg-auth-circle-shape-2"
            src={shape1}
            alt=""
            width="150"
          />
          <Card className="overflow-hidden z-1">
            <Card.Body className="p-0">
              <Row className="h-100 g-0">
                {showLeftSection && (
                  // <Col md={5} className="text-white text-center bg-card-gradient">
                  //   <div className="position-relative p-4 pt-md-5 pb-md-7">
                  //     <Background image={halfCircle} className="bg-auth-card-shape" />
                  //     <div className="d-flex justify-content-center align-items-center">
                  //       {leftSideContent}
                  //     </div>
                  //   </div>
                  // </Col>
                  <Col
                    md={5}
                    className="text-white text-center bg-card-gradient pb-5"
                  >
                    <div className="position-relative h-100 d-flex justify-content-center align-items-center">
                      <Background
                        image={halfCircle}
                        className="bg-auth-card-shape"
                      />
                      <div className="d-flex justify-content-center align-items-center h-100">
                        {leftSideContent}
                      </div>
                    </div>
                  </Col>
                )}
                <Col
                  md={showLeftSection ? 7 : 12}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="p-4 p-md-5 flex-grow-1">{children}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};

AuthCardLayout.propTypes = {
  leftSideContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  showLeftSection: PropTypes.bool
};

AuthCardLayout.defaultProps = {
  showLeftSection: false
};

export default AuthCardLayout;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, Col, Row, Image } from 'react-bootstrap';
// import { Player } from '@lottiefiles/react-lottie-player';
// import Background from 'components/common/Background';
// import Section from 'components/common/Section';
// import Flex from 'components/common/Flex';

// import bgShape from 'assets/img/illustrations/bg-shape.png';
// import shape1 from 'assets/img/illustrations/shape-1.png';
// import halfCircle from 'assets/img/illustrations/half-circle.png';
// import loginAnimation from 'assets/animations/login-animation.json';

// const AuthCardLayout = ({ children }) => {
//   return (
//     <Section fluid className="py-0">
//       <Row className="g-0 min-vh-100 flex-center bg-light">
//         <Col lg={8} xxl={5} className="py-3 position-relative">
//           <img className="bg-auth-circle-shape" src={bgShape} alt="" width="250" />
//           <img className="bg-auth-circle-shape-2" src={shape1} alt="" width="150" />
//           <Card className="overflow-hidden z-1 shadow-lg" style={{ borderRadius: '20px', border: 'none' }}>
//             <Card.Body className="p-0">
//               <Row className="h-100 g-0">
//                 {/* Left side - Lottie Animation */}
//                 <Col md={5} className="text-white text-center bg-card-gradient position-relative">
//                   <div className="position-relative p-4 pt-md-5 pb-md-7">
//                     <Background image={halfCircle} className="bg-auth-card-shape" />
//                     <div className="d-flex justify-content-center align-items-center mt-4">
//                       <Player autoplay loop src={loginAnimation} style={{ height: '250px', width: 'auto' }} />
//                     </div>
//                     <p className="mt-3 font-sans-serif fw-medium">Effortlessly manage your events, bookings, and teams all in one place</p>
//                   </div>
//                 </Col>

//                 {/* Right side - Form Content */}
//                 <Col md={7} as={Flex} alignItems="center" justifyContent="center">
//                   <div className="p-5 flex-grow-1 d-flex flex-column align-items-center">
//                     {children}
//                   </div>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Section>
//   );
// };

// AuthCardLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default AuthCardLayout;
