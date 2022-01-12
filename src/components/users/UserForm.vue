<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" :small="small" v-on="on" @click="openForm()">
          {{ buttonText }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="form.firstName"
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
                    v-model="form.lastName"
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
                          v-model="form.date"
                          label="Birthday date"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="[(v) => !!v || 'Birthday is required']"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.date"
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
                    v-model="form.group"
                    :items="options.groups"
                    label="Group*"
                    :rules="[(v) => !!v || 'Group is required']"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.role"
                    :items="options.roles"
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
export default {
  name: 'AddUserForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
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
    item: {
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

      options: {
        groups: [],
        roles: [],
      },

      form: {
        firstName: '',
        lastName: '',
        role: null,
        group: null,
        date: null,
      },
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
  methods: {
    loadValues() {
      if (this.item !== null && this.item !== undefined) {
        this.form.firstName = this.item.firstName;
        this.form.lastName = this.item.lastName;
        this.form.role = this.item.role.name;
        this.form.group = this.item.group.name;
        this.form.date = this.item.birthDate;
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    onCancel() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$emit('on-cancel');
    },
    onConfirm() {
      if (this.$refs.form.validate()) {
        this.$emit('on-confirm', this.form);
        this.dialog = false;
        this.$refs.form.reset();
      }
    },
    openForm() {
      this.loadValues();
      this.axios.get('groups').then((response) => {
        this.options.groups = response.data.map((group) => group.name);
      });
      this.axios.get('roles').then((response) => {
        this.options.roles = response.data.map((role) => role.name);
      });
    },
  },
};
</script>
