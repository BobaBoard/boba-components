
import React from "react";

const HighlightedText: React.FC<HighlightedTextProps> = (props) => {
  return (
    <div>
      <div className="header">
        <div className="backgroundDivs">
        </div>
        <div>Hello! This is the new text highlight.</div>
      </div>
      <style jsx>{`
        .header {
          position: relative;
          min-height: 0;
          min-width: 0;
          z-index: 10;
        }
        .backgroundDivs {
          background-color: pink;
          border-radius: 20px;
          position: absolute;
          width: calc(100% + 30px);
          content: '';
          height: 20px;
          transform: rotate(calc(-5deg * (100% / 27)));
          z-index: -1;
          left: -15px;
        }
      `}</style>
    </div>
  );
};

export default HighlightedText;

export interface HighlightedTextProps {
  highlightColor: string;
  children: JSX.Element;
}
