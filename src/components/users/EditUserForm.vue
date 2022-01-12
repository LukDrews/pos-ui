<template>
  <UserForm
    title="Edit user"
    buttonText="Edit"
    :item="item"
    small
    @on-confirm="onConfirm"
  />
</template>

<script>
import UserForm from './UserForm.vue';

export default {
  name: 'AddUserForm',
  components: {
    UserForm,
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    onConfirm(form) {
      this.axios
        .put(`users/${this.item.uuid}`, {
          firstName: form.firstName,
          lastName: form.lastName,
          birthDate: form.date,
          group: form.group,
          role: form.role,
        })
        .then(() => {
          this.$emit('update-users');
          console.log('Update item: ', form);
        });
    },
  },
};
</script>
