<template>
  <div class="createUser">
    <div class="createUser__wrapper">
      <div class="createUser__topHeadings">
        <h1 class="primary__heading">Create Survey</h1>
      </div>
      <h5 class="error__msg">{{ message }}</h5>
      <v-form class="createUser__form" @submit="handleCreateSurvey">
        <v-text-field
          v-model="survey.title"
          label="Survey Title"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="survey.description"
          label="Survey Description"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <v-switch
          :label="`${survey.published ? 'UnPublish Survey' : 'Publish Survey'}`"
          v-model="survey.published"
          inset
          color="indigo darken-3"
        ></v-switch>
        <button type="submit" class="button__lightGreen">Create Survey</button>
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
      survey: {
        title: "",
        description: "",
        published: false,
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
      },
    };
  },
  methods: {
    handleCreateSurvey(e) {
      e.preventDefault();
      const survey = {
        email: this.survey.email,
        password: this.survey.password,
        username: this.survey.userName,
      };
      //   UserService.createUser(survey)
      //     .then((response) => {
      //       this.$router.push({ name: "users" });
      //     })
      //     .catch((e) => {
      //       this.message = e.response.data.message;
      //     });
    },
  },
};
</script>