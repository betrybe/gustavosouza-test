import actions from '../actions';
import api from '../service/api';

const walletThunk = {
  get: ({ id, value, currency, method, tag, description }) => async (dispatch) => {
    const response = await api.get('/json/all');
    const objeto = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: response.data,
    };
    dispatch(actions.add(objeto));
  },
};

export default walletThunk;
