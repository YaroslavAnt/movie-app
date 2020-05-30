<template>
<div>
  <div class="list">
    <MovieListItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      />
  </div>

  <button class="btn">Load more</button>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MovieService from '@/services/MovieService';
import MovieListItem from './MovieListItem.vue';
import { Movie } from '../services/types';

export default Vue.extend({
  name: 'MovieList',
  data() {
    return {
      movies: [] as Movie[],
    };
  },
  async created() {
    await this.loadMovies();
  },
  methods: {
    async loadMovies() {
      const result = await MovieService.movieService.getMovieList(this.user.apiToken);
      this.movies = result.result;
    },

  },
  components: {
    MovieListItem,
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.list{
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, 260px);
  }
}

.btn{
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

  &:hover{
    background-color: #555;
  }
}
</style>
