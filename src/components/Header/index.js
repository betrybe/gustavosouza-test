import React from 'react';
import logo from '../../assets/logo.png';
import './styles.css';

function Header() {
  return (
    <header className="header">
      <img src={ logo } alt="Logo Trybe" />
      <div className="info-header">
        <strong data-testid="email-field">Email: alguem@email.com</strong>
        <strong data-testid="total-field">
          Despesa Total: R$0.00
          <span data-testid="header-currency-field">BRL</span>
        </strong>
      </div>
    </header>
  );
}

export default Header;
