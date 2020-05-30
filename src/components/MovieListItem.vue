<template>
  <div class="card">
    <div class="card__image" :style="{ backgroundImage: 'url(' + movie.Poster + ')' }">
    </div>
    <div class="card__info">
      <div class="card__title">{{movie.Title}}</div>
      <div class="card__year">{{movie.Year}}</div>
      <router-link :to="`/movies/${movie.imdbID}`" class="card__link">See details</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card{
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.12);
  border-radius: 12px 4px 12px 4px;
  overflow: hidden;
  transition: 0.3s;
  /* max-width: 200px; */

  &:hover {
    box-shadow: 3px 4px 10px 0 rgba(0, 0, 0, 0.3);
  }

  &__image{
    background-repeat: no-repeat;
    position: relative;
    padding-top: 150%;
    background-size: cover;
  }

  &__rating{
    background-color: #F5C518;
    font-weight: 700;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
  }

  &__info{
    padding: 12px;
    background-color: #fff;
    color: #333;
    flex: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  &__title{
    font-size: 18px;
    font-weight: 500;
    flex: 1;
  }


  &__year{
    font-size: 12px;
    color: #777;
    margin: 16px 0;
  }

  &__link{
    cursor: pointer;
    background-color: #F5C518;
    color: #000;
    padding: 6px;
    text-align: center;
    display: block;
    font-weight: 500;
    text-decoration: none;
    border-radius: 4px;
  }
}
</style>
