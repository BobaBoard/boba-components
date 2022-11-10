import "@testing-library/jest-dom/extend-expect";

import { InputProps } from "common/Input";
import { Password } from "stories/Common/100-Input.stories";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

describe("when a password input is displayed", () => {
  it("displays a visibility toggle", () => {
    const { getByRole } = render(
      <Password {...(Password.args as InputProps)} />
    );

    const visibilityToggle = getByRole("checkbox");

    expect(visibilityToggle).toBeInTheDocument();
  });

  it("changes the input to text when the toggle is clicked", () => {
    const { getByRole, getByLabelText } = render(
      <Password {...(Password.args as InputProps)} />
    );

    const visibilityToggle = getByRole("checkbox");
    const passwordInput = getByLabelText("Password");

    userEvent.click(visibilityToggle);

    expect(passwordInput.getAttribute("type")).toBe("text");
  });
});
