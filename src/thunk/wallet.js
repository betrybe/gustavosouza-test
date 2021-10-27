import actions from '../actions';
import api from '../service/api';

const walletThunk = {
  get: ({ value, currency, method, tag, description }) => async (dispatch) => {
    const response = await api.get('/json/all');
    const objeto = {
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
