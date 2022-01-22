/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import { Product } from '.';

export default class CartItem extends Model {
  static entity = 'cartItems';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      productUuid: this.string(null),
      product: this.belongsTo(Product),
      count: this.number(null),
    };
  }

  static baseUrl = '/cart';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
