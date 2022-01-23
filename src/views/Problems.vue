<template>
  <div>
    <b-overlay
      :show="loading"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
    >
      <b-table
        striped
        :items="problems"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
      >
        <template #cell(title)="data">
          {{ data.value }}
          <b-icon-file-earmark-lock
            class=""
            variant="warning"
            font-scale="1.35"
            v-if="data.item.is_paid_only"
          >
          </b-icon-file-earmark-lock>
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
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "Problems",
  data() {
    return {
      problems: [],
      filter: {
        page: 1,
      },
      pagination: {
        total_rows: null,
        per_page: null,
      },
      sortBy: "question_frontend_id",
      sortDesc: false,
      fields: [
        { key: "question_frontend_id", label: "Id", sortable: true },
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
</style>
