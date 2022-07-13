<template>
  <v-app>
    <Header v-if="currentPath !== '/signin'" :userRole="userRole" />
    <router-view />
  </v-app>
</template>
<script>
import Header from "./components/Header/Header.vue";
import "./styles/index.css";
export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({
    currentPath: "",
    userRole: "",
  }),
  created() {
    const isAuthenticated = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (isAuthenticated && (role === "admin" || role === "user")) {
      this.$router.push({ name: "surveys" });
    } else {
      this.$router.push({ name: "signIn" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
        this.userRole = localStorage.getItem("role");
      }
    );
  },
};
</script>