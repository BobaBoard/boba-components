import React from "react";

import DropdownListMenu from "../common/DropdownListMenu";
import Button from "../../src/buttons/Button";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { action } from "@storybook/addon-actions";

const HiddenThreadContainer: React.FC = (props) => {
    return (
      <div className="post hidden" >
        You hid this thread{" "}
        <div className="dropdown">
          <DropdownListMenu
            label="Post options"
            options={[
              {
                name: "Unhide Thread",
                link: {
                  onClick: action("noHrefClick"),
                }
              }]}
          >
            <DropdownListMenu.Header>
            </DropdownListMenu.Header>
            <span className="post options icon">
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>
          </DropdownListMenu>
        </div>
        <div className="reveal thread">
          <Button>Reveal Thread</Button>
        </div>
        <style jsx>{`
          .post.hidden {
            margin: 0 auto;
            max-width: 500px;
            width: calc(100% - 40px);
            background-color: gray;
            padding: 20px;
            border: 1px dashed black;
            border-radius: 15px;
          }
          .reveal.thread {
            text-align:center;
          }
          .dropdown{
            display:inline-block;
            float:right;
          }
        `}</style>
      </div>
    );
  };

export default HiddenThreadContainer;