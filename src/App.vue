<template>
  <div id="app">
    <b-navbar variant="primary">
      <b-container>
        <b-navbar-nav>
          <router-link class="router-link" tag="li" :to="{ name: 'Problems' }">
            Problems
          </router-link>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-container>
      <router-view />
    </b-container>
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

<style lang="scss" scoped>
.router-link {
  color: black;
  cursor: default;
  &:hover {
    color: #333;
  }
}
.navbar {
  background-color: #ffa116 !important;
}
</style>
