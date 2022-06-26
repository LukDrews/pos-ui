export function useApiClient(apiClient) {
  function getItems() {
    return apiClient.api().$fetch();
  }

  function addItem(item) {
    return apiClient.api().$create(item);
  }

  function updateItem(item) {
    return apiClient.api().$update(item.uuid, item);
  }

  function addOrUpdateItem(item) {
    if (item.uuid) {
      return updateItem(item);
    } else {
      return addItem(item);
    }
  }

  function deleteItem(item) {
    return apiClient.api().$delete(item.uuid);
  }

  return {
    getItems,
    addItem,
    updateItem,
    addOrUpdateItem,
    deleteItem,
  };
}
