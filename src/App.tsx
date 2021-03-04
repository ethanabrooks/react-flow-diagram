import React from "react";
import ReactFlow, { Elements } from "react-flow-renderer";

const numColumns = 3;
const range = (n: number) => Array.from(Array(n).keys());
const elements: Elements = [
  {
    id: "perception",
    type: "output", // input node
    data: { label: "perception" },
    position: { x: 0, y: 350 },
  },
].concat(
  range(numColumns)
    .map((n) => [
      {
        id: `gpt-${n}`,
        type: "default",
        data: { label: "GPT" },
        position: { x: n * 250, y: 250 },
      },
      {
        id: `v-${n}`,
        type: "input",
        data: { label: "V" },
        position: { x: n * 250, y: 50 },
      },
      {
        id: `word-${n}`,
        type: "default",
        data: { label: "word" },
        position: { x: 100 + n * 250, y: 150 },
      },
    ])
    .flat()
);

const edges: Elements = [
  {
    id: "perception-gpt0",
    target: "perception",
    source: "gpt-0",
    animated: true,
  },
].concat(
  range(numColumns - 1)
    .map((n: number) => {
      return [
        {
          id: `gpt-${n}-gpt-${n + 1}`,
          source: `gpt-${n + 1}`,
          target: `gpt-${n}`,
          animated: true,
        },
        {
          id: `word-${n}-gpt-${n}`,
          source: `word-${n}`,
          target: `gpt-${n + 1}`,
          animated: false,
        },
      ];
    })
    .flat()
    .concat(
      range(numColumns)
        .map((n: number) => {
          return [
            {
              id: `gpt-${n}-word-${n}`,
              target: `gpt-${n}`,
              source: `word-${n}`,
              animated: true,
            },
            {
              id: `gpt-${n}-v-${n}`,
              target: `gpt-${n}`,
              source: `v-${n}`,
              animated: true,
            },
          ];
        })
        .flat()
    )
);

const App = () => (
  <div style={{ height: 500 }}>
    <ReactFlow elements={elements.concat(edges)} />
  </div>
);
export default App;
