import ACTIONS from '../constants/actions';

const actions = {
  login: (payload) => ({
    payload,
    type: ACTIONS.LOGIN_USER,
  }),
  add: (payload) => ({
    payload,
    type: ACTIONS.EXPENSES_ADD,
  }),
  remove: (payload) => ({
    payload,
    type: ACTIONS.EXPENSES_REMOVE,
  }),
  edit: (payload) => ({
    payload,
    type: ACTIONS.EXPENSES_REMOVE,
  }),
  addCurrency: (payload) => ({
    payload,
    type: ACTIONS.CURRENCY_ADD,
  }),
};

export default actions;
