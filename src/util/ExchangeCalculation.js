import MoneyScheme from './MoneyScheme';

function ExchangeCalculation(value, exchange) {
  return MoneyScheme(Number(value) * Number(exchange));
}

export default ExchangeCalculation;
