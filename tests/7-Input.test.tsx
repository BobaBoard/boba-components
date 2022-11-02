import "@testing-library/jest-dom/extend-expect";

import { InputProps } from "common/Input";
import { Password } from "stories/7-Input.stories";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

describe("Password", () => {
  test("Input has a visibility toggle", () => {
    const { getByRole } = render(
      <Password {...(Password.args as InputProps)} />
    );

    const visibilityToggle = getByRole("button");

    expect(visibilityToggle).toBeInTheDocument();
  });

  test("Clicking visibility toggle makes password visible", () => {
    const { getByRole, getByLabelText } = render(
      <Password {...(Password.args as InputProps)} />
    );

    const visibilityToggle = getByRole("button");
    const passwordInput = getByLabelText("Password");

    userEvent.click(visibilityToggle);

    expect(passwordInput.getAttribute("type")).toBe("text");
  });
});
