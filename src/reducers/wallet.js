// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import ACTIONS from '../constants/actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  const { expenses, currencies } = state;

  switch (type) {
  case ACTIONS.CURRENCIES_ADD:
    return { ...state, currencies: [...currencies, payload] };
  case ACTIONS.CURRENCIES_REMOVE:
    return { ...state,
      currencies: currencies.filter((currency) => (
        currency !== payload)) };
  case ACTIONS.EXPENSES_ADD:
    return { ...state, expenses: [...expenses, payload] };
  case ACTIONS.EXPENSES_REMOVE:
    return { ...state, expenses: expenses.filter((expense) => (expense !== payload)) };
  default:
    return state;
  }
}

export default wallet;
