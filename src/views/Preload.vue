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
    try {
      for (const model of Object.values(Models)) {
        await model.api().$fetch?.();
      }
      await this.hasLoaded();
      this.$router.push(this.redirect);
    } catch (error) {
      console.log("Can't access API");
    }
  },
  methods: {
    ...mapActions(["hasLoaded"]),
  },
};
</script>
