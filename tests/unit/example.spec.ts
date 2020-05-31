import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import Button from '@/components/Button.vue';
import MovieList from '@/components/MovieList.vue';

import flushPromises from 'flush-promises';

import axios, { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/dist/util/testing';

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

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe('Button.vue', () => {
  it('Renders props.text when passed', () => {
    const text = 'new text';
    const wrapper = shallowMount(Button, {
      propsData: { text, handleClick: () => console.log('click') },
    });
    expect(wrapper.text()).toMatch(text);
  });

  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallowMount(Button, {
      propsData: { handleClick: mockCallBack },
    });
    wrapper.find('button').trigger('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

const $axios = {
  get: () => {
    return Promise.resolve({
      Search: [
        {
          Title: 'Batman Begins',
          Year: '2005',
          imdbID: 'tt0372784',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
        },
      ],
    });
  },
};

// jest.mock('axios');

describe('MovieList.vue', () => {
  const mountOptions = {
    localVue,
    store: mockStore,
    mocks: { $axios },
  };

  it('has a button', () => {
    const wrapper = mount(MovieList, mountOptions);
    expect(wrapper.contains('button')).toBe(true);
  });

  // it('fetches async when a button is clicked', async () => {
  //   const wrapper = mount(MovieList, mountOptions);
  //   const button = wrapper.find({ name: 'app-button' });
  //   // button.trigger('click');
  //   // await flushPromises();
  //   console.log(wrapper.vm.$data.movies);
  //   // expect(wrapper.vm.$data.movies.length).toBe(1);
  // });
});
