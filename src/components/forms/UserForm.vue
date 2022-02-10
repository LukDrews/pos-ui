<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4">
      <div class="pb-4">
        <h5>{{ title }}</h5>
      </div>
      <div>
        <o-field grouped label="Name">
          <o-input
            v-model="user.firstName"
            placeholder="First Name"
            expanded
          ></o-input>

          <o-input
            v-model="user.lastName"
            placeholder="Last Name"
            expanded
          ></o-input>
        </o-field>

        <o-field grouped label="Select a date">
          <o-datepicker
            v-model="user.birthDate"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar"
            trap-focus
          ></o-datepicker>
        </o-field>

        <o-field label="Group">
          <o-select placeholder="Select a group">
            <option value="flint">Group 1</option>
            <option value="silver">Group 2</option>
          </o-select>
        </o-field>

        <o-field label="Role">
          <o-select placeholder="Select a role">
            <option value="flint">Customer</option>
            <option value="silver">Admin</option>
            <option value="flint">Customer</option>
            <option value="silver">Admin</option>
            <option value="flint">Customer</option>
            <option value="silver">Admin</option>
          </o-select>
        </o-field>
      </div>
      <div class="flex flex-row justify-end gap-x-2">
        <o-button @click="onCancel()">{{ cancelText }}</o-button>
        <o-button @click="onConfirm()">{{ confirmText }}</o-button>
      </div>
    </div>
  </o-modal>
  <!-- <div>
    <v-dialog v-model="value" persistent max-width="600px">
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
                    v-if="selected"
                    aspect-ratio="1"
                    :src="
                      selected.imageUrl ? selected.imageUrl : defaultImageUrl
                    "
                    :alt="selected.fullName"
                  />
                  <v-img
                    v-if="!selected"
                    aspect-ratio="1"
                    :src="defaultImageUrl"
                    a-ilt="Upload Image"
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
                      <template #activator="{ on, attrs }">
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
                        v-model:active-picker="datePicker.activePicker"
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
  </div>-->
</template>

<script>
import { Group, Role, User } from "../../store/models";
// import { barcode as validator } from '../../validators';

export default {
  name: "AddUserForm",
  props: {
    title: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Save",
    },
    cancelText: {
      type: String,
      default: "Cancel",
    },
    selected: {
      type: Object,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:active", "on-cancel", "on-confirm"],
  data() {
    return {
      user: new User(),

      locale: "de-DE",
      datePicker: {
        activePicker: null,
        menu: false,
      },

      defaultImageUrl: `${
        import.meta.env.VITE_API_URL
      }/static/images/default/avatar.png`,
    };
  },
  computed: {
    isActive: {
      get() {
        return this.active;
      },
      set(newValue) {
        this.$emit("update:active", newValue);
      },
    },
    options() {
      return {
        groups: Group.all(),
        roles: Role.all(),
      };
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.user = this.selected ? new User(this.selected) : new User();
        Group.api().$fetch();
        Role.api().$fetch();
        try {
          // this.$refs.form.resetValidation();
        } catch (e) {
          // ignore error
        }
      }
    },
    menu(val) {
      // eslint-disable-next-line no-unused-expressions
      val &&
        setTimeout(() => {
          this.activePicker = "YEAR";
        });
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
      // this.$refs.form.resetValidation();
    },
    onConfirm() {
      // if (this.$refs.form.validate()) {
      this.user.uuid = this.selected?.uuid;
      this.$emit("update:active", false);
      this.$emit("on-confirm", this.user);
      // this.$refs.form.resetValidation();
      // }
    },
  },
};
</script>
