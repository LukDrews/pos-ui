import ApiBase from "./ApiBase";
import { Role, Group, Order, Transaction } from ".";

import formatters from "../../utils/formatters";

export default class User extends ApiBase {
  static entity = "users";

  static primaryKey = "uuid";

  static fields() {
    const parseDate = (dateString) => {
      if (dateString) {
        let date = new Date(dateString);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];
      } else {
        return null;
      }
    };

    return {
      uuid: this.string(null),
      firstName: this.attr(""),
      lastName: this.attr(""),
      birthDate: this.attr(null, parseDate),
      roleUuid: this.attr(null),
      role: this.belongsTo(Role, "roleUuid"),
      groupUuid: this.attr(null),
      group: this.belongsTo(Group, "groupUuid"),
      orders: this.hasMany(Order, "userUuid"),
      transactions: this.hasMany(Transaction, "userUuid"),
      balance: this.number(null),
      imagePath: this.attr(null),
    };
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get balanceFormatted() {
    return formatters.toCurrencyFormat(this.balance);
  }

  get imageUrl() {
    const defaultImageUrl = `/images/avatar.jpg`;
    if (this.imagePath) {
      return `${import.meta.env.VITE_API_URL}${this.imagePath}`;
    } else {
      return defaultImageUrl;
    }
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/users",
  };

  static $createRemote(user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return super.$createRemote(formData);
  }

  static $updateRemote(uuid, user) {
    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));

    return super.$updateRemote(uuid, formData);
  }
}
