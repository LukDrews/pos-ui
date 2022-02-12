<template>
  <section class="container mx-auto p-4 bg-white rounded">
    <UserForm
      v-model:active="inputForm"
      title="Add user"
      :selected="selected"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog
      v-model:active="confirmDialog"
      @on-confirm="deleteItem(selected)"
    />
    <div class="flex justify-between items-center pb-4">
      <h3>Users</h3>
      <o-button icon-right="redo" @click="getItems()" />
    </div>
    <div class="pb-4">
      <o-button @click.stop="showForm(null)">Add User</o-button>
    </div>
    <o-table :data="users">
      <o-table-column
        v-slot="props"
        field="firstName"
        label="First Name"
        sortable
        >{{ props.row.firstName }}</o-table-column
      >

      <o-table-column
        v-slot="props"
        field="lastName"
        label="Last Name"
        sortable
        >{{ props.row.lastName }}</o-table-column
      >

      <o-table-column
        v-slot="props"
        field="group.name"
        label="Group"
        sortable
        >{{ props.row.group.name }}</o-table-column
      >

      <o-table-column v-slot="props" field="birthDate" label="Date" sortable>
        {{ props.row.birthDate }}
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

import { User } from "../store/models";
import UserForm from "../components/forms/UserForm.vue";
import ConfirmDialog from "../components/dialogs/ConfirmDialog.vue";

export default {
  name: "Users",
  components: {
    UserForm,
    ConfirmDialog,
  },
  mixins: [apiClientMixin],
  data() {
    return {
      apiClient: User,

      selected: null,
      inputForm: false,
      confirmDialog: false,
    };
  },
  computed: {
    users() {
      return User.query().withAll().all();
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    showForm(selected) {
      console.log(selected);
      this.inputForm = true;
      this.selected = selected;
    },
    showConfirmDialog(selected) {
      console.log(selected);
      this.confirmDialog = true;
      this.selected = selected;
    },
  },
};
</script>
