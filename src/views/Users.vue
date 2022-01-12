<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-6">
      <AddUserForm @update-users="getUsersFromApi()" />

      <v-btn @click="getUsersFromApi()">
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
          <EditUserForm :item="props.item" @update-users="getUsersFromApi()" />
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
import AddUserForm from '../components/users/AddUserForm.vue';
import EditUserForm from '../components/users/EditUserForm.vue';

export default {
  name: 'Users',
  components: {
    AddUserForm,
    EditUserForm,
  },
  data() {
    return {
      loadingUsers: true,
      headers: [
        { text: 'Name', value: 'name', width: '31%' },
        { text: 'Group', value: 'group.name', width: '31%' },
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
    this.getUsersFromApi();
  },
  methods: {
    getUsersFromApi() {
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
    edit(item) {
      console.log(item);
    },
  },
};
</script>
