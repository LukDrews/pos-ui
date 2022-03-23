<template>
  <div class="min-h-screen w-screen bg-gray-100">
    <o-loading v-model:active="isActive"></o-loading>
  </div>
</template>

<script>
import * as Models from "../store/models";
import { mapActions } from "vuex";

export default {
  name: "PreloadView",
  props: {
    redirect: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
  async created() {
    for (const model of Object.values(Models)) {
      await model.api().$fetch?.();
    }
    await this.hasLoaded();
    this.$router.push(this.redirect);
  },
  methods: {
    ...mapActions(["hasLoaded"]),
  },
};
</script>
