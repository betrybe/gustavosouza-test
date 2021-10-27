import ACTIONS from '../constants/actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  const { expenses } = state;

  switch (type) {
  case ACTIONS.EXPENSES_ADD:
    return { ...state, expenses: [...expenses, payload] };
  case ACTIONS.EXPENSES_REMOVE:
    return { ...state, expenses: expenses.filter((expense) => (expense !== payload)) };
  case ACTIONS.CURRENCY_ADD:
    return { ...state, currencies: payload };
  default:
    return state;
  }
}

export default wallet;
