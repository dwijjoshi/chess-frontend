import React, { useState } from "react";

const Board = ({ board, socket, setBoard, chess }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handleCellClick = (square, squareRepresentation) => {
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
      setBoard(chess.board());
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
                  {square ? square.type : ""}
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
