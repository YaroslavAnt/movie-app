<template>
  <div>
    <div class="select"><span>Select movie type</span> &emsp;
      <select
        v-model="type"
        name="movieType"
        @change="({target})=>loadMovies(target.value)"
        class="select__box"
      >
        <option value="">all</option>
        <option
          v-for="movieType in types"
          :key='movieType'
          :value="movieType"
        >
          {{movieType}}
        </option>
      </select>
    </div>

    <div class="list">
      <MovieListItem v-for="(movie, idx) in movies" :key="movie.imdbID + idx" :movie="movie" />
    </div>

    <p v-if="movies.length===0" class="message">No movies yet ...</p>
    <Button :handleClick="loadMore" :text="'Load more'"></Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MovieService from '@/services/MovieService';
import MovieListItem from './MovieListItem.vue';
import Button from './Button.vue';
import { Movie } from '../services/types';

export default Vue.extend({
  name: 'MovieList',
  data() {
    return {
      movies: [] as Movie[],
      currentPage: 1,
      type: '',
      types: ['movie', 'series', 'episode'],
    };
  },

  async created() {
    await this.loadMovies();
  },
  methods: {
    async loadMovies(type = '') {
      const { apiToken } = this.user;
      const result = await MovieService.movieService.getMovieList(apiToken, 1, type);
      this.movies = result.result || [];
    },
    async loadMore() {
      const { apiToken } = this.user;
      const result = await MovieService.movieService.getMovieList(
        apiToken, this.currentPage + 1, this.type,
      );
      const loadedMovies = result.result || [];
      this.movies = [...this.movies, ...loadedMovies];
      this.currentPage += 1;
    },
  },
  components: {
    MovieListItem,
    Button,
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
.select{
  padding: 30px;
  font-size: 18px;
  text-align: right;

  &__box{
    font-size: 16px;
    padding: 4px;
  }
}
.list {
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fit, 260px);
  }
}

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
