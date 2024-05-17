import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./Flow.css";
import Button from "../utils/Button";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "first node" },
    position: { x: 250, y: 50 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activity, setactivity] = useState(false);
  const [id, setId] = useState(null);

  const onNodeClick = (event, value) => {
    //setNodeName(value.data.label);
    setId(value.id);
    setactivity(true);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: event.target.value } }
          : node
      )
    );
  };

  // const editHandler = () => {
  //   const result = nodes.map((item) => {
  //     if (item.id === id) {
  //       item.data = {
  //         ...item.data,
  //         label: nodeName,
  //       };
  //     }
  //     return item;
  //   });
  //   setNodes(result);
  //   setNodeName("");
  // };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <>
      <h1>Hello Flowr..</h1>
      <div className="dndflow">
        <ReactFlowProvider>
          <Sidebar />
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={(e, v) => onNodeClick(e, v)}
              fitView
            >
              <Controls />
              <Background color="black" variant="dots" />
            </ReactFlow>
          </div>
          {activity === true && (
            <div className="updatenode">
              <button
                onClick={() => setactivity(!activity)}
                className="cancelpopover"
              >
                X
              </button>
              <br />
              <label className="lable" htmlFor="label">
                Label:{" "}
              </label>
              <br />
              <input
                type="text"
                id="nodename"
                value={nodes.find((node) => node.id === id)?.data?.label || ""}
                onChange={changeHandler}
              />
              <br />
              <Button className="btn" onclick={changeHandler}>
                Update
              </Button>
            </div>
          )}
          {/* <div className="updatenode">
            <button className="cancelpopover">X</button>
            <br />
            <label className="lable" htmlFor="label">
              Label:{" "}
            </label>
            <br />
            <input
              type="text"
              id="nodename"
              value={nodes.find((node) => node.id === id)?.data?.label || ""}
              onChange={changeHandler}
            />
            <br />
            <Button className="btn" onclick={changeHandler}>
              Update
            </Button>
          </div> */}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Flow;
