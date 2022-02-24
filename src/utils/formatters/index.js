import Dinero from "dinero.js";

const toCurrencyFormat = (amount, currency = "EUR", locale = "de-DE") => {
  return Dinero({ amount, currency }).setLocale(locale).toFormat();
};

export default {
  toCurrencyFormat,
};
