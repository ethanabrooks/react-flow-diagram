import React from "react";
import ReactFlow, { Elements, Edge, Node } from "react-flow-renderer";
import "./App.css";
import { CustomEdge } from "./CustomEdge";

const numColumns = 4;
const range = (n: number) => Array.from(Array(n).keys());
const l = 50;
const nodes: Array<Node> = [
  {
    id: "perception",
    type: "output", // input node
    data: { label: "perception" },
    position: { x: l, y: 1200 },
  } as Node,
  {
    id: "action",
    type: "input", // input node
    data: { label: "action distribution" },
    position: { x: numColumns * 250, y: 350 },
  } as Node,
]
  .concat(
    range(numColumns)
      .map((n) => [
        {
          id: `gpt-${n}`,
          type: "default",
          data: { label: "GPT" },
          position: { x: l + n * 250, y: 720 },
        },
        {
          id: `v-${n}`,
          type: "input",
          data: { label: "value estimate" },
          position: { x: l + n * 250, y: 450 },
        },
      ])
      .flat()
  )
  .concat(
    range(numColumns - 1)
      .map((n) => [
        {
          id: `hn-${n}`,
          type: "default",
          data: {
            label: (
              <p>
                h<sub>n</sub>
              </p>
            ),
          },

          style: { width: 20, height: 30 },
          position: { x: l + 50 + n * 250, y: 650 },
        },

        {
          id: `h1-${n + 1}`,
          type: "default",
          data: {
            label: (
              <p>
                h<sub>1</sub>
              </p>
            ),
          },
          position: { x: l + 50 + (n + 1) * 250, y: 770 },
          style: { width: 20, height: 30, align: "top" },
        },
        {
          id: `word-${n}`,
          type: "default",
          data: { label: "word" },
          position: { x: l + 100 + n * 250, y: 550 },
        },
      ])
      .flat()
  );

const edges: Array<Edge> = [
  {
    id: `action-perception`,
    target: `perception`,
    source: `action`,
    animated: true,
    type: "custom2",
  } as Edge,
  {
    id: `action-gpt-n`,
    target: `gpt-${numColumns - 1}`,
    source: `action`,
    animated: true,
    // type: "custom2",
  } as Edge,
]
  .concat(
    range(numColumns)
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
            id: `gpt-${n}-v-${n}`,
            target: `gpt-${n}`,
            source: `v-${n}`,
            animated: true,
          },
        ];
      })
      .flat()
  )
  .concat(
    range(numColumns - 1)
      .map((n) => {
        let o = n + 1;
        return [
          {
            id: `gpt-${o}-h1-${o}`,
            source: `gpt-${o}`,
            target: `h1-${o}`,

            animated: false,
          },
          {
            id: `hn-${n}-word-${n}`,
            target: `hn-${n}`,
            source: `word-${n}`,
            label: "sample",
            animated: true,
          },
        ].concat(
          range(o).map((m) => ({
            id: `word-${m}-h1-${n}`,
            source: `word-${m}`,
            target: `h1-${o}`,
            animated: false,
            type: "custom1",
          }))
        );
      })
      .flat()
  );
const elements: Elements = (nodes as Elements).concat(edges as Elements);

const App = () => (
  <div style={{ height: 1500 }}>
    <ReactFlow
      edgeTypes={{
        custom1: CustomEdge(1000),
        custom2: CustomEdge(1200),
        custom3: CustomEdge(150),
      }}
      elements={elements}
    />
  </div>
);
export default App;
