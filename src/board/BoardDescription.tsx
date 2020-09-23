import React from "react";

import TextSection from "./TextSection";
import CategoryFilterSection from "./CategoryFilterSection";

import classnames from "classnames";

import debug from "debug";
// @ts-ignore
const log = debug("bobaui:boards:boardsDescription");

const BoardDescription: React.FC<BoardDescriptionProps> = (props) => {
  const [filteredCategory, setFilteredCategory] = React.useState<string | null>(
    null
  );

  return (
    <div className={classnames("board-description")}>
      {props.descriptions
        .sort((c1, c2) => c1.index - c2.index)
        .map((description) => {
          switch (description.type) {
            case "text":
              return (
                <TextSection
                  title={description.title}
                  description={description.description || ""}
                  editable={false}
                />
              );
            case "category_filter":
              return (
                <>
                  <CategoryFilterSection
                    title={description.title}
                    categories={
                      description.categories?.map((c) => ({
                        name: c,
                        active:
                          filteredCategory === null || filteredCategory === c,
                      })) || []
                    }
                    editable={false}
                    onCategoryStateChange={(category, state) => {
                      setFilteredCategory(category);
                      props.onCategoriesStateChange(
                        description.categories?.map((category) => {
                          return {
                            category,
                            active: false,
                          };
                        }) || []
                      );
                    }}
                  />
                  <a
                    className={classnames("clear-filters", {
                      visible: filteredCategory != null,
                    })}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setFilteredCategory(null);
                      props.onCategoriesStateChange(
                        description.categories?.map((category) => {
                          return {
                            category,
                            active: true,
                          };
                        }) || []
                      );
                    }}
                  >
                    Clear filters
                  </a>
                </>
              );
          }
        })}
      <style jsx>{`
        .clear-filters {
          color: white;
          font-size: smaller;
          display: block;
          margin-top: 5px;
          visibility: hidden;
        }
        .clear-filters.visible {
          visibility: visible;
        }
        .sidebar-section {
          font-size: large;
          color: red;
        }
        .sidebar-section.editable {
          color: blue;
        }
      `}</style>
    </div>
  );
};

// Types for props
export interface BoardDescriptionProps {
  descriptions: {
    index: number;
    title: string;
    type: "text" | "category_filter";
    description?: string;
    categories?: string[];
  }[];
  // TODO: this should potentially be a promise as the board updates
  onCategoriesStateChange: (
    categories: { category: string; active: boolean }[]
  ) => void;
}

export default BoardDescription;
