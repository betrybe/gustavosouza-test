import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import ExchangeCalculation from '../../util/ExchangeCalculation';
import MoneyScheme from '../../util/MoneyScheme';
import './styles.css';

function Header() {
  const email = useSelector((state) => state.user.email);
  const { expenses } = useSelector((state) => state.wallet);

  function calculationValue() {
    let total = 0;
    expenses.forEach((item) => {
      total += ExchangeCalculation(item.value, item.exchangeRates[item.currency].ask);
    });
    return MoneyScheme(total);
  }

  return (
    <header className="header">
      <img src={ logo } alt="Logo Trybe" />
      <div className="info-header">
        <strong data-testid="email-field">
          Email:
          {`${email}`}
        </strong>
        <strong data-testid="total-field">
          Despesa Total:
          {` ${calculationValue()} `}
          <span data-testid="header-currency-field">BRL</span>
        </strong>
      </div>
    </header>
  );
}

export default Header;
