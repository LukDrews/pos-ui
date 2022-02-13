<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <RoleForm
      v-model:active="inputForm"
      title="Add role"
      :selected="selected"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />
    <div class="flex justify-between items-center pb-4">
      <h3>Roles</h3>
      <o-button icon-right="redo" @click="getItems()" />
    </div>
    <div class="pb-4">
      <o-button @click.stop="showForm(null)">Add role</o-button>
    </div>
    <o-table :data="data">
      <o-table-column v-slot="props" field="name" label="Name" sortable>
        {{ props.row.name }}
      </o-table-column>

      <o-table-column v-slot="props" width="80">
        <div class="float-right">
          <o-icon
            clickable
            class="w-6 h-6"
            icon="edit"
            @click.stop="showForm(props.row)"
          />
          <o-icon
            clickable
            class="w-6 h-6"
            icon="trash"
            @click.stop="showConfirmDialog(props.row)"
          />
        </div>
      </o-table-column>
    </o-table>
  </section>
</template>

<script>
import apiClientMixin from "../mixins/apiClientMixin";

import { Role } from "../store/models";
import RoleForm from "../components/forms/RoleForm.vue";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "RoleView",
  components: {
    RoleForm,
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: Role,

      selected: null,
      inputForm: false,
      confirmDialog: false,
    };
  },
  computed: {
    data() {
      return Role.query().withAll().all();
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    deleteItem(selected) {
      Role.api()
        .$delete(selected.uuid)
        .catch((err) => {
          if (err.response.status === 409) {
            this.snackbar = true;
          }
        });
    },
    showForm(selected) {
      this.selected = selected;
      this.inputForm = true;
    },
    showConfirmDialog(item) {
      this.confirmDialog = true;
      this.selected = item;
    },
  },
};
</script>
