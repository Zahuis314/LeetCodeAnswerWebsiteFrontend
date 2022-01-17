<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.title = process.env.VUE_APP_TITLE;
  },
};
</script>

<style lang="scss"></style>
