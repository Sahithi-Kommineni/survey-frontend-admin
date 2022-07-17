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
          :label="`${survey.isPublished ? 'UnPublish' : 'Publish'}`"
          v-model="survey.isPublished"
          inset
          color="indigo darken-3"
        ></v-switch>
      </div>
      <div class="createSurvey__right">
        <h3>ADD QUESTIONS TO SURVEY</h3>
        <div class="survey__questions--wrapper">
          <div class="add__question">
            <v-select
              :items="survey.questionChoices"
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
                <h3>{{ question.type }} : Question</h3>
              </div>
              <v-text-field
                v-model="question.title"
                label="Question"
                :rules="[rules.required]"
              ></v-text-field>
              <!-- MCQ -->
              <div v-if="question.type === 'mcq'">
                <h4 class="choices__heading">
                  ADD CHOICES
                  <v-icon
                    large
                    color="blue"
                    @click="handleAddChoice(index)"
                    class="icon survey__icon"
                    >mdi-plus</v-icon
                  >
                </h4>
                <div
                  class="survey__question--choices"
                  v-for="(item, optionIndex) in question.choices"
                  :key="optionIndex"
                >
                  <div class="survey__question--choice">
                    <v-text-field
                      v-model="item.choice"
                      :label="`Option ${optionIndex + 1}`"
                      :rules="[rules.required]"
                    >
                    </v-text-field>
                    <v-icon
                      large
                      color="red"
                      @click="handleDeleteChoice(index, optionIndex)"
                      v-show="optionIndex !== 0"
                      class="icon survey__icon del__icon"
                    >
                      mdi-minus</v-icon
                    >
                  </div>
                </div>
              </div>
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
                  class="actions__icon icon"
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
import SurveyService from "../../services/SurveyService";
import { FormTextBoxObj } from "./surveyHelper";
export default {
  data() {
    return {
      message: "",
      survey: {
        title: "",
        description: "",
        isPublished: false,
        questions: [
          {
            title: "",
            required: false,
            type: "text",
          },
        ],
        questionType: "",
        questionChoices: ["text", "mcq", "paragraph"],
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
        case "text":
          questions = [...questions, new FormTextBoxObj("text")];
          break;
        case "paragraph":
          questions = [...questions, new FormTextBoxObj("paragraph")];
          break;
        case "mcq":
          questions = [
            ...questions,
            {
              ...new FormTextBoxObj("mcq"),
              choices: [
                {
                  choice: "",
                },
              ],
            },
          ];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    handleAddChoice(id) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[id].choices;
      currentQuestionOptions = [
        ...currentQuestionOptions,
        {
          choice: "",
        },
      ];
      this.survey.questions[id].choices = currentQuestionOptions;
    },
    handleDeleteChoice(questionId, optionId) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[questionId].choices;
      this.survey.questions[questionId].choices = currentQuestionOptions.filter(
        (_, i) => i !== optionId
      );
    },
    handleCreateSurvey(e) {
      e.preventDefault();
      const { title, description, isPublished, questions } = this.survey;
      const surveyData = {
        title,
        description,
        isPublished,
        questions,
      };
      SurveyService.createSurvey(surveyData)
        .then((response) => {
          this.$router.push({ name: "surveys" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>