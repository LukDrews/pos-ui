import ApiBase from "./ApiBase";
import { OrderItem } from ".";

import formatters from "../../utils/formatters";

export default class Product extends ApiBase {
  static entity = "products";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      price: this.number(null),
      barcode: this.attr(null),
      orderItems: this.hasMany(OrderItem, "productUuid"),
    };
  }

  get priceFormatted() {
    return formatters.toCurrencyFormat(this.price);
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/products",
  };
}
