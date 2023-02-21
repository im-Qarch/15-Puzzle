import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheCounter from '../src/components/Puzzle.vue'

describe('Puzzle.vue', () => {
  it('should render', () => {
    const wrapper = mount(TheCounter, { props: { uuid: 10 } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
