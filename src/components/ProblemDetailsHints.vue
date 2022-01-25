<template>
  <div style="clear: both" v-if="this.hints.length > 0">
    <div v-for="(hint, index) in hints" :key="index">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'hint-' + (index + 1)" variant="light">
          Hint {{ index + 1 }}
        </b-button>
      </b-card-header>
      <b-collapse :id="'hint-' + (index + 1)" accordion="hints" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ hint }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemDetailsHints",
  props: ["hints"],
};
</script>
