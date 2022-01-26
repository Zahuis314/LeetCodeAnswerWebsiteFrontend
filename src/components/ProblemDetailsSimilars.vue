<template>
  <div style="clear: both">
    <b-button
      class="collapse-button"
      v-b-toggle.similars
      variant="light"
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      @click="visible = !visible"
    >
      Similars
      <b-icon-chevron-up
        class="collapse-arrow"
        font-scale="1.35"
        v-if="!visible"
      />
      <b-icon-chevron-down
        class="collapse-arrow"
        font-scale="1.35"
        v-if="visible"
      />
    </b-button>
    <b-collapse id="similars" accordion="similars" role="tabpanel">
      <b-card-body>
        <b-card-text>
          <b-badge
            :class="['badgets', problem.difficulty.toLowerCase()]"
            v-for="(problem, index) in problems"
            :key="index"
            router-tag="span"
            :to="{ name: 'ProblemDetail', params: { slug: problem.slug } }"
          >
            {{ problem.title }}
          </b-badge>
        </b-card-text>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "ProblemDetailsSimilars",
  data() {
    return {
      visible: true,
    };
  },
  props: ["problems"],
};
</script>

<style lang="scss" scoped>
.collapse-button {
  width: 100%;
  text-align: left;
  .collapse-arrow {
    float: right;
  }
}
.easy {
  background-color: #00d400;
}
.medium {
  background-color: #bebe00;
}
.hard {
  background-color: red;
}
.badgets {
  display: inline-block;
  margin: 3px 5px;
  padding: 5px;
  overflow-wrap: normal;
  white-space: pre-line;
}
</style>
