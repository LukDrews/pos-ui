/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import User from './User';

export default class Role extends Model {
  static entity = 'roles';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      users: this.hasMany(User, 'roleUuid'),
    };
  }

  static baseUrl = '/roles';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
