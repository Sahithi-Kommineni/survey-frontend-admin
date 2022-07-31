<template>
  <div class="surveys__list">
    <div class="createUser__topHeadings">
      <h1 class="primary__heading">Users List</h1>
      <h5>Manage Users</h5>
    </div>
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">
        <tr>
          <td data-column="User Name">{{ user.username }}</td>
          <td data-column="Email">{{ user.email }}</td>
          <td data-column="Operations">
            <span class="operations__wrapper">
              <v-icon
                large
                color="blue darken-2"
                class="icon"
                @click="pushToView(user.id)"
              >
                mdi-format-list-bulleted-type
              </v-icon>
              <v-icon large color="red darken-2" class="icon">
                mdi-delete
              </v-icon>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import UserService from "../../services/UserService";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    pushToView(id) {
      console.log("id",id);
      this.$router.push({ name: "viewUser", params: { userId: id } });
    },
    fetchUsers() {
      UserService.getAllUsers()
        .then((res) => {
          this.users = res.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style>
</style>
