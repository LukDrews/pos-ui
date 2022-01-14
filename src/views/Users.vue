<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-6">
      <UserForm title="Add user" @on-confirm="addUser"> Add User </UserForm>

      <v-btn @click="getUsers()">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>
    <div v-if="users.length > 0">
      <v-data-table
        class="pa-4"
        :headers="headers"
        :items="users"
        :loading="loadingUsers"
        :items-per-page="-1"
      >
        <!-- Source: https://stackoverflow.com/a/59084212 -->
        <template v-slot:item.controls="props">
          <div class="d-flex justify-end">
            <UserForm
              title="Edit user"
              :item="props.item"
              small
              @on-confirm="updateUser"
            >
              <v-icon>mdi-square-edit-outline</v-icon>
            </UserForm>
            <div class="ms-2"></div>
            <DeleteUserDialog :item="props.item" @delete-user="deleteUser" />
          </div>
        </template>
      </v-data-table>
    </div>
    <div v-else>
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
      users: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.loadingUsers = true;
      this.axios.get('users').then((response) => {
        this.users = response.data.map((user) => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
        }));
        this.loadingUsers = false;
        console.log(this.users);
      });
    },
    addUser(form) {
      this.axios
        .post('users', {
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.date,
          group: form.group,
          role: form.role,
        })
        .then(() => {
          this.getUsers();
          console.log('Add user: ', form);
        });
    },
    updateUser(form, selectedItem) {
      this.axios
        .put(`users/${selectedItem.uuid}`, {
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.date,
          group: form.group,
          role: form.role,
        })
        .then(() => {
          this.getUsers();
          console.log('Update item: ', form);
        });
    },
    deleteUser(item) {
      this.loadingUsers = true;
      this.axios.delete(`users/${item.uuid}`).then(() => {
        this.getUsers();
      });
    },
    edit(item) {
      console.log(item);
    },
  },
};
</script>
