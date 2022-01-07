<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          {{ buttonText }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="firstName"
                  label="First name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="lastName"
                  label="Last name*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div>
                  <div class="mb-6">
                    Active picker: <code>{{ activePicker || "null" }}</code>
                  </div>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      :active-picker.sync="activePicker"
                      :max="
                        new Date(
                          Date.now() - new Date().getTimezoneOffset() * 60000
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
                  v-model="group"
                  :items="['Group 1', 'Group 2', 'Group 3', 'Group 4']"
                  label="Group*"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="role"
                  :items="['customer']"
                  label="Role*"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
  },
  data() {
    return {
      dialog: false,

      activePicker: null,
      date: null,
      menu: false,

      firstName: '',
      lastName: '',
      role: '',
      group: '',
    };
  },
  watch: {
    menu(val) {
      // eslint-disable-next-line no-unused-expressions
      val
        && setTimeout(() => {
          this.activePicker = 'YEAR';
        });
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    onCancel() {
      this.dialog = false;
    },
    async onConfirm() {
      await this.axios.post('users', {
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.date,
        groupName: this.group,
        role: this.role,
      });
      this.dialog = false;
    },
  },
};
</script>
