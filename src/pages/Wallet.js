import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import PaymentMethod from '../constants/PaymentMethod';
import Tags from '../constants/tags';
import api from '../service/api';
import ConvertObjectToArray from '../util/ConvertObjectToArray';
import './Wallet.css';

function Wallet() {
  const [currencies, setCurrencies] = useState([]);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.wallet.expenses);

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
      setCurrencies(listCurrency);
    }
    loadCurrency();
  }, [currencies]);

  function handleSubmit(eventoSubmit) {
    eventoSubmit.preventDefault();
    const { value } = valueRef.current;
    const curr = currencyRef.current.value;
    const method = paymentMethodRef.current.value;
    const tag = tagRef.current.value;
    const description = descriptionRef.current.value;

    dispatch(actions.add({
      value, currency: curr, method, tag, description,
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
            <span>{item.value}</span>
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
