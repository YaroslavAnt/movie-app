<template>
  <div class="home">
    <img alt="Batman logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <MovieList />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
    msg() {
      return `Hello ${this.user.name}, which batman movie do you want to see?`;
    },
  },
};
</script>
