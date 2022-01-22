/* eslint-disable import/no-cycle */
import ApiBase from './ApiBase';
import { Role, Group, Order } from '.';

export default class User extends ApiBase {
  static entity = 'users';

  static primaryKey = 'uuid';

  static fields() {
    return {
      uuid: this.string(null),
      firstName: this.attr(null),
      lastName: this.attr(null),
      birthDate: this.attr(null, (value) =>
        value ? new Date(value).toISOString().slice(0, 10) : null,
      ),
      roleUuid: this.attr(null),
      role: this.belongsTo(Role, 'roleUuid'),
      groupUuid: this.attr(null),
      group: this.belongsTo(Group, 'groupUuid'),
      orders: this.hasMany(Order, 'userUuid'),
      imageLink: this.attr(null),
    };
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static apiConfig = {
    ...super.apiConfig,
    url: '/users',
  };

  static add(user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return super.add(formData);
  }

  static update(uuid, user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return super.update(uuid, formData);
  }
}
