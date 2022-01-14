<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small color="red" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5"> Delete User </v-card-title>

      <v-card-text> Are you sure? </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="red lighten-2" text @click="onConfirm()"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteUserDialog',
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    onConfirm() {
      this.dialog = false;
      this.$emit('delete-user', this.item);
    },
  },
};
</script>