import { getBezierPath } from "react-flow-renderer";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  centerX,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  centerX: number;
}) {
  const centerY = 500;
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
    </>
  );
}
