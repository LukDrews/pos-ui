<template>
  <v-container>
    <UserForm
      title="Add user"
      :selected="selected"
      v-model="inputForm"
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
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="36">
              <v-img :src="item.imageUrl" :alt="item.fullName" />
            </v-avatar>
          </template>

          <!-- Source: https://stackoverflow.com/a/59084212 -->
          <!-- https://vuetifyjs.com/en/components/data-tables/#item -->
          <template v-slot:item.controls="{ item }">
            <div class="d-flex justify-end">
              <v-btn small class="mr-2" @click.stop="showForm(item)">
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
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

import { User } from '../store/models';
import UserForm from '../components/users/UserForm.vue';
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue';

export default {
  name: 'Users',
  mixins: [apiClientMixin],
  components: {
    UserForm,
    ConfirmDialog,
  },
  data() {
    return {
      apiClient: User,

      headers: [
        { text: '', value: 'avatar', sortable: false },
        { text: 'First name', value: 'firstName' },
        { text: 'Last name', value: 'lastName' },
        { text: 'Group', value: 'group.name' },
        { text: 'Date', value: 'birthDate' },
        {
          text: '',
          value: 'controls',
          sortable: false,
          align: 'right',
        },
      ],

      selected: null,
      inputForm: false,
      confirmDialog: false,
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    users() {
      return User.query().withAll().all();
    },
  },
  methods: {
    showForm(selected) {
      this.inputForm = true;
      this.selected = selected;
    },
    showConfirmDialog(selected) {
      this.confirmDialog = true;
      this.selected = selected;
    },
  },
};
</script>
