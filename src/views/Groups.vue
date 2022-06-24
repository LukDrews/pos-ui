<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <o-table :data="data">
      <template #empty>
        <div class="m-4 text-center">No groups found</div> </template
      >‚
      <o-table-column v-slot="props" field="name" label="Group Name" sortable>
        {{ props.row.name }}
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";

import { Group } from "../store/models";
export default {
  name: "GroupView",
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: Group,
    };
  },
  computed: {
    data() {
      return this.apiClient.query().withAll().all();
    },
  },
};
</script>

<style scoped></style>
