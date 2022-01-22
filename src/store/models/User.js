/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import Role from './Role';
import Group from './Group';

export default class User extends Model {
  static entity = 'users';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      firstName: this.attr(null),
      lastName: this.attr(null),
      roleUuid: this.attr(null),
      role: this.belongsTo(Role, 'roleUuid'),
      groupUuid: this.attr(null),
      group: this.belongsTo(Group, 'roleUuid'),
      imageLink: this.attr(null),
    };
  }

  static baseUrl = '/users';

  static fetch() {
    return this.api().get(this.baseUrl);
  }
}
