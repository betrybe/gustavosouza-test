import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';
import remove from '../assets/delete.png';
import edit from '../assets/edit.png';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import PaymentMethod from '../constants/PaymentMethod';
import Tags from '../constants/tags';
import api from '../service/api';
import walletThunk from '../thunk/wallet';
import ConvertObjectToArray from '../util/ConvertObjectToArray';
import ExchangeCalculation from '../util/ExchangeCalculation';
import MoneyScheme from '../util/MoneyScheme';
import './Wallet.css';

function Wallet() {
  const dispatch = useDispatch();
  const { expenses, currencies, countId } = useSelector((state) => state.wallet);
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
  }, [dispatch]);

  function handleSubmit(eventoSubmit) {
    eventoSubmit.preventDefault();

    dispatch(walletThunk.get({
      id: countId,
      value: valueRef.current.value,
      currency: currencyRef.current.value,
      method: paymentMethodRef.current.value,
      tag: tagRef.current.value,
      description: descriptionRef.current.value,
    }));
  }

  function handleDelete(id) {
    dispatch(actions.remove(id));
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
          <div className="table-value" key={ item.id }>
            <span>{item.description}</span>
            <span>{item.tag}</span>
            <span>{item.method}</span>
            <span>{MoneyScheme(item.value, item.currency)}</span>
            <span>{item.exchangeRates[item.currency].name.split('/')[0]}</span>
            <span>{MoneyScheme(item.exchangeRates[item.currency].ask)}</span>
            <span>
              {
                ExchangeCalculation(item.value, item.exchangeRates[item.currency].ask)
              }
            </span>
            <span>{item.exchangeRates[item.currency].name.split('/')[1]}</span>
            <span>
              <button type="button" data-testid="edit-btn">
                <img src={ edit } alt="remove" />
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => handleDelete(item.id) }
              >
                <img src={ remove } alt="remove" />
              </button>
            </span>
          </div>
        ))
      }

    </>
  );
}

export default Wallet;
