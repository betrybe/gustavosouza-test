import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import PaymentMethod from '../constants/PaymentMethod';
import Tags from '../constants/tags';
import api from '../service/api';
import walletThunk from '../thunk/wallet';
import ConvertObjectToArray from '../util/ConvertObjectToArray';
import './Wallet.css';

function Wallet() {
  const dispatch = useDispatch();
  const { expenses, currencies } = useSelector((state) => state.wallet);
  const valueRef = useRef({ value: '' });
  const currencyRef = useRef({ currency: '' });
  const paymentMethodRef = useRef({ paymentMethod: '' });
  const tagRef = useRef({ tag: '' });
  const descriptionRef = useRef({ description: '' });

  useEffect(() => {
    async function loadCurrency() {
      const response = await api.get('/json/all');
      const listCurrency = ConvertObjectToArray(response.data).filter((curr) => (
        curr.symbol !== 'USDT'
      ));
      dispatch(actions.addCurrency(listCurrency));
    }
    loadCurrency();
  }, [currencies, dispatch]);

  function handleSubmit(eventoSubmit) {
    eventoSubmit.preventDefault();

    dispatch(walletThunk.get({
      value: valueRef.current.value,
      currency: currencyRef.current.value,
      method: paymentMethodRef.current.value,
      tag: tagRef.current.value,
      description: descriptionRef.current.value,
    }));
  }

  return (
    <>
      <Header />
      <form className="wallet-form" onSubmit={ handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input type="number" id="value" ref={ valueRef } />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select ref={ currencyRef } id="currency">
            {currencies.map((currencyItem) => (
              <option key={ currencyItem.symbol } value={ currencyItem.symbol }>
                {currencyItem.symbol}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment-method">
          Método de pagamento:
          <select ref={ paymentMethodRef } id="payment-method">
            {PaymentMethod.map((paymentItem) => (
              <option key={ paymentItem } value={ paymentItem }>
                {paymentItem}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select ref={ tagRef } id="tag">
            {Tags.map((itemTag) => (
              <option key={ itemTag } value={ itemTag }>
                {itemTag}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" id="description" ref={ descriptionRef } />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>

      <TableHeader />

      {
        expenses.map((item) => (
          <div className="table-value" key={ item.tag }>
            <span>{item.description}</span>
            <span>{item.tag}</span>
            <span>{item.method}</span>
            <span>{Number(item.value).toFixed(2)}</span>
            <span>{item.currency}</span>
            <span>Câmbio utilizado</span>
            <span>Valor convertido</span>
            <span>Moeda convertida</span>
            <span>Editar/Excluir</span>
          </div>
        ))
      }

    </>
  );
}

export default Wallet;
