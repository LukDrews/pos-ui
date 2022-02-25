import ApiBase from "./ApiBase";
import { User, OrderItem, Transaction } from ".";

import formatters from "../../utils/formatters";

export default class Order extends ApiBase {
  static entity = "orders";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.string(null),
      userUuid: this.string(null),
      user: this.belongsTo(User, "userUuid"),
      items: this.hasMany(OrderItem, "orderUuid"),
      transactionUuid: this.string(null),
      transaction: this.belongsTo(Transaction, "transactionUuid"),
      amount: this.attr(null),
      createdAt: this.attr(null),
    };
  }

  get amountFormatted() {
    return formatters.toCurrencyFormat(this.amount);
  }

  get itemCount() {
    return this.items.reduce((acc, curr) => acc + Number(curr.count), 0);
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/orders",
  };
}
