import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import api from '../service/api';
import './Wallet.css';

function Wallet() {
  const [currency, setCurrency] = useState([]);
  const dispatch = useDispatch();
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const valorRef = useRef({ valor: '' });
  const moedaRef = useRef({ moeda: '' });
  const metPagRef = useRef({ metodoPagamento: '' });
  const tagRef = useRef({ tag: '' });
  const descricaoRef = useRef({ descricao: '' });

  function convertObjectToArray(object) {
    return Object.keys(object).map((chave) => {
      const newObject = object[chave];
      newObject.symbol = chave;
      return newObject;
    });
  }

  useEffect(() => {
    async function loadCurrency() {
      const response = await api.get('/json/all');
      const listCurrency = convertObjectToArray(response.data).filter((curr) => (
        curr.symbol !== 'USDT'
      ));
      setCurrency(listCurrency);
    }
    loadCurrency();
  }, [currency]);

  function handleSubmit(eventoSubmit) {
    eventoSubmit.preventDefault();
    const { value } = valorRef.current;
    const curr = moedaRef.current.value;
    const method = metPagRef.current.value;
    const tag = tagRef.current.value;
    const description = descricaoRef.current.value;
    dispatch(actions.add({
      value, currency: curr, method, tag, description,
    }));
  }

  return (
    <>
      <Header />
      <form className="wallet-form" onSubmit={ handleSubmit }>
        <label htmlFor="valor">
          Valor:
          <input type="number" id="valor" ref={ valorRef } />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select ref={ moedaRef }>
            {currency.map((currencyItem) => (
              <option key={ currencyItem.symbol } value={ currencyItem.symbol }>
                {currencyItem.symbol}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="metodo-pagamento">
          Método de pagamento:
          <select ref={ metPagRef }>
            {paymentMethod.map((paymentItem) => (
              <option key={ paymentItem } value={ paymentItem }>
                {paymentItem}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select ref={ tagRef }>
            {tags.map((itemTag) => (
              <option key={ itemTag } value={ itemTag }>
                {itemTag}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input type="text" id="descricao" ref={ descricaoRef } />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>

      <TableHeader />

      {/* {
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
      } */}

    </>
  );
}

export default Wallet;
