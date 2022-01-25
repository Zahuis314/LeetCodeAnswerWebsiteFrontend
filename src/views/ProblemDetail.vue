<template>
  <div>
    <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "ProblemDetail",
  data() {
    return {
      content: "",
      difficulty: "",
      hints: [],
      dislikes: 0,
      likes: 0,
      metaData: {},
      question_frontend_id: "",
      solution: null,
      title: "",
      totalAccepted: 0,
      totalSubmission: 0,
      loading: true,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get(`/api/problems/${this.$route.params.slug}.json`)
        .then((response) => {
          this.problem_detail = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  watch: {
    "$route.params": {
      handler() {
        this.fetchData();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
