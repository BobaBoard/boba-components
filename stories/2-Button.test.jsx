import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme'; 

import Button, { ButtonStyle } from "../src/common/Button";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

configure({adapter: new Adapter()});

describe("Button icon", () => {
  it("renders an icon if icon specified", () => {
      const wrapper = mount(<Button icon={faCoffee}>This is a button with icon</Button>);
      expect(wrapper.find('.icon')).toHaveLength(1);
  });
  it("doesn't render an icon if no icon specified", () => {
      const wrapper = mount(<Button>This is a button without an icon</Button>);
      expect(wrapper.find('.icon')).toHaveLength(0);
  });
})

