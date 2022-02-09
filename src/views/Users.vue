<template>
  <section class="container mx-auto p-4 bg-white drop-shadow rounded">
    <UserForm
      v-model:active="inputForm"
      title="Add user"
      :selected="selected"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog v-model="confirmDialog" @on-confirm="deleteItem(selected)" />
    <div class="flex justify-between items-center pb-4">
      <h3>Users</h3>
      <o-button icon-right="redo" @click="getItems()" />
    </div>
    <div class="pb-4">
      <o-button @click.stop="showForm(null)"> Add User </o-button>
    </div>
    <o-table :data="users">
      <o-table-column
        v-slot="props"
        field="firstName"
        label="First Name"
        sortable
      >
        {{ props.row.firstName }}
      </o-table-column>

      <o-table-column
        v-slot="props"
        field="lastName"
        label="Last Name"
        sortable
      >
        {{ props.row.lastName }}
      </o-table-column>

      <o-table-column v-slot="props" field="group.name" label="Group" sortable>
        {{ props.row.group.name }}
      </o-table-column>

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

  <!-- <v-container>
    <UserForm
      v-model="inputForm"
      title="Add user"
      :selected="selected"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog v-model="confirmDialog" @on-confirm="deleteItem(selected)" />

    <v-card>
      <v-card-title class="d-flex justify-space-between">
        Users
        <v-btn small @click="getItems()">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-actions class="ps-4">
        <v-btn class="primary" @click.stop="showForm(null)">Add user</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-data-table
          class="pa-4"
          :headers="headers"
          :items="users"
          :items-per-page="-1"
        >
          <template #item.avatar="{ item }">
            <v-avatar size="36">
              <v-img :src="item.imageUrl" :alt="item.fullName" />
            </v-avatar>
          </template>
          <template #item.controls="{ item }">
            <v-icon class="mr-2" @click.stop="showForm(item)">
              mdi-square-edit-outline
            </v-icon>
            <v-icon @click.stop="showConfirmDialog(item)">
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container> -->
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
