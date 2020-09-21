import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme'; 

import { ReactionStory } from './12-PopupMenu.stories';

configure({adapter: new Adapter()});

describe('ReactionStory', () => {
  const wrapper = mount(<ReactionStory/>);

  it('should render with button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });

})
