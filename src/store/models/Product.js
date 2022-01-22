/* eslint-disable import/no-cycle */
import ApiBase from './ApiBase';
import { OrderItem } from '.';

export default class Product extends ApiBase {
  static entity = 'products';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      price: this.number(null),
      barcode: this.string(null),
      orderItems: this.hasMany(OrderItem, 'productUuid'),
    };
  }

  static apiConfig = {
    ...super.apiConfig,
    url: '/products',
  };
}
