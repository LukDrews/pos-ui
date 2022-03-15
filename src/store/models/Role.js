import ApiBase from "./ApiBase";
import { User } from ".";

export default class Role extends ApiBase {
  static entity = "roles";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.string(null),
      name: this.attr(null),
      users: this.hasMany(User, "roleUuid"),
    };
  }

  static apiConfig = {
    ...super.apiConfig,
    url: "/roles",
  };
}
