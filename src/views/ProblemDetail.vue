<template>
  <div>
    <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <h2 id="problem-title">
        {{ this.question_frontend_id }}. {{ this.title }}
      </h2>
      <div id="problem">
        <div id="problem-content">
          <div id="problem-text" v-html="this.content"></div>
          <code id="problem-code">
            public {{ this.function_signature }}{
            <br />
            }
          </code>
        </div>
        <div id="problem-details">
          <div>
            <span>Difficulty: {{ this.difficulty }}</span>
          </div>
          <div>
            <span>Likes: {{ this.likes }}</span>
          </div>
          <div>
            <span>Dislikes: {{ this.dislikes }}</span>
          </div>
          <div>
            <span>Submission: {{ this.totalSubmission }}</span>
          </div>
          <div>
            <span>Accepted: {{ this.totalAccepted }}</span>
          </div>
          <div>
            Hints: 
            <ul>
              <li v-for="(hint, index) in hints" :key="index">{{ hint }}</li>
            </ul>
          </div>
        </div>
      </div>
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
  computed: {
    function_signature() {
      return `${this.metaData.return.type} ${this.metaData.name}(${this.problem_input})`;
    },
    problem_input() {
      return this.metaData.params
        .map((param) => `${param.type} ${param.name}`)
        .join(", ");
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get(`/api/problems/${this.$route.params.slug}.json`)
        .then((response) => {
          this.content = response.data.content;
          this.difficulty = response.data.difficulty;
          this.hints = response.data.hints;
          this.dislikes = response.data.dislikes;
          this.likes = response.data.likes;
          this.metaData = response.data.metaData;
          this.question_frontend_id = response.data.question_frontend_id;
          this.solution = response.data.solution;
          this.title = response.data.title;
          this.totalAccepted = response.data.totalAccepted;
          this.totalSubmission = response.data.totalSubmission;
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

<style lang="scss" scoped>
#problem-title {
  text-align: center;
  padding: 10px 0px 20px;
}
#problem {
  display: flex;
  justify-content: space-between;
  > #problem-content {
    flex-basis: 65%;
    #problem-text {
      background: #eee;
      padding: 16px;
      box-shadow: 0px 0px 10px 10px #eee;
      margin-bottom: 20px;
    }
    #problem-code{
      padding-bottom: 30px;
    }
  }
  > #problem-details {
    flex-basis: 30%;
  }
}
</style>
