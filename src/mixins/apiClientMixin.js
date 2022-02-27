export default {
  data() {
    return {
      apiClient: {},
    };
  },
  methods: {
    getItems() {
      return this.apiClient.api().$fetch();
    },
    addItem(item) {
      return this.apiClient.api().$create(item);
    },
    updateItem(item) {
      return this.apiClient.api().$update(item.uuid, item);
    },
    addOrUpdateItem(item) {
      if (item.uuid) {
        return this.updateItem(item);
      } else {
        return this.addItem(item);
      }
    },
    deleteItem(item) {
      return this.apiClient.api().$delete(item.uuid);
    },
  },
};
