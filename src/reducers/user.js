import ACTIONS from '../constants/actions';

const INITIAL_STATE = {
  email: '',
};

// Esse reducer será responsável por tratar as informações da pessoa usuária
function user(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  case ACTIONS.LOGIN_USER:
    return { ...state, email: payload };
  default:
    return state;
  }
}

export default user;
