import React from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const params = useParams();
  console.log(params.code);
  return <div>Game</div>;
};

export default Game;
