<template>
  <div class="surveys__list">
    <div class="createUser__topHeadings">
      <h1 class="primary__heading">Surveys List</h1>
      <h5>Manage surveys</h5>
    </div>
    <table>
      <thead>
        <tr>
          <th>Survey Name</th>
          <th>Survey Description</th>
          <th>Status</th>
          <th v-show="userRole === 'admin'">Created By</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys">
        <tr>
          <td data-column="Survey Name">{{ survey.title }}</td>
          <td data-column="Survey Description">{{ survey.description }}</td>
          <td data-column="Status">
            {{ survey.isPublished ? "Published" : "UnPublished" }}
          </td>
          <td v-show="userRole === 'admin'" data-column="Created By">
            {{ survey.username }}
          </td>
          <td data-column="Operations">
            <span class="operations__wrapper">
              <v-icon
                large
                color="blue darken-2"
                class="icon"
                @click="pushToView(survey.id)"
              >
                mdi-format-list-bulleted-type
              </v-icon>
              <v-icon
                large
                color="red darken-2"
                class="icon"
                @click="deleteSurvey(survey.id)"
              >
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
import SurveyService from "../../services/SurveyService";
export default {
  data() {
    return {
      surveys: [
        {
          title: "What motivates you to learn more",
          description: "motivation survey",
          username: "Elon Musk",
          isPublished: true,
          id: 1,
        },
      ],
      userRole: localStorage.getItem("role"),
    };
  },
  methods: {
    pushToView(id) {
      this.$router.push({ name: "viewSurvey", params: { id } });
    },
    deleteSurvey(id) {
      SurveyService.deleteSurvey(id)
        .then(() => {
          this.fetchSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchSurveys() {
      SurveyService.getAllSurveys()
        .then((response) => {
          this.surveys = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchSurveys();
  },
};
</script>
<style>
</style>
