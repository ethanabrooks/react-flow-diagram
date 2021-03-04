import { getBezierPath } from "react-flow-renderer";
import React from "react";

export type Props = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  centerX: number;
  label?: string;
};

export const CustomEdge = (centerY: number) => {
  return ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    centerX,
    label,
  }: Props) => {
    console.log(centerX);
    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      centerX,
      centerY,
      targetX,
      targetY,
    });
    return (
      <>
        <path id={id} className="react-flow__edge-path" d={edgePath} />
        {label === undefined ? (
          <React.Fragment />
        ) : (
          <text>
            <text className="react-flow__edge-textbg" textAnchor="middle">
              {label}
            </text>
          </text>
        )}
      </>
    );
  };
};
