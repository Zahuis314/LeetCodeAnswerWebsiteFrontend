<template>
  <div style="clear: both">
    <b-button
      class="collapse-button"
      v-b-toggle.topic-tags
      variant="light"
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      @click="visible = !visible"
    >
      Topic Tags
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
    <b-collapse id="topic-tags" accordion="topic-tags" role="tabpanel">
      <b-card-body>
        <b-card-text>
          <b-badge
            class="badgets"
            v-for="(topic, index) in topicTags"
            :key="index"
          >
            {{ topic.name }}
          </b-badge>
        </b-card-text>
      </b-card-body>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "ProblemDetailsTopicTags",
  data() {
    return {
      visible: true,
    };
  },
  props: ["topicTags"],
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
.badgets {
  display: inline-block;
  margin: 3px 5px;
  padding: 5px;
  overflow-wrap: normal;
  background-color: gray;
  white-space: pre-line;
}
</style>
