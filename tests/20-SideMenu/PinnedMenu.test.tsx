import "@testing-library/jest-dom/extend-expect";

import * as stories from "stories/20-SideMenu/01-PinnedMenu.stories";

import PinnedMenu, {
  BasePinnedSectionProps,
  LoadingPinnedSectionProps,
  PinnedMenuSectionProps,
  WithPinnedSectionProps,
} from "sidemenu/PinnedMenu";
import { render, screen, waitFor, within } from "@testing-library/react";

import { BoardType } from "types";
import { CircleButtonProps } from "buttons/CircleButton";
import { DropdownProps } from "common/DropdownListMenu";
import React from "react";
import { action } from "@storybook/addon-actions";
import { composeStories } from "@storybook/testing-react";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { mocked } from "jest-mock";
import userEvent from "@testing-library/user-event";

jest.mock("@storybook/addon-actions");

const { Boards, Loading, Icons, MultipleSections } = composeStories(stories);

describe("Boards", () => {
  test("Renders section with boards", async () => {
    render(<Boards />);

    expect(
      screen.getByLabelText(
        (Boards!.args! as BasePinnedSectionProps).sectionId!
      )
    ).toBeVisible();

    const boards = screen.getAllByRole("link");
    expect(boards).toHaveLength(
      (Boards.args as WithPinnedSectionProps).items.length
    );
    boards.forEach((board, i) => {
      expect(board).toHaveAccessibleName(
        expect.stringContaining(
          ((Boards.args as WithPinnedSectionProps).items as BoardType[])[i].slug
        )
      );
    });
  });

  test("Board menu items link to boards", async () => {
    render(<Boards />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);

    const boardLinks = screen.getAllByRole("link");
    for (const boardLink of boardLinks) {
      userEvent.click(boardLink);
      await waitFor(() => {
        expect(action).toBeCalledWith("#slug");
        expect(boardLink).toHaveAttribute("href", "#slug");
      });
    }
  });

  test("Correctly marks current board", async () => {
    render(<Boards />);

    const currentBoard = screen.getByRole("link", { current: "page" });
    expect(currentBoard).toHaveAccessibleName(
      expect.stringContaining("kink-memes")
    );
    const svgs = currentBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-map-marker-alt");
    expect(svgs[0]).toBeVisible();
  });

  test("Correctly renders board without updates", async () => {
    render(<Boards />);

    const oncieBoard = screen.getByRole("link", { name: "oncie-den" });
    expect(
      within(oncieBoard).queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    const svgs = oncieBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });

  test("Correctly marks boards with updates", async () => {
    render(<Boards />);

    const goreBoard = screen.getByLabelText("gore has new updates");
    expect(
      within(goreBoard).getByRole("presentation", { hidden: true })
    ).toBeVisible();
    expect(
      within(goreBoard).getByRole("presentation", { hidden: true })
    ).toHaveClass("board-icon__update");
    const svgs = goreBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });

  test("Correctly marks outdated boards with updates", async () => {
    render(<Boards />);

    const crackBoard = screen.getByLabelText("crack has updates");
    expect(
      within(crackBoard).getByRole("presentation", { hidden: true })
    ).toBeVisible();
    expect(
      within(crackBoard).getByRole("presentation", { hidden: true })
    ).toHaveClass("board-icon__update");
    const svgs = crackBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(0);
  });

  test("Correctly marks muted board", async () => {
    render(<Boards />);

    const mutedBoard = screen.getByLabelText("anime muted");
    expect(
      screen.queryByLabelText("anime has updates")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("anime has new updates")
    ).not.toBeInTheDocument();
    expect(
      within(mutedBoard).queryByRole("presentation", { hidden: true })
    ).not.toBeInTheDocument();
    const svgs = mutedBoard.getElementsByTagName("svg");
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveClass("fa-volume-mute");
    expect(svgs[0]).toBeVisible();
  });
});

describe("Loading", () => {
  test("Renders loading section", async () => {
    render(<Loading />);

    expect(
      screen.getByLabelText(
        `${(Loading.args as PinnedMenuSectionProps).sectionId} are loading`
      )
    ).toBeVisible();
    expect(screen.getAllByLabelText("pinned item is loading")).toHaveLength(
      (Loading.args as LoadingPinnedSectionProps).loadingElementsCount
    );
  });
});

describe("Icons", () => {
  test("Renders section with icons", async () => {
    render(<Icons />);

    expect(
      screen.getByLabelText((Icons!.args! as BasePinnedSectionProps).sectionId!)
    ).toBeVisible();

    const argsItems = (Icons.args as WithPinnedSectionProps)
      .items as (CircleButtonProps & {
      id: string;
      menuOptions?: DropdownProps["options"];
    })[];

    const linkIcons = screen.getAllByRole("link");
    const linkArgs = argsItems.filter((item) => !item.menuOptions);
    expect(linkIcons).toHaveLength(linkArgs.length);
    linkIcons.forEach((icon, i) => {
      expect(icon).toHaveAccessibleName(
        expect.stringContaining(linkArgs[i].id)
      );
    });

    const buttonIcons = screen.getAllByRole("button");
    const buttonArgs = argsItems.filter((item) => item.menuOptions);
    expect(buttonIcons).toHaveLength(buttonArgs.length);
    const buttonArgIndex = argsItems.findIndex((item) => item.menuOptions);
    expect(buttonIcons[0]).toHaveAccessibleName(argsItems[buttonArgIndex].id);
  });

  test("Icons with links have correct links", async () => {
    render(<Icons />);
    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);

    const argsItems = (Icons.args as WithPinnedSectionProps)
      .items as (CircleButtonProps & {
      id: string;
      menuOptions?: DropdownProps["options"];
    })[];

    const linkArgs = argsItems.filter((item) => !item.menuOptions);

    const iconLinks = screen.getAllByRole("link");

    for (const [i, iconLink] of iconLinks.entries()) {
      userEvent.click(iconLink);
      await waitFor(() => {
        expect(action).toBeCalledWith(`#${linkArgs[i].id}`);
        expect(iconLink).toHaveAttribute("href", `#${linkArgs[i].id}`);
      });
    }
  });

  test("Correctly marks icon without notification", async () => {
    render(<Icons />);

    expect(screen.getByRole("link", { name: "heart" })).toBeInTheDocument;
    expect(screen.queryByLabelText("heart has new updates")).not
      .toBeInTheDocument;
    expect(document.querySelector(".has-dot")).not.toContainElement(
      screen.getByRole("link", { name: "heart" })
    );
  });

  test("Correctly marks icon with notification", async () => {
    render(<Icons />);

    expect(
      within(document.querySelector(".has-dot")!).getByRole("link")
    ).toHaveAccessibleName("inbox has new updates");
  });

  test("Correctly marks current icon", async () => {
    render(<Icons />);

    const currentIcon = screen.getByRole("link", { current: "page" });
    expect(currentIcon).toHaveAccessibleName("star");
    expect(document.querySelector(".circle-button")).toContainElement(
      currentIcon
    );
    expect(
      within(document.querySelector(".circle-button")!).getByRole(
        "presentation"
      )
    ).toBeVisible();
  });

  test("Renders icon options dropdown", async () => {
    render(<Icons />);

    const actionReturn = jest.fn();
    mocked(action).mockReturnValue(actionReturn);

    userEvent.click(screen.getByLabelText("user options"));
    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeVisible();
    });
    userEvent.click(screen.getByText("Option 1"));
    await waitFor(() => {
      expect(action).toBeCalledWith("userOption1");
    });

    await waitFor(() => {
      expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByLabelText("user options"));
    await waitFor(() => {
      expect(screen.getByText("Option 2")).toBeVisible();
    });
    userEvent.click(screen.getByText("Option 2"));
    await waitFor(() => {
      expect(action).toBeCalledWith("userOption2");
    });
  });
});

