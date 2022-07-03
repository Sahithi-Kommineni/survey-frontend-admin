<template>
  <div class="createUser">
    <div class="createUser__wrapper">
      <div class="createUser__topHeadings">
        <h1 class="primary__heading">Create User</h1>
        <h5>Create Accounts For User</h5>
      </div>
      <h5 class="error__msg">{{ message }}</h5>
      <v-form class="createUser__form" @submit="handleCreateUser">
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="formData.userName"
          label="User Name"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <button type="submit" class="button__lightGreen">Create User</button>
      </v-form>
    </div>
  </div>
</template>
<script>
import UserService from "../../services/UserService";
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        password: "",
        userName: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    handleCreateUser(e) {
      e.preventDefault();
      const formData = {
        email: this.formData.email,
        password: this.formData.password,
        username: this.formData.userName,
      };
      UserService.createUser(formData)
        .then((response) => {
          this.$router.push({ name: "users" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>