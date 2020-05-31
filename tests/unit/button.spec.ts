import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Button from '@/components/Button.vue';

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
