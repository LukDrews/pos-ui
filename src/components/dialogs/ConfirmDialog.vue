<template>
  <o-modal v-model:active="isActive" scroll="clip" :can-cancel="false">
    <div class="p-4 w-96">
      <div v-if="title" class="pb-8">
        <h5>{{ title }}</h5>
      </div>
      <div class="pb-4">
        {{ body }}
      </div>
      <div class="flex flex-row justify-end gap-x-2">
        <o-button @click="onCancel()">{{ buttons[0] }}</o-button>
        <o-button @click="onConfirm()">{{ buttons[1] }}</o-button>
      </div>
    </div>
  </o-modal>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: {
    title: String,
    body: {
      type: String,
      default: "Are you sure?",
    },
    buttons: {
      type: Array,
      default: () => ["Cancel", "Confirm"],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:active", "on-cancel", "on-confirm"],
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
  methods: {
    onConfirm() {
      this.$emit("update:active", false);
      this.$emit("on-confirm");
    },
    onCancel() {
      this.$emit("update:active", false);
      this.$emit("on-cancel");
    },
  },
};
</script>
