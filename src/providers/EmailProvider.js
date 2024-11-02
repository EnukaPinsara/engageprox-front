import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { emailReducer } from 'reducers/emailReducer';
import rawEmails from 'data/email/emails';

export const EmailContext = createContext({ emails: [] });

const EmailProvider = ({ children }) => {
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    emails: rawEmails,
    allEmails: rawEmails,
    filters: ['all', 'unread', 'star', 'attachments', 'archive', 'snooze'],
    currentFilter: 'all'
  });

  return (
    <EmailContext.Provider value={{ emailState, emailDispatch }}>
      {children}
    </EmailContext.Provider>
  );
};

EmailProvider.propTypes = { children: PropTypes.node };

export const useEmailContext = () => useContext(EmailContext);

export default EmailProvider;
