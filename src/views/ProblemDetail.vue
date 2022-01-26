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
          <code id="problem-code" v-if="metaData">
            public {{ this.function_signature }}{
            <br />
            }
          </code>
        </div>
        <div id="problem-details">
          <div class="splitted-detail">
            <p>Difficulty:</p>
            <p class="font-bold" :style="{ color: color }">
              {{ this.difficulty }}
            </p>
          </div>
          <div class="splitted-detail">
            <p>Likes:</p>
            <p>{{ this.likes }}</p>
          </div>
          <div class="splitted-detail">
            <p>Dislikes:</p>
            <p>{{ this.dislikes }}</p>
          </div>
          <div class="splitted-detail">
            <p>Submission:</p>
            <p>{{ this.totalSubmission }}</p>
          </div>
          <div class="splitted-detail">
            <p>Accepted:</p>
            <p>{{ this.totalAccepted }}</p>
          </div>
          <ProblemDetailsHints :hints="hints" :style="{ paddingTop: 10 }" />
          <ProblemDetailsSimilars :problems="similar_problems" />
          <ProblemDetailsTopicTags :topicTags="topicTags" />
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import ProblemDetailsHints from "@/components/ProblemDetailsHints.vue";
import ProblemDetailsSimilars from "@/components/ProblemDetailsSimilars.vue";
import ProblemDetailsTopicTags from "@/components/ProblemDetailsTopicTags.vue";
export default {
  name: "ProblemDetail",
  components: {
    ProblemDetailsHints,
    ProblemDetailsSimilars,
    ProblemDetailsTopicTags,
  },
  data() {
    return {
      content: "",
      difficulty: "",
      hints: [],
      dislikes: 0,
      likes: 0,
      metaData: { name: "", params: [], return: {} },
      question_frontend_id: "",
      solution: null,
      title: "",
      totalAccepted: 0,
      totalSubmission: 0,
      similar_problems: [],
      topicTags: [],
      loading: true,
    };
  },
  computed: {
    function_signature() {
      if (this.metaData.params) {
        var problem_input = this.metaData.params
          .map((param) => `${param.type} ${param.name}`)
          .join(", ");
        return `${this.metaData.return.type} ${this.metaData.name}(${problem_input})`;
      } else {
        return "";
      }
    },
    color() {
      var colors = { Easy: "#00d400", Medium: "#bebe00", Hard: "red" };
      return colors[this.difficulty];
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
          this.totalAccepted = response.data.totalAccepted
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.totalSubmission = response.data.totalSubmission
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.similar_problems = response.data.similar_problems;
          this.topicTags = response.data.topic_tags;
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
    #problem-code {
      padding-bottom: 30px;
    }
  }
  > #problem-details {
    flex-basis: 30%;
    .splitted-detail {
      clear: both;
      :first-child {
        float: left;
        margin-bottom: 5px;
      }
      :last-child {
        float: right;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
