import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementOppSeconds } from "../slices/gameSlice";

const Board = ({
  board,
  socket,
  setBoard,
  chess,
  setWhiteTimeSeconds,
  setBlackTimeSeconds,
}) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const type = useSelector((state) => state.game.type);
  const dispatch = useDispatch();

  const handleCellClick = (square, squareRepresentation) => {
    if (
      (type === "join" && chess._turn === "b") ||
      (type === "create" && chess._turn === "w")
    )
      if (!from) {
        setFrom(squareRepresentation);
      } else {
        socket.send(
          JSON.stringify({
            type: "move",
            move: {
              from,
              to: squareRepresentation,
            },
          })
        );
        setFrom(null);
        chess.move({
          from,
          to: squareRepresentation,
        });
        console.log(chess, "chess test");
        setBoard(chess.board());
        if (chess._turn === "b") {
          clearInterval(whiteTime);
          var blackTime = setInterval(() => {
            if (chess._turn === "w") {
              clearInterval(blackTime);
            }
            setBlackTimeSeconds((prev) => prev - 1);
          }, 1000);
        } else if (chess._turn === "w") {
          clearInterval(blackTime);
          var whiteTime = setInterval(() => {
            if (chess._turn === "b") {
              clearInterval(whiteTime);
            }
            setWhiteTimeSeconds((prev) => prev - 1);
          }, 1000);
        }
      }
  };
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation =
                String.fromCharCode(97 + (j % 8)) + "" + (8 - i);
              return (
                <div
                  onClick={() => handleCellClick(square, squareRepresentation)}
                  key={j}
                  className={`w-16 h-16 flex justify-center items-center ${
                    (i + j) % 2 ? "bg-[#729551]" : "bg-[#ececd0]"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? square.type : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
