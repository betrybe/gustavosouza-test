import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TableHeader from '../components/TableHeader';
import api from '../service/api';
import './Wallet.css';

function Wallet() {
  const [currency, setCurrency] = useState([]);
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

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
  }, []);

  return (
    <>
      <Header />
      <form className="wallet-form">
        <label htmlFor="valor">
          Valor:
          <input type="number" id="valor" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select>
            {currency.map((currencyItem) => (
              <option key={ currencyItem.symbol } value={ currencyItem.symbol }>
                {currencyItem.symbol}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="metodo-pagamento">
          Método de pagamento:
          <select>
            {paymentMethod.map((paymentItem) => (
              <option key={ paymentItem } value={ paymentItem }>
                {paymentItem}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select>
            {tags.map((itemTag) => (
              <option key={ itemTag } value={ itemTag }>
                {itemTag}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input type="text" id="descricao" />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>

      <TableHeader />

      <div className="table-value">
        <span>Descrição</span>
        <span>Tag</span>
        <span>Método de pagamento</span>
        <span>Valor</span>
        <span>Moeda</span>
        <span>Câmbio utilizado</span>
        <span>Valor convertido</span>
        <span>Moeda convertida</span>
        <span>Editar/Excluir</span>
      </div>
    </>
  );
}

export default Wallet;
