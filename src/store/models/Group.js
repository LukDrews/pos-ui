/* eslint-disable import/no-cycle */
import ApiBase from './ApiBase';
import { User } from '.';

export default class Group extends ApiBase {
  static entity = 'groups';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      users: this.hasMany(User, 'groupUuid'),
    };
  }

  static apiConfig = {
    ...super.apiConfig,
    url: '/groups',
  };
}
