import React from "react";
import ReactFlow, { Elements, Edge, Node } from "react-flow-renderer";
import "./App.css";

const numColumns = 4;
const range = (n: number) => Array.from(Array(n).keys());
const l = 50;
const nodes: Array<Node> = [
  {
    id: "perception",
    type: "output", // input node
    data: { label: "Perception" },
    position: { x: l, y: 450 },
  } as Node,
]
  .concat(
    range(numColumns)
      .map((n) => [
        {
          id: `hn-${n}`,
          type: "default",
          data: { label: "hn" },
          position: { x: l + n * 250, y: 250 },
        },

        {
          id: `gpt-${n}`,
          type: "default",
          data: { label: "GPT" },
          position: { x: l + n * 250, y: 300 },
        },
        {
          id: `v-${n}`,
          type: "input",
          data: { label: "value estimate" },
          position: { x: l + n * 250, y: 50 },
        },
        {
          id: `word-${n}`,
          type: "default",
          data: { label: "word" },
          position: { x: l + 100 + n * 250, y: 150 },
        },
      ])
      .flat()
  )
  .concat(
    range(numColumns - 1)
      .map((n) => [
        {
          id: `h1-${n + 1}`,
          type: "default",
          data: { label: "h1" },
          position: { x: l + 50 + (n + 1) * 250, y: 350 },
          style: { width: 20 },
        },
      ])
      .flat()
  );

const edges: Array<Edge> = range(numColumns)
  .map((n: number) => {
    return [
      {
        id: `perception-gpt${n}`,
        target: "perception",
        source: `gpt-${n}`,
        animated: true,
      },
      {
        id: `hn-${n}-gpt-${n}`,
        source: `hn-${n}`,
        target: `gpt-${n}`,
        animated: true,
      },
      {
        id: `hn-${n}-word-${n}`,
        target: `hn-${n}`,
        source: `word-${n}`,
        label: "REINFORCE",
        animated: true,
      },
      {
        id: `hn-${n}-v-${n}`,
        target: `hn-${n}`,
        source: `v-${n}`,
        animated: true,
      },
    ];
  })
  .flat()
  .concat(
    range(numColumns - 1)
      .map((n) => {
        n = n + 1;
        return [
          {
            id: `gpt-${n}-h1-${n}`,
            source: `gpt-${n}`,
            target: `h1-${n}`,
            animated: false,
          },
        ].concat(
          range(n).map((m) => ({
            id: `word-${m}-h1-${n}`,
            source: `word-${m}`,
            target: `h1-${n}`,
            animated: false,
          }))
        );
      })
      .flat()
  );
const elements: Elements = (nodes as Elements).concat(edges as Elements);

const App = () => (
  <div style={{ height: 500 }}>
    <ReactFlow elements={elements} />
  </div>
);
export default App;
