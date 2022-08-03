<template>
  <download-csv
    :data="exportData"
    :name="fileName"
    class="button__white--bordered"
  >
    Export Reports &nbsp; <v-icon dark> mdi-export </v-icon>
  </download-csv>
</template>
<script>
import JsonCSV from "vue-json-csv";
export default {
  components: {
    downloadCsv: JsonCSV,
  },
  props: {
    exportData: Array,
    fileName: String,
  },
};
</script>