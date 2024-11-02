import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import currentUserAvatar from 'assets/img/team/3.jpg';
import {
  members,
  labels,
  attachments,
  kanbanItems,
  comments,
  activities
} from 'data/kanban';
import { kanbanReducer } from 'reducers/kanbanReducer';

export const KanbanContext = createContext({
  KanbanColumns: [],
  kanbanTasks: []
});

const KanbanProvider = ({ children }) => {
  const initData = {
    members: members,
    labels: labels,
    attachments: attachments,
    kanbanItems: kanbanItems,
    comments: comments,
    activities: activities,
    kanbanModal: {
      show: false,
      modalContent: {}
    }
  };

  const currentUser = {
    name: 'Emma',
    avatarSrc: currentUserAvatar,
    profileLink: '/user/profile',
    institutionLink: '#!'
  };

  const [kanbanState, kanbanDispatch] = useReducer(kanbanReducer, initData);

  return (
    <KanbanContext.Provider
      value={{ kanbanState, kanbanDispatch, currentUser }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

KanbanProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useKanbanContext = () => useContext(KanbanContext);

export default KanbanProvider;
