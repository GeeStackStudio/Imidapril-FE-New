import React from "react";
interface MassaSelectableItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}
export default function MassaSelectableItem(props: MassaSelectableItemProps) {
  const { isSelected, ...divProps } = props;
  let className = "massa-selectable-item";
  if (props.isSelected) {
    className += " massa-selectable-item-active";
  }
  if (props.className) {
    className += " " + props.className;
  }
  return (
    <div {...divProps} className={className}>
      {props.children}
    </div>
  );
}
