<template>
  <div class="create__survey">
    <div class="createUser__topHeadings">
      <h1 class="primary__heading">Create Survey</h1>
    </div>
    <h5 class="error__msg">{{ message }}</h5>
    <v-form class="createSurvey__form" @submit="handleCreateSurvey">
      <div class="createSurvey__left">
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
          :label="`${survey.published ? 'UnPublish' : 'Publish'}`"
          v-model="survey.published"
          inset
          color="indigo darken-3"
        ></v-switch>
      </div>
      <div class="createSurvey__right">
        <h3>ADD QUESTIONS TO SURVEY</h3>
        <div class="survey__questions--wrapper">
          <div class="add__question">
            <v-select
              :items="survey.questionOptions"
              v-model="survey.questionType"
              label="Select Question Type"
            ></v-select>
            <v-icon
              large
              color="blue"
              @click="handleAddQuestion"
              class="survey__icon align__icon icon"
              >mdi-plus</v-icon
            >
          </div>
          <div class="survey__question--wrapper">
            <div
              class="survey__question"
              v-for="(question, index) in survey.questions"
              :key="index"
            >
              <div class="survey__question--heading">
                <h3>Question Type - {{ question.question_type }}</h3>
              </div>
              <v-text-field
                v-model="question.title"
                label="Question"
                :rules="[rules.required]"
              ></v-text-field>
              <div class="survey__question--bottom">
                <v-switch
                  label="Required"
                  v-model="question.required"
                  color="indigo darken-3"
                  class="required__switch"
                  inset
                ></v-switch>
                <v-icon
                  large
                  color="red"
                  class="actions__icon"
                  @click="handleDeleteQuestion(index)"
                >
                  mdi-delete-outline
                </v-icon>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="button__lightGreen">Create Survey</button>
        <span class="scrollTo"></span>
      </div>
    </v-form>
  </div>
</template>
<script>
import UserService from "../../services/UserService";
import { FormTextBoxObj } from "./surveyHelper";
export default {
  data() {
    return {
      message: "",
      survey: {
        title: "",
        description: "",
        questions: [],
        published: false,
        questionType: "",
        questionOptions: ["text-box"],
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
      },
    };
  },
  methods: {
    handleAddQuestion() {
      const el = document.querySelector(".scrollTo");
      el.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
      let questions = [...this.survey.questions];
      switch (this.survey.questionType) {
        case "text-box":
          questions = [...questions, new FormTextBoxObj("text-box")];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    handleCreateSurvey(e) {
      e.preventDefault();
      console.log("survey", survey);
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