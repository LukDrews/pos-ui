<template>
  <v-container>
    <RoleForm
      title="Add role"
      :selected="selected"
      v-model="inputForm"
      @on-confirm="addOrUpdateItem"
    />
    <ConfirmDialog v-model="confirmDialog" @on-confirm="deleteItem(selected)" />

    <v-snackbar color="red" v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-card>
      <v-card-title class="d-flex justify-space-between">
        Roles
        <v-btn small @click="getItems()">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-actions class="ps-4">
        <v-btn class="primary" @click.stop="showForm(null)">Add role</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-data-table
          class="pa-4"
          :headers="headers"
          :items="roles"
          :items-per-page="-1"
          hide-default-footer
        >
          <template v-slot:item.controls="{ item }">
            <div class="d-flex justify-end">
              <v-btn small @click.stop="showForm(item)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
              <div class="ms-2"></div>
              <v-btn small class="mr-2" @click.stop="showConfirmDialog(item)">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import apiClientMixin from '../mixins/apiClientMixin';

import { Role } from '../store/models';
import RoleForm from '../components/roles/RoleForm.vue';
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue';

export default {
  name: 'Users',
  mixins: [apiClientMixin],
  components: {
    RoleForm,
    ConfirmDialog,
  },
  data() {
    return {
      apiClient: Role,

      headers: [
        { text: 'Name', value: 'name' },
        {
          text: '',
          value: 'controls',
          sortable: false,
          align: 'right',
        },
      ],
      snackbar: false,
      snackbarText: `Can't delete role. Remove users first.${null}`,
      timeout: 4000,

      selected: null,
      inputForm: false,
      confirmDialog: false,
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    roles() {
      return Role.query().withAll().all();
    },
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
