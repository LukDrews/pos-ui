/* eslint-disable import/no-cycle */
import { Model } from '@vuex-orm/core';

export default class ApiBase extends Model {
  static apiConfig = {
    url: this.baseUrl, // pass url to fetch, get, create ...
    actions: {
      $fetch() {
        return this.model.$fetchRemote();
      },
      $get(uuid) {
        return this.model.$getRemote(uuid);
      },
      $getByBarcode(barcode) {
        return this.model.$getRemoteByBarcode(barcode);
      },
      $create(data) {
        return this.model.$createRemote(data);
      },
      $update(uuid, data) {
        return this.model.$updateRemote(uuid, data);
      },
      $delete(uuid) {
        return this.model.$deleteRemote(uuid);
      },
    },
  };

  static $fetchRemote() {
    return this.api().get(`${this.apiConfig.url}`);
  }

  static $getRemote(uuid) {
    return this.api().get(`${this.apiConfig.url}/${uuid}`);
  }

  static $getRemoteByBarcode(barcode) {
    return this.api().get(`${this.apiConfig.url}/barcode/${barcode}`);
  }

  static $createRemote(data) {
    return this.api().post(`${this.apiConfig.url}`, data);
  }

  static $updateRemote(uuid, data) {
    return this.api().put(`${this.apiConfig.url}/${uuid}`, data);
  }

  static $deleteRemote(uuid) {
    return this.api().delete(`${this.apiConfig.url}/${uuid}`, { delete: uuid });
  }
}
