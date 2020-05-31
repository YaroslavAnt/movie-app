<template>
  <button class="btn" @click="handleClick">{{ text }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app-button',
  props: {
    text: String,
    handleClick: Function,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  border: none;
  outline: none;
  background-color: #777;
  color: #fff;
  border-radius: 4px;
  padding: 10px 40px;
  cursor: pointer;
  display: block;
  margin: 30px auto;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #555;
  }
}
</style>
