<template>
  <div class="createUser">
    <div class="createUser__wrapper">
      <div class="createUser__topHeadings">
        <h1 class="primary__heading">Create User</h1>
        <h5>Create Accounts For User</h5>
      </div>
      <v-form class="createUser__form">
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="formData.username"
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
        <button @click="handleCreateUser" class="button__lightGreen">
          Create User
        </button>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        password: "",
        username: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
};
</script>