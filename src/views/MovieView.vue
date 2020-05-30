<template>
  <div class="movie-view">
    <div class="movie__data">
      <div class="movie__poster" v-if="!error">
        <span class="movie__poster--fill">
          <img :src="movie.Poster" />
        </span>
        <span class="movie__poster--featured">
          <img :src="movie.Poster" />
        </span>
      </div>

      <div class="movie__details" v-if="!error">
        <h1 class="movie__title">{{ movie.Title }}</h1>
        <ul class="movie__tags">
          <li class="movie__rated">{{ movie.Rated }}</li>
          <li class="movie__year">{{ movie.Year }}</li>
          <li class="movie__genre">{{ movie.Genre }}</li>
        </ul>
        <p class="movie__plot">{{ movie.Plot }}</p>
        <div class="movie__credits">
          <p><strong>Written by:</strong> {{ movie.Writer }}</p>
          <p><strong>Directed by:</strong> {{ movie.Director }}</p>
          <p><strong>Starring:</strong> {{ movie.Actors }}</p>
        </div>
      </div>
      <div class="movie__error" v-show="error">
        <h2>Something went wrong</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MovieService from '@/services/MovieService';

export default Vue.extend({
  name: 'MovieView',
  data() {
    return {
      movie: {},
      movieId: this.$route.params.movieId,
      error: '',
    };
  },
  async created() {
    await this.loadMovie();
  },
  methods: {
    async loadMovie() {
      try {
        this.error = '';
        const { apiToken } = this.user;
        const result = await MovieService.movieService.getSpecificMovie(apiToken, this.movieId);
        this.movie = result;
      } catch (error) {
        console.error(error);
        this.error = error.message;
      }
    },
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
$base-spacing: 12px;
$poster-span: 200px;
$poster-width: 200px;
.movie {
  &__data {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: $poster-span * 2;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__tags {
    font-size: 0.75em;
    color: darkgray;

    li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: $base-spacing;
      }
    }
  }

  &__poster {
    position: relative;
    display: flex;
    width: 100%;

    @media (min-width: 768px) {
      margin-right: $base-spacing;
      width: $poster-span;
    }

    &--fill {
      position: absolute;
      overflow: hidden;
      top: -60%;
      left: -20%;
      width: 150%;
      height: 150%;
      background-color: gainsboro;
      transform: rotate(5deg);

      @media (min-width: 768px) {
        top: -20%;
        width: 100%;
      }

      img {
        filter: blur(6px);
        object-fit: cover;
        width: 100%;
        height: 100%;
        transform: scale(1.4);
      }
    }

    &--featured {
      position: relative;
      display: block;
      align-self: center;
      margin-top: $base-spacing * 7;
      margin-left: $base-spacing * 2;
      width: $poster-width;
      background-color: lightgray;
      border-radius: 2px;
      z-index: 1;

      @media (min-width: 768px) {
        margin: auto;
      }

      img {
        display: block;
        width: 100%;
        box-shadow: rgba(black, 0.6) 0 6px 12px -6px;
      }
    }
  }

  &__details {
    flex: 1;
    padding: $base-spacing;
    text-align: left;

    @media (min-width: 768px) {
      padding: $base-spacing * 3;
    }
  }

  &__title {
    font-size: 2em;
  }

  &__error {
    align-self: center;
    justify-self: center;
    width: 100%;
    text-align: center;
  }
}
</style>
