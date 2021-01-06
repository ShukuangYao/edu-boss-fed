<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
  a = 1

  add() {
    this.a += 1;
  }
}
</script>
<style lang="scss" scoped>
</style>
