import ApiBase from "./ApiBase";
import { User, OrderItem } from ".";

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
      amount: this.attr(null),
      createdAt: this.attr(null),
    };
  }

  get amountFormatted() {
    return formatters.toCurrencyFormat(this.amount);
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/orders",
  };
}
