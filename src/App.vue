<template>
  <v-app>
    <v-main>
      <Header v-if="currentPath !== '/signin'" />
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Header from "./components/Header/Header.vue";
import './styles/index.css';
export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({
    currentPath: "",
  }),
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
      }
    );
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Monoton&family=Poppins:wght@500;700;800&family=Sacramento&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
}
:root {
    --darkBlack: #131212;
    --lightBlack: #202020;
    --white: #ffff;
    --lightGreen: #bd9249;
    --fadedGrey: #5c5a5aaf;
    --blue: blue;
}
</style>