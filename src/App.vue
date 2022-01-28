<template>
  <div id="app">
    <b-navbar variant="primary">
      <b-navbar-brand id="animation-title" to="/">
        <div id="animation-leet">Leet</div>
        <div id="animation-tile">
          <div id="animation-think"></div>
        </div>
      </b-navbar-brand>
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
<style lang="scss">
.font-bold {
  font-weight: bold;
}
body {
  --bs-body-bg: ghostwhite;
  --bs-body-color: darkslategray;
}
#animation-title {
  font-family: monospace;
  display: flex;
  width: 140px;
  margin-left: 20px;
}
#animation-think::after {
  // white-space: nowrap;
  overflow: hidden;
  display: flex;
  content: "";
  animation: typewriting 9s steps(5, start) infinite, blinking 1s infinite;
  border-right: 2px solid;
}
#animation-tile {
  display: inline;
}
@keyframes typewriting {
  0% {
    width: 0%;
    content: "Think";
    animation-timing-function: steps(5, start);
  }
  6.25% {
    width: 100%;
  }
  21.25% {
    width: 100%;
    animation-timing-function: steps(5, start);
  }
  24.99% {
    width: 0%;
    content: "Think";
    animation-timing-function: steps(5, start);
  }
  25.00% {
    width: 0%;
    content: "Design";
    animation-timing-function: steps(6, start);
  }
  31.25% {
    width: 100%;
  }
  46.25% {
    width: 100%;
    animation-timing-function: steps(6, start);
  }
  49.99% {
    width: 0%;
    content: "Design";
    animation-timing-function: steps(6, start);
  }
  50.00% {
    width: 0%;
    content: "Code";
    animation-timing-function: steps(4, start);
  }
  65% {
    width: 100%;
  }
  92.50% {
    width: 100%;
    animation-timing-function: steps(4, start);
  }
  100% {
    width: 0%;
    content: "Code";
    animation-timing-function: steps(4, start);
  }
}
@keyframes blinking {
  0% {
    border-color: black;
  }
  45% {
    border-color: black;
  }
  45.001% {
    border-color: transparent;
  }
  100% {
    border-color: transparent;
  }
}
</style>
