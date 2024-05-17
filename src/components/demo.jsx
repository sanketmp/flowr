import React from "react";
import ReactFlow, { addNodes } from "reactflow";

const Demo = () => {
  const onCreateNode = () => {
    addNodes({ nodes: [{ id: "newNode", position: { x: 100, y: 100 } }] });
  };

  return (
    <div>
      <button onClick={onCreateNode}>Create node</button>
      <ReactFlow />
    </div>
  );
};

export default Demo;
