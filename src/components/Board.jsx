import React from "react";

const Board = ({ board }) => {
  return (
    <div className="text-white-200">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              return (
                <div
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
