<template>
  <div class="surveys__list">
    <div class="createUser__topHeadings">
      <div class="viewSurvey__heading">
        <div class="viewSurvey__heading--left">
          <h1 class="primary__heading">Survey Details</h1>
          <h5>
            <span class="highlight">Survey Title :</span> {{ survey.title }}
          </h5>
          <h5>
            <span class="highlight">Survey Description :</span>
            {{ survey.description }}
          </h5>
          <h5>
            <span class="highlight"> Survey Status :</span>
            {{ survey.isPublished ? "Published" : "UnPublished" }}
          </h5>
          <h5>
            <span class="highlight">Survey Created By :</span>
            {{ survey.username }}
          </h5>
          <br />
        </div>
        <div class="viewSurvey__heading--right">
          <ExportSurvey :exportData="exportData" :fileName="fileName" />
        </div>
      </div>
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
            >{{ item.choice }} -- Option Selected Count :
            {{ item.totalcount ? item.totalcount : 0 }}</span
          >
        </section>
        <!-- QUESTIONS RESPONSE LIST -->
        <section v-if="question.response && question.response.length > 0">
          <br />
          <h3>QUESTION REPONSES</h3>
          <div v-for="item in question.response" :key="item.id">
            <span class="viewSurvey__choice response">{{
              `${item.enduser.email} -> SUBMITTED -> ${item.response}`
            }}</span>
          </div>
        </section>
        <span
          v-if="question.response && question.response.length <= 0"
          class="viewSurvey__choice response error__msg"
          >NO RESPONSES FOUND FOR THIS QUESTION</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
import ExportSurvey from "./ExportReports.vue";
export default {
  props: ["id"],
  components: {
    ExportSurvey,
  },
  data() {
    return {
      survey: {},
      exportData: [],
      fileName: "",
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
    fetchSurveyReportData() {
      SurveyService.getSurveyReport(this.id)
        .then((response) => {
          this.exportData = response.data;
          this.fileName = this.survey.title;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchSurvey();
    this.fetchSurveyReportData();
  },
};
</script>
<style>
.viewSurvey__heading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 15px;
}
.viewSurvey__heading--right {
  padding: 25px;
  border-left: 1px solid var(--fadedGrey);
  display: grid;
  place-items: center;
}

@media screen and (max-width: 900px) {
  .viewSurvey__heading {
    grid-template-columns: 1fr;
  }
  .viewSurvey__heading--right {
    padding: 25px;
    border-top: 1px solid var(--fadedGrey);
    border-left: none;
  }
}
</style>
