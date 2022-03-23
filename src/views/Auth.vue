<template>
  <div
    class="flex items-center justify-center min-h-screen w-screen bg-gray-100"
  >
    <div class="px-8 py-6 bg-white shadow-lg">
      <h3 class="text-2xl font-bold text-center">Login</h3>
      <form action>
        <div class="mt-4">
          <o-field label="Username" :variant="error ? 'danger' : ''">
            <o-input v-model="username" placeholder="Username"></o-input>
          </o-field>
        </div>
        <div class="mt-4">
          <o-field
            label="Password"
            :variant="error ? 'danger' : ''"
            :message="error"
          >
            <o-input
              v-model="password"
              placeholder="Password"
              type="password"
            ></o-input>
          </o-field>
        </div>
        <div class="py-2 mt-4">
          <o-button @click="signin"> Sign in </o-button>
        </div>
      </form>
    </div>
    <o-loading v-model:active="isLoading" :full-page="false"></o-loading>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { mapActions } from "vuex";

export default {
  name: "LoginView",
  props: {
    logout: {
      type: Boolean,
    },
  },
  data() {
    return {
      cookies: useCookies().cookies,

      isLoading: false,
      error: "",

      username: "",
      password: "",
    };
  },
  created() {
    if (this.logout) {
      this.signout();
    }
  },
  methods: {
    ...mapActions({
      signinStore: "signin",
      signoutStore: "signout",
    }),
    async signin() {
      try {
        this.isLoading = true;
        const { data } = await this.axios.post("auth/login", {
          username: this.username,
          password: this.password,
        });
        await this.signinStore(data?.accessToken);
        this.$router.push("/");
      } catch (error) {
        this.error = "Wrong username or password";
      } finally {
        this.isLoading = false;
      }
    },
    signout() {
      this.signoutStore();
    },
  },
};
</script>
