import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import Vuex from 'vuex';

import MovieList from '@/components/MovieList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const storeOptions = {
  state: {
    user: {
      name: 'Bob Razowski',
      apiToken: '273b9080',
    },
  },
};

const mockStore = new Vuex.Store(storeOptions);

describe('MovieList.vue', () => {
  let mountOptions: any;
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    mountOptions = {
      localVue,
      store: mockStore,
      loadMore: () => console.log('cliiiiiiick'),
    };
    wrapper = mount(MovieList, mountOptions);
  });

  it('has a button', () => {
    expect(wrapper.contains('button.btn')).toBe(true);
  });
});
