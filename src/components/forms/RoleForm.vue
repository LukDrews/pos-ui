<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4">
      <div class="pb-4">
        <h5>{{ title }}</h5>
      </div>
      <div class="pb-4">
        <o-field grouped label="Name">
          <o-input
            v-model="role.name"
            placeholder="Role name"
            expanded
          ></o-input>
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
import { Role } from "../../store/models";

export default {
  name: "AddRoleForm",
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
      role: {},
      roleRules: [
        (v) => !!v || "Role name is required",
        (v) =>
          !this.roles
            .map((r) => r.name)
            .filter((name) => name !== this.selected?.name)
            .includes(v) || "Name already used",
      ],
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
    roles() {
      return Role.all();
    },
  },
  watch: {
    active(val) {
      if (val) {
        this.role = this.selected ? new Role(this.selected) : new Role();
        Role.api().$fetch();
      }
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
    },
    onConfirm() {
      this.role.uuid = this.selected?.uuid;
      this.$emit("update:active", false);
      this.$emit("on-confirm", this.role);
    },
  },
};
</script>
