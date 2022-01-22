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
      </b-table>
    </b-overlay>
  </div>
</template>

<script>
import { BIconFileEarmarkLock } from "bootstrap-vue";

export default {
  name: "Problems",
  components: { BIconFileEarmarkLock },
  data() {
    return {
      problems: [],
      sortBy: "question_frontend_id",
      sortDesc: false,
      fields: [
        { key: "question_frontend_id", label: "Id", sortable: true },
        { key: "title", sortable: true },
        { key: "difficulty", sortable: true },
        { key: "acceptance", sortable: true },
      ],
      loading: true,
    };
  },
  mounted() {
    this.$axios
      .get("/api/problems.json")
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
