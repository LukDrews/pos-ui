import { Model } from "@vuex-orm/core";
import { Product, Order } from ".";

import formatters from "../../utils/formatters";

export default class OrderItem extends Model {
  static entity = "orderItems";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.string(null),
      orderUuid: this.string(null),
      order: this.belongsTo(Order, "orderUuid"),
      productUuid: this.string(null),
      product: this.belongsTo(Product, "productUuid"),
      count: this.number(null),
      amount: this.number(null),
    };
  }

  get amountFormatted() {
    return formatters.toCurrencyFormat(this.amount);
  }
}
