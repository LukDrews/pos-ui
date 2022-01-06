<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn color="primary" class="text-none rounded-lg" @click="update()">Click me</v-btn>
    <v-flex>{{text}}</v-flex>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    update() {
      this.axios.get('posts/1').then((res) => {
        this.text = res.data;
      });
    },
  },
};
</script>
