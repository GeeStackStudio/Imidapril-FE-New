import * as React from "react";
function Flex(props: {
  children?: any;
  direction?: "column" | "row" | "row-reverse" | "column-reverse";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  align?: "center" | "flex-start" | "flex-end" | "middle" | "stretch";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  className?: string;
  style?: React.CSSProperties;
  onClick?: (p?: React.MouseEvent) => any;
}) {
  const style: React.CSSProperties = {
    display: "flex",
  };
  if (props.direction) style.flexDirection = props.direction;
  if (props.align) style.alignItems = props.align;
  if (props.justify) style.justifyContent = props.justify;
  if (props.wrap) style.flexWrap = props.wrap;

  return (
    <div
      style={{ ...style, ...props.style }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
export default Flex;
