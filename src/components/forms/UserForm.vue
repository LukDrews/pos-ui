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
            v-model="date"
            :locale="locale"
            placeholder="Click to select..."
            icon="calendar"
            trap-focus
          ></o-datepicker>
        </o-field>

        <o-field label="Group">
          <o-select v-model="user.groupUuid" placeholder="Select a group">
            <option
              v-for="group in groups"
              :key="group.name"
              :value="group.uuid"
            >
              {{ group.name }}
            </option>
          </o-select>
        </o-field>

        <o-field label="Role">
          <o-select v-model="user.roleUuid" placeholder="Select a role">
            <option v-for="role in roles" :key="role.name" :value="role.uuid">
              {{ role.name }}
            </option>
          </o-select>
        </o-field>
      </div>
      <div class="flex flex-row justify-end gap-x-2">
        <o-button @click="onCancel()">{{ cancelText }}</o-button>
        <o-button @click="onConfirm()">{{ confirmText }}</o-button>
      </div>
    </div>
  </o-modal>
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
    groups: {
      type: Array,
      default: () => [],
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:active", "on-cancel", "on-confirm"],
  data() {
    return {
      user: new User(),

      locale: "en-CA",
      date: null,

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
  },
  watch: {
    active(val) {
      if (val) {
        if (this.selected) {
          this.user = new User(this.selected);
          this.date = new Date(this.selected.birthDate);
        } else {
          this.user = new User();
          this.date = null;
        }
      }
    },
    date(val) {
      this.user.birthDate = this.date?.toISOString().slice(0, 10);
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
    },
    onConfirm() {
      this.user.uuid = this.selected?.uuid;
      this.$emit("update:active", false);
      this.$emit("on-confirm", this.user);
    },
  },
};
</script>
