/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
// import { OrderItem } from '.';

export default class Product extends Model {
  static entity = 'products';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      price: this.number(null),
      barcode: this.string(null),
      //   orderItems: this.hansMany(OrderItem, 'productUuid'),
    };
  }

  static baseUrl = '/products';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
