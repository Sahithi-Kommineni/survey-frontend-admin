<template>
  <div class="surveys__list">
    <div class="createUser__topHeadings">
      <h1 class="primary__heading">
        <span v-if="this.userId">User</span> Surveys List
      </h1>
      <h5>
        Manage <span v-if="this.userId">{{ userName }}</span> surveys
      </h5>
    </div>x
    <table>
      <thead>
        <tr>
          <th>Survey Name</th>
          <th>Survey Description</th>
          <th>Status</th>
          <th v-show="userRole === 'admin' && !this.userId">Created By</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys" :key="survey.id">
        <tr>
          <td data-column="Survey Name">{{ survey.title }}</td>
          <td data-column="Survey Description">{{ survey.description }}</td>
          <td data-column="Status" class="survey__status--toggle">
            <v-switch
              :label="`${survey.isPublished ? 'Published' : 'UnPublished'}`"
              v-model="survey.isPublished"
              @change="handleSurveyStatus(survey)"
              inset
              color="success"
            ></v-switch>
            <div class="overlay" v-if="openModal === true">
              <v-form class="modal">
                <h1>ENTER CLIENT EMAIL ID</h1>
                <v-text-field
                  v-model="clientEmail"
                  label="Enter client email id"
                  :rules="[rules.required, rules.email]"
                  class="dialog__input"
                ></v-text-field>
                <span class="icon dialog__close--icon" @click="closeDialog">
                  X
                </span>
                <button
                  @click="sendMail(survey.id)"
                  class="button__lightGreen share__btn"
                >
                  SEND SURVEY LINK
                </button>
              </v-form>
            </div>
          </td>
          <td
            v-show="userRole === 'admin' && !this.userId"
            data-column="Created By"
          >
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
              <v-icon
                large
                color="white darken-2"
                class="icon"
                v-show="survey.isPublished"
                @click="openDialog"
              >
                mdi-share
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
import UserService from "../../services/UserService";
export default {
  props: ["userId"],
  data() {
    return {
      clientEmail: "",
      openModal: false,
      surveys: [],
      userName: "",
      userRole: localStorage.getItem("role"),
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
    openDialog() {
      this.openModal = true;
    },
    closeDialog() {
      this.openModal = false;
    },
    handleSurveyStatus(survey) {
      const apiObj = {
        id: survey.id,
        isPublished: survey.isPublished,
      };
      SurveyService.updateSurveyStatus(apiObj)
        .then(() => {
          this.fetchSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    sendMail(surveyId) {
      const linkData = {
        surveyLink: `http://54.162.114.150/survey-frontend-survey/${surveyId}/`,
        email: this.clientEmail,
      };
      SurveyService.shareLink(linkData)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveys" });
            this.clientEmail = "";
            this.openModal = false;
          }
        })
        .catch((e) => {
          this.submitLinkMessage = e.response.data.message;
        });
    },
    fetchSurveys() {
      if (this.userId) {
        UserService.getUserData(this.userId)
          .then((res) => {
            const response = res.data;
            this.surveys = response.survey;
            this.userName = response.username;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        SurveyService.getAllSurveys()
          .then((response) => {
            this.surveys = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
  mounted() {
    this.fetchSurveys();
  },
};
</script>
<style>
</style>
