import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../utils/Button";

const Home = () => {
  return (
    <>
      <div className="container">
        <Button>
          <FaPlus />
          Create Node
        </Button>
      </div>
    </>
  );
};

export default Home;