describe("Multiple Sections", () => {
  test("Renders sections in order", async () => {
    render(<MultipleSections />);

    const sections = document.getElementsByTagName("section");
    expect(sections).toHaveLength(MultipleSections!.args!.items!.length);

    expect(sections[0]).toContainElement(
      screen.getByLabelText(MultipleSections!.args!.items![0].sectionId!)
    );
    expect(sections[1]).toContainElement(
      screen.getByLabelText(
        `${MultipleSections!.args!.items![1].sectionId!} are loading`
      )
    );
    expect(sections[2]).toContainElement(
      screen.getByLabelText(MultipleSections!.args!.items![2].sectionId!)
    );
  });
});

// I originally thought this would be testing that if you didn't have any pinned boards, you wouldn't see that section at all
// but the component implementation renders the icon regardsless, so testing that it doesn't render the section at all if you have no pinned boards should be done in the frontend codebase
test("Doesn't render items in empty section", async () => {
  render(
    <PinnedMenu>
      <PinnedMenu.Section
        icon={faThumbtack}
        sectionId="pinned boards"
        items={[]}
      />
    </PinnedMenu>
  );

  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(
    screen.queryByLabelText("loading pinned item placeholder")
  ).not.toBeInTheDocument();
  expect(screen.getByLabelText("pinned boards")).toBeVisible();
});
