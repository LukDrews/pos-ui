/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';

export default class ApiBase extends Model {
//   static apiConfig = {
//     url: this.baseUrl, // pass url to fetch, get, create ...
//     actions: {
//       $fetch() {
//         return this.get(`${this.model.apiConfig.url}`);
//       },
//       $get(uuid) {
//         return this.get(`${this.model.apiConfig.url}/${uuid}`);
//       },
//       $create(data) {
//         return this.post(`${this.model.apiConfig.url}`, data);
//       },
//       $update(uuid, data) {
//         return this.put(`${this.model.apiConfig.url}/${uuid}`, data);
//       },
//       $delete(uuid) {
//         return this.delete(`${this.model.apiConfig.url}/${uuid}`);
//       },
//     },
//   };

  static fetch() {
    return this.api().get(`${this.apiConfig.url}`);
  }

  static get(uuid) {
    return this.api().get(`${this.apiConfig.url}/${uuid}`);
  }

  static add(data) {
    return this.api().post(`${this.apiConfig.url}`, data);
  }

  static update(uuid, data) {
    return this.api().put(`${this.apiConfig.url}/${uuid}`, data);
  }

  static delete(uuid) {
    return this.api().delete(`${this.apiConfig.url}/${uuid}`);
  }
}
