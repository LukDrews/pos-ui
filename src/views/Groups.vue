<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <o-table
      :data="groups"
    >
      <template #empty>
        <div class="m-4 text-center">No groups found</div>
      </template>

      <o-table-column v-slot="props" field="name" label="Group Name" sortable>
        {{ props.row.name }}
      </o-table-column>
    </o-table>

  </section>
</template>

<script setup>
import { computed } from "vue";
import { Group } from "../store/models";
// import { useApiClient } from "../composable/useApiClient";

// const { getItems, addItem, updateItem, addOrUpdateItem, deleteItem } = useApiClient(Group);
const groups = computed(() => Group.query().withAll().all());
</script>

<style scoped></style>
