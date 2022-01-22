/* eslint-disable import/no-cycle */
import ApiBase from './ApiBase';
import { User, OrderItem } from '.';

export default class Order extends ApiBase {
  static entity = 'orders';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      userUuid: this.string(null),
      user: this.belongsTo(User, 'userUuid'),
      items: this.hasMany(OrderItem, 'orderUuid'),
      amount: this.attr(null),
    };
  }

  static apiConfig = {
    ...super.apiConfig,
    url: '/orders',
  };
}
