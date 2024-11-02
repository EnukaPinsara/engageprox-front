import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { feedReducer } from 'reducers/feedReducer';
import rawFeeds from 'data/feed';

export const FeedContext = createContext({ feeds: [] });

const FeedProvider = ({ children }) => {
  const [feeds, feedDispatch] = useReducer(feedReducer, rawFeeds);

  return (
    <FeedContext.Provider value={{ feeds, feedDispatch }}>
      {children}
    </FeedContext.Provider>
  );
};

FeedProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFeedContext = () => useContext(FeedContext);

export default FeedProvider;
