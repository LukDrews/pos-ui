<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-6">
      <AddUserForm @update-users="getUsersFromApi()" />

      <v-btn @click="getUsersFromApi()">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="users"></v-data-table>
  </v-card>
</template>

<script>
import AddUserForm from '../components/users/AddUserForm.vue';

export default {
  name: 'Users',
  components: {
    AddUserForm,
  },
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Group', value: 'group.name' },
        { text: 'Date', value: 'birthDate' },
      ],
      users: [],
    };
  },
  async created() {
    await this.getUsersFromApi();
  },
  methods: {
    async getUsersFromApi() {
      const response = await this.axios.get('users');
      const userData = response.data.map((user) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
      }));
      this.users = userData;
      console.log(this.users);
    },
  },
};
</script>
