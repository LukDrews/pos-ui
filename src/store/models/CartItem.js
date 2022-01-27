/* eslint-disable import/no-cycle */
import ApiBase from './ApiBase';
import { Product } from '.';

export default class CartItem extends ApiBase {
  static entity = 'cartItems';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      productUuid: this.string(null),
      product: this.belongsTo(Product, 'productUuid'),
      count: this.number(null),
    };
  }

  static apiConfig = {
    ...super.apiConfig,
    url: '/cart',
  };
}
