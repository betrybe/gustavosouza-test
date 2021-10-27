import ACTIONS from '../constants/actions';

const INITIAL_STATE = {
  countId: 0,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  const { expenses, countId } = state;

  switch (type) {
  case ACTIONS.EXPENSES_ADD:
    return { ...state, expenses: [...expenses, payload], countId: countId + 1 };
  case ACTIONS.EXPENSES_REMOVE:
    return { ...state, expenses: expenses.filter((expense) => (expense.id !== payload)) };
  case ACTIONS.CURRENCY_ADD:
    return { ...state, currencies: payload };
  default:
    return state;
  }
}

export default wallet;
