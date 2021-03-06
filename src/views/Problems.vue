<template>
  <div>
    <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <div>
        <v-select
          v-model="filter.difficulty"
          placeholder="Difficulty"
          :options="[
            { label: 'Easy', id: 1 },
            { label: 'Medium', id: 2 },
            { label: 'Hard', id: 3 },
          ]"
          :reduce="(difficulty) => difficulty.id"
        >
        </v-select>
        <v-select
          v-model="filter.topic_tags"
          placeholder="Topic Tags"
          :options="topic_tags"
          multiple
          :reduce="(topicTag) => topicTag.id"
        >
        </v-select>
        <!-- <b-form-select
          v-model="filter.topic_tags"
          :options="topic_tags"
          multiple
        ></b-form-select> -->
      </div>

      <b-table
        striped
        :items="problems"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
      >
        <template #cell(title)="data">
          <router-link
            :to="{ name: 'ProblemDetail', params: { slug: data.item.slug } }"
            class="problem-title"
          >
            {{ data.value }}
            <b-icon-file-earmark-lock
              class=""
              variant="warning"
              font-scale="1.35"
              v-if="data.item.is_paid_only"
            >
            </b-icon-file-earmark-lock>
          </router-link>
        </template>
        <template #cell(acceptance)="data">
          {{ data.item.ac_rate.toFixed(1) }}%
        </template>
        <template #cell(topic_tags)="data">
          <div>
            <b-badge
              variant="warning"
              v-for="topicTag in data.value"
              :key="topicTag.name"
            >
              {{ topicTag.name }}
            </b-badge>
          </div>
        </template>
      </b-table>
      <b-pagination
        v-model="filter.page"
        :total-rows="pagination.total_rows"
        :per-page="pagination.per_page"
        aria-controls="my-table"
      ></b-pagination>
    </b-overlay>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  name: "Problems",
  components: { vSelect },
  data() {
    return {
      problems: [],
      filter: {
        page: 1,
        topic_tags: [],
        difficulty: null,
      },
      topic_tags: [],
      pagination: {
        total_rows: null,
        per_page: null,
      },
      sortBy: "question_frontend_id",
      sortDesc: false,
      fields: [
        { key: "question_frontend_id", label: "#", sortable: true },
        { key: "title", sortable: true },
        { key: "difficulty", sortable: true },
        { key: "acceptance", sortable: true },
        { key: "topic_tags" },
      ],
      loading: true,
    };
  },
  watch: {
    "filter.page"() {
      this.fetch_problems();
    },
    "filter.difficulty"() {
      this.fetch_problems();
    },
    "filter.topic_tags"() {
      this.fetch_problems();
    },
  },
  methods: {
    fetch_problems() {
      this.$axios
        .get("/api/problems.json", { params: this.filter })
        .then((response) => {
          this.problems = response.data.problems;
          this.pagination = response.data.page_data;
          this.problems.forEach(function (obj) {
            if (obj.is_paid_only === true) {
              obj._rowVariant = "warning";
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.fetch_problems();
    this.$axios.get("/api/topic_tags.json").then((response) => {
      this.topic_tags = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep .sr-only {
  display: none !important;
}
.badge {
  margin: 2px;
}
.badge-warning {
  color: #212529;
  background-color: #ffc107;
}
.problem-title {
  text-decoration: none;
  color: var(--bs-table-striped-color);
  &:hover {
    color: mediumblue;
  }
}
</style>
