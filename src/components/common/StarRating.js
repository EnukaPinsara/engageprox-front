import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Rating as ReactRating } from 'react-simple-star-rating';

const StarRating = ({ ...options }) => {
  return (
    <ReactRating
      allowFraction
      fillIcon={<FontAwesomeIcon icon="star" className="text-warning" />}
      emptyIcon={<FontAwesomeIcon icon="star" className="text-300" />}
      {...options}
    />
  );
};

StarRating.propTypes = {
  iconClass: PropTypes.string,
  fillIconColor: PropTypes.string,
  emptyIconColor: PropTypes.string
};

export default StarRating;
