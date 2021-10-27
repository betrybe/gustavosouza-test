import React from 'react';
import './styles.css';

function TableHeader() {
  return (
    <div className="table-key">
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
  );
}

export default TableHeader;
