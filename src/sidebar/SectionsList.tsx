import Button, { ButtonStyle } from "buttons/Button";
import { faFont, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import classnames from "classnames";

export interface SectionsListProps {
  sections: {
    id: string;
    title: string;
    type: "category_filter" | "text";
  }[];
  onSelectSection: (id: string) => void;
  onAddSection: (type: "category_filter" | "text") => void;
}

const SectionsList: React.FC<SectionsListProps> = (props) => (
    <div className={classnames("edit-container")}>
      {props.sections.map((section) => (
        <div className={classnames("section")} key={section.id}>
          <Button
            icon={section.type == "text" ? faFont : faTags}
            onClick={() => props.onSelectSection(section.id)}
            theme={ButtonStyle.DARK}
            full
          >
            {section.title}
          </Button>
        </div>
      ))}
      <div className="options-add">
        <Button
          icon={faPlus}
          onClick={() => props.onAddSection("text")}
          theme={ButtonStyle.LIGHT}
        >
          Add Text Section
        </Button>
        <Button
          icon={faPlus}
          onClick={() => props.onAddSection("category_filter")}
          theme={ButtonStyle.LIGHT}
        >
          Add Filters Section
        </Button>
      </div>
      <style jsx>{`
        .options-add {
          margin-top: 10px;
          text-align: center;
        }
        .edit-container.single-description .options-add {
          display: none;
        }
        .edit-container:not(.single-description) .options-delete {
          display: none;
        }
        .section {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );

export default SectionsList;
