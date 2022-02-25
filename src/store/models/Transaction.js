import ApiBase from "./ApiBase";
import { User, Order } from ".";

import formatters from "../../utils/formatters";

export default class Transaction extends ApiBase {
  static entity = "transactions";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.string(null),
      userUuid: this.string(null),
      user: this.belongsTo(User, "userUuid"),
      order: this.hasOne(Order, "transactionUuid"),
      amount: this.attr(null),
      createdAt: this.attr(null),
    };
  }

  get amountFormatted() {
    return formatters.toCurrencyFormat(this.amount);
  }

  get type() {
    if (this.order) {
      return "Order";
    } else if (this.amount < 0) {
      return "Withdrawal";
    } else if (this.amount >= 0) {
      return "Deposit";
    }
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/transactions",
  };
}
