export default {
  data() {
    return {
      apiClient: {},
    };
  },
  methods: {
    getItems() {
      this.apiClient.api().$fetch();
    },
    addItem(item) {
      this.apiClient.api().$create(item);
    },
    updateItem(item) {
      this.apiClient.api().$update(item.uuid, item);
    },
    deleteItem(item) {
      this.apiClient.api().$delete(item.uuid);
    },
  },
};
