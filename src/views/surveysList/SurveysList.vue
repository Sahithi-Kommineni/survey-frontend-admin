<template>
  <div class="surveys__list">
      <div class="createUser__topHeadings">
        <h1 class="primary__heading">Surveys List</h1>
        <h5>Manage surveys created by admin & user !</h5>
      </div>
    <table>
      <thead>
        <tr>
          <th>Survey Name</th>
          <th>Created By</th>
          <th>Email</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys">
        <tr>
          <td data-column="Survey Name">{{ survey.title }}</td>
          <td data-column="Created By">{{ survey.createdBy }}</td>
          <td data-column="Email">{{ survey.email }}</td>
          <td data-column="Operations">EDIT DELETE</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      surveys: [
        {
          createdBy: "Elon Musk",
          title: "test",
          email: "test@mail.com",
        },
        {
          createdBy: "Tim Cook",
          title: "apple",
          email: "apple@mail.com",
        },
      ],
    };
  },
};
</script>
<style>
</style>
