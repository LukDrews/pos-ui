<template>
  <v-sheet color="white" elevation="1" height="100" width="100"></v-sheet>
</template>

<script>
export default {
  name: 'Shop',
  created() {
    window.addEventListener('keypress', this.processKey);
  },
  destroyed() {
    window.removeEventListener('keypress', this.processKey);
  },
  methods: {
    processKey(e) {
      // const cmd = String.fromCharCode(e.keyCode);
      console.log('command:', e);
    },
  },
};
</script>
