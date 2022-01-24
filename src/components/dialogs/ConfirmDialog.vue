<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small color="red" dark v-bind="attrs" v-on="on">
        <slot>
          <v-icon>mdi-delete-outline</v-icon>
        </slot>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5"> {{ title }} </v-card-title>

      <v-card-text> {{ body }} </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          {{ buttons[0] }}
        </v-btn>
        <v-btn color="red lighten-2" text @click="onConfirm()">
          {{ buttons[1] }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    title: String,
    body: {
      type: String,
      default: 'Are you sure?',
    },
    buttons: {
      type: Array,
      default: () => ['Cancel', 'Confirm'],
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
      this.$emit('on-confirm');
    },
  },
};
</script>