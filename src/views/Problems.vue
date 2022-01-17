<template>
  <div>
    <b-table
      striped
      :items="problems"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
    />
  </div>
</template>

<script>
export default {
  name: "Problems",
  data() {
    return {
      problems: [{}],
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "title", sortable: true },
        { key: "difficulty", sortable: true },
      ],
      loading: true,
    };
  },
  mounted() {
    this.$axios
      .get("/problems.json")
      .then((response) => {
        this.problems = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style lang="scss" scoped>
::v-deep .sr-only {
  display: none !important;
}
</style>
