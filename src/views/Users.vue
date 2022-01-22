<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-6">
      <UserForm title="Add user" @on-confirm="addUser"> Add User </UserForm>

      <v-btn @click="getUsers()">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>
    <div v-if="users !== null">
      <v-data-table
        class="pa-4"
        :headers="headers"
        :items="users"
        :loading="loadingUsers"
        :items-per-page="-1"
      >
        <template v-slot:item.avatar="{ item }">
          <v-avatar size="36">
            <v-img :src="item.imageLink" :alt="item.fullName" />
          </v-avatar>
        </template>

        <!-- Source: https://stackoverflow.com/a/59084212 -->
        <!-- https://vuetifyjs.com/en/components/data-tables/#item -->
        <template v-slot:item.controls="{ item }">
          <div class="d-flex justify-end">
            <UserForm
              title="Edit user"
              :selectedUser="item"
              small
              @on-confirm="updateUser"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </UserForm>
            <div class="ms-2"></div>
            <DeleteUserDialog :item="item" @delete-user="deleteUser" />
          </div>
        </template>
      </v-data-table>
    </div>
    <div v-else>
      <!-- https://marinaaisa.com/blog/design-and-code-skeletons-screens -->
      <v-skeleton-loader
        type="table-tbody, table-tfoot"
        :types="{
          'table-tbody': 'table-row-divider@10',
          'table-row': 'table-cell@' + headers.length,
        }"
      ></v-skeleton-loader>
    </div>
  </v-card>
</template>

<script>
import { User } from '../store/models';
import UserForm from '../components/users/UserForm.vue';
import DeleteUserDialog from '../components/users/DeleteUserDialog.vue';

export default {
  name: 'Users',
  components: {
    UserForm,
    DeleteUserDialog,
  },
  data() {
    return {
      loadingUsers: true,
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
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    users() {
      return User.query().withAll().all();
    },
  },
  methods: {
    getUsers() {
      this.loadingUsers = true;
      User.fetch().then(() => {
        this.loadingUsers = false;
      });
    },
    addUser(user) {
      User.add(user);
    },
    updateUser(user, selectedUser) {
      User.update(selectedUser.uuid, user);
    },
    deleteUser(selectedUser) {
      User.delete(selectedUser.uuid)
    },
  },
};
</script>
