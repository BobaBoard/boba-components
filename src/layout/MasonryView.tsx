import React from "react";
// @ts-ignore
import MagicGrid from "react-magic-grid";

const GUTTER_SIZE = 15;
const MasonryView: React.ForwardRefRenderFunction<
  { reposition: () => void },
  MasonryViewProps
> = (props, ref) => {
  const gridRef = React.createRef<{
    positionItems?: () => void;
  }>();

  React.useImperativeHandle(ref, () => ({
    reposition: () => {
      gridRef.current?.positionItems?.();
    },
  }));
  return (
    <div className="the-pics">
      <MagicGrid
        // breakpointCols={{
        //   default: 3,
        //   1570: 2,
        //   1070: 1,
        // }}
        // className="my-masonry-grid"
        // columnClassName="my-masonry-grid_column"
        items={props.children.length}
        ref={gridRef}
      >
        {props.children}
      </MagicGrid>
      <style jsx>{`
        .the-pics {
          width: 100%;
        }
        :global(.my-masonry-grid) {
          display: flex;
          margin-left: -${GUTTER_SIZE}px; /* gutter size offset */
          width: auto;
        }
        :global(.my-masonry-grid_column) {
          padding-left: ${GUTTER_SIZE}px; /* gutter size */
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export interface MasonryViewProps {
  children: JSX.Element[] | Element[];
}

export default React.forwardRef(MasonryView);
