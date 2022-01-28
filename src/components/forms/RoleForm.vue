<template>
  <div>
    <v-dialog v-model="value" persistent max-width="600px">
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
                    v-model="role.name"
                    label="Role name*"
                    :rules="roleRules"
                    required
                  ></v-text-field>
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
import { Role } from '../../store/models';

export default {
  name: 'AddRoleForm',
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
    selected: {
      type: Object,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      role: {},
      roleRules: [
        (v) => !!v || 'Role name is required',
        (v) =>
          !this.roles
            .map((r) => r.name)
            .filter((name) => name !== this.selected?.name)
            .includes(v) || 'Name already used',
      ],
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.role = this.selected ? new Role(this.selected) : new Role();
        Role.api().$fetch();
        try {
          this.$refs.form.resetValidation();
        } catch (e) {
          // ignore error
        }
      }
    },
  },
  computed: {
    roles() {
      return Role.all();
    },
  },
  methods: {
    onCancel() {
      this.$emit('input', false);
      this.$emit('on-cancel');
      this.$refs.form.resetValidation();
    },
    onConfirm() {
      if (this.$refs.form.validate()) {
        this.role.uuid = this.selected?.uuid;
        this.$emit('input', false);
        this.$emit('on-confirm', this.role);
        this.$refs.form.resetValidation();
      }
    },
  },
};
</script>
