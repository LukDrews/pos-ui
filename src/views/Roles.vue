<template>
  <div>
    <v-snackbar color="red" v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title class="d-flex justify-space-between mb-6">
        <v-btn @click="roleForm = true; selectedRole = null"> Add Role </v-btn>
        <RoleForm
          title="Add role"
          :selectedRole="selectedRole"
          v-model="roleForm"
          @on-confirm="addUpdateRole"
        />

        <v-btn @click="getRoles()">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        class="pa-4"
        :headers="headers"
        :items="roles"
        :items-per-page="-1"
      >
        <!-- Source: https://stackoverflow.com/a/59084212 -->
        <!-- https://vuetifyjs.com/en/components/data-tables/#item -->
        <template v-slot:item.controls="{ item }">
          <div class="d-flex justify-end">
            <v-btn small @click.stop="roleForm = true; selectedRole = item">
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
            <div class="ms-2"></div>
            <ConfirmDialog @on-confirm="deleteRole(item)" />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { Role } from '../store/models';
import RoleForm from '../components/roles/RoleForm.vue';
import ConfirmDialog from '../components/dialogs/ConfirmDialog.vue';

export default {
  name: 'Users',
  components: {
    RoleForm,
    ConfirmDialog,
  },
  data() {
    return {
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
      snackbarText: 'Can\'t delete role. Remove users first.',
      timeout: 4000,

      selectedRole: {},
      roleForm: false,
    };
  },
  created() {
    this.getRoles();
  },
  computed: {
    roles() {
      return Role.query().withAll().all();
    },
  },
  methods: {
    getRoles() {
      Role.api().$fetch();
    },
    addUpdateRole(role, selectedRole){
      if (selectedRole){
        this.updateRole(role, selectedRole);
      } else {
        this.addRole(role);
      }
    },
    addRole(role) {
      Role.api().$create(role);
    },
    updateRole(role, selectedRole) {
      Role.api().$update(selectedRole.uuid, role);
    },
    deleteRole(selectedRole) {
      Role.api()
        .$delete(selectedRole.uuid)
        .catch((err) => {
          if (err.response.status === 409) {
            this.snackbar = true;
          }
        });
    },
  },
};
</script>
