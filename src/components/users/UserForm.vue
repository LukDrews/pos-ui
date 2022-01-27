<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" :small="small" v-on="on" @click="openForm()">
          <slot />
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row justify="center">
                <v-avatar size="150">
                  <v-img
                    aspect-ratio="1"
                    v-if="selectedUser"
                    :src="
                      selectedUser.imageUrl
                        ? selectedUser.imageUrl
                        : defaultImageUrl
                    "
                    :alt="selectedUser.fullName"
                  />
                  <v-img
                    aspect-ratio="1"
                    v-if="!selectedUser"
                    :src="defaultImageUrl"
                    aIlt="Upload Image"
                  />
                </v-avatar>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="user.firstName"
                    label="First name*"
                    :rules="[
                      (v) => !!v || 'First name is required',
                      (v) =>
                        (v && v.length >= 3) ||
                        'First name must be at least 3 characters',
                    ]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="user.lastName"
                    label="Last name*"
                    :rules="[
                      (v) => !!v || 'Last name is required',
                      (v) =>
                        (v && v.length >= 3) ||
                        'First name must be at least 3 characters',
                    ]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <div>
                    <v-menu
                      ref="menu"
                      v-model="datePicker.menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="user.birthDate"
                          label="Birthday date"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="[(v) => !!v || 'Birthday is required']"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="user.birthDate"
                        :active-picker.sync="datePicker.activePicker"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000,
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="user.groupUuid"
                    :items="options.groups"
                    item-text="name"
                    item-value="uuid"
                    label="Group*"
                    :rules="[(v) => !!v || 'Group is required']"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="user.roleUuid"
                    :items="options.roles"
                    item-text="name"
                    item-value="uuid"
                    label="Role*"
                    :rules="[(v) => !!v || 'Role is required']"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <small>*indicates required field</small>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onCancel()">
            {{ cancelText }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="onConfirm()">
            {{ confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Group, Role, User } from '../../store/models';

export default {
  name: 'AddUserForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: 'Save',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    small: {
      type: Boolean,
      default: false,
    },
    selectedUser: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,

      datePicker: {
        activePicker: null,
        menu: false,
      },

      defaultImageUrl: `${process.env.VUE_APP_API_URL}/static/images/default/avatar.png`,

      user: new User(this.selectedUser),
    };
  },
  watch: {
    menu(val) {
      // eslint-disable-next-line no-unused-expressions
      val &&
        setTimeout(() => {
          this.activePicker = 'YEAR';
        });
    },
  },
  computed: {
    options() {
      return {
        groups: Group.all(),
        roles: Role.all(),
      };
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    onCancel() {
      this.dialog = false;
      this.$emit('on-cancel');
    },
    onConfirm() {
      if (this.$refs.form.validate()) {
        this.$emit('on-confirm', this.user, this.selectedUser);
        this.dialog = false;
      }
    },
    openForm() {
      Group.api().$fetch();
      Role.api().$fetch();
    },
  },
};
</script>
