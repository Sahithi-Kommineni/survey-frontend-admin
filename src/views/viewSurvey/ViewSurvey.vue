<template>
  <div class="surveys__list">
    <div class="createUser__topHeadings">
      <h1 class="primary__heading">Survey Details</h1>
      <h5><span class="highlight">Survey Title :</span> {{ survey.title }}</h5>
      <h5>
        <span class="highlight">Survey Description :</span>
        {{ survey.description }}
      </h5>
      <h5>
        <span class="highlight"> Survey Status :</span>
        {{ survey.isPublished ? "Published" : "UnPublished" }}
      </h5>
      <h5>
        <span class="highlight">Survey Created By :</span> {{ survey.username }}
      </h5>
      <br />
      <h3 class="primary__heading">Survey Questions and Responses</h3>
    </div>
    <ul
      class="viewSurvey__questions"
      v-for="question in survey.question"
      :key="question.id"
    >
      <li class="viewSurvey__question">
        <h3>
          <span class="highlight">QUESTION :</span> {{ question.question }}
        </h3>
        <h5>
          <span class="highlight">QUESTION TYPE :</span> {{ question.type }}
        </h5>
        <!-- IF CHOICES -->
        <h3
          v-show="
            question?.choice &&
            question.choice.length > 0 &&
            question.type === 'mcq'
          "
        >
          CHOICES
        </h3>
        <section
          class="viewSurvey__choices"
          v-show="
            question?.choice &&
            question?.choice.length > 0 &&
            question.type === 'mcq'
          "
        >
          <span
            class="viewSurvey__choice"
            v-for="(item, i) in question.choice"
            :key="i"
            >{{ item.choice }}</span
          >
        </section>
        <!-- QUESTIONS RESPONSE LIST -->
      </li>
    </ul>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
export default {
  props: ["id"],
  data() {
    return {
      survey: {},
      userRole: localStorage.getItem("role"),
    };
  },
  methods: {
    fetchSurvey() {
      SurveyService.getSurvey(this.id)
        .then((response) => {
          this.survey = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchSurvey();
  },
};
</script>
<style>
</style>
