/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';
import { Role, Group, Order } from '.';

export default class User extends Model {
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

  static baseUrl = '/users';

  static apiConfig = {
    url: this.baseUrl, // pass url to fetch, get, create ...
    actions: {
      $fetch() {
        return this.get(`${this.model.apiConfig.url}`);
      },
      $get(uuid) {
        return this.get(`${this.model.apiConfig.url}/${uuid}`);
      },
      $create(data) {
        return this.post(`${this.model.apiConfig.url}`, data);
      },
      $update(uuid, data) {
        return this.put(`${this.model.apiConfig.url}/${uuid}`, data);
      },
      $delete(uuid) {
        return this.$delete(`${this.model.apiConfig.url}/${uuid}`);
      },
    },
  };

  static fetch() {
    return this.api().$fetch();
  }

  static get(uuid) {
    return this.api().$get(uuid);
  }

  static add(user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return this.api().$create(formData);
  }

  static update(uuid, user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return this.api().$update(uuid, formData);
  }

  static delete(uuid) {
    return this.api().$delete(uuid);
  }
}
