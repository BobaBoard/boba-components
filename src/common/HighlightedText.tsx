import React from "react";

const INITIAL_ROTATION = -5;
const HighlightedText: React.FC<HighlightedTextProps> = (props) => {
  const container = React.useRef<HTMLDivElement>();
  const [rotationAdjustment, setRotationAdjustment] = React.useState(0);

  React.useEffect(() => {
    const headerSizes = container.current?.getBoundingClientRect();
    if (!headerSizes) {
      return;
    }
    setRotationAdjustment(
      -(INITIAL_ROTATION * (headerSizes.width / headerSizes.height)) / 20
    );
  }, []);

  return (
    <div>
      <div className="container">
        <div className="backgroundDivs"></div>
        {React.useMemo(
          () =>
            React.isValidElement(props.children) &&
            React.cloneElement(props.children, {
              style: {
                ...props.children.props.style,
                zIndex: 2,
                position: "relative",
              },
              ref: container,
            }),
          [props.children]
        )}
      </div>
      <style jsx>{`
        .container {
          position: relative;
          min-height: 0;
          min-width: 0;
          z-index: 1;
          display: inline-block;
        }
        .backgroundDivs {
          background-color: ${props.highlightColor};
          border-radius: 20px;
          position: absolute;
          width: calc(100% + 30px);
          content: "";
          height: calc(100% - 10px);
          top: 50%;
          transform: translateY(-50%)
            rotate(${INITIAL_ROTATION + rotationAdjustment}deg);
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
  children: React.ReactNode;
}
