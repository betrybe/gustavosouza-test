function MoneyScheme(value, code = 'R$') {
  return `${code} ${Number(value).toFixed(2)}`;
}

export default MoneyScheme;
