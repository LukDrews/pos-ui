/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import User from './User';

export default class Group extends Model {
  static entity = 'groups';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      users: this.hasMany(User, 'groupUuid'),
    };
  }

  static baseUrl = '/groups';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
