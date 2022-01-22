/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import User from './User';
import OrderItem from './OrderItem';

export default class Order extends Model {
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

  static baseUrl = '/orders';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
