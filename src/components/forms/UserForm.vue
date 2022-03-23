<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4">
      <div class="pb-4">
        <h5>{{ title }}</h5>
      </div>
      <div>
        <div class="flex flex-row items-center justify-evenly">
          <img
            class="h-32 aspect-square object-cover rounded-full border border-inherit drop-shadow"
            :src="preview ? preview : user.imageUrl"
          />
          <o-upload v-model="image" accept="image/*">
            <o-button tag="a" variant="primary" icon-left="image">
              Select image
            </o-button>
          </o-upload>
        </div>
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
// import { barcode as validator } from '../../utils/validators';

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

      locale: "en-CA",
      date: null,
      image: null,
      preview: null,

      defaultImageUrl: `${this.$store.state.baseUrl}/static/images/default/avatar.png`,
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
    groups() {
      return Group.query().orderBy("name").all();
    },
    roles() {
      return Role.all();
    },
  },
  watch: {
    active(val) {
      if (val) {
        // Don't wait for api calls to resolve...
        Group.api().$fetch();
        Role.api().$fetch();

        this.image = null;
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
      if (val) {
        const dateString = new Date(
          val.getTime() - val.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];

        this.user.birthDate = dateString;
      }
    },
    image(val) {
      if (val) {
        try {
          this.preview = URL.createObjectURL(val);
        } catch (err) {
          this.preview = null;
        }
      } else {
        this.preview = null;
      }
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
    },
    onConfirm() {
      this.user.uuid = this.selected?.uuid;
      this.user.image = this.image;
      URL.revokeObjectURL(this.image);
      this.$emit("update:active", false);
      this.$emit("on-confirm", this.user);
    },
  },
};
</script>
