import ACTIONS from '../constants/actions';

const actions = {
  login: (task) => ({
    payload: task,
    type: ACTIONS.LOGIN_USER,
  }),
  add: (task) => ({
    payload: task,
    type: ACTIONS.EXPENSES_ADD,
  }),
  remove: (task) => ({
    payload: task,
    type: ACTIONS.EXPENSES_REMOVE,
  }),
  edit: (task) => ({
    payload: task,
    type: ACTIONS.EXPENSES_REMOVE,
  }),
};

export default actions;
