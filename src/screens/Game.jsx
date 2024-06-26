import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { Chess } from "chess.js";

const Game = () => {
  const params = useParams();
  console.log(params.code);
  const [socket, setSocket] = useState();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  const gameType = useSelector((state) => state.game.type);
  const [whiteTimeSeconds, setWhiteTimeSeconds] = useState(60);
  const [blackTimeSeconds, setBlackTimeSeconds] = useState(60);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      setSocket(ws);
    };
    console.log(socket);

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case "create":
          setBoard(chess.board());
          console.log("Game initialized successfully");
          break;

        case "join":
          // setChess(new Chess());
          console.log("Game initialized successfully");
          break;

        case "move":
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log(chess, "testing move");
          if (chess._turn === "b" && gameType === "join") {
            clearInterval(whiteTime);
            var blackTime = setInterval(() => {
              setBlackTimeSeconds((prev) => prev - 1);
            }, 1000);
          } else if (chess._turn === "w" && gameType === "create") {
            clearInterval(blackTime);
            var whiteTime = setInterval(() => {
              setWhiteTimeSeconds((prev) => prev - 1);
            }, 1000);
          }

          break;
      }
    };
  }, [socket]);

  // useEffect(() => {
  //   console.log(chess, "chess");
  //   console.log("chess changed");
  //   if (chess._turn === "w") {
  //     const id = setInterval(() => {
  //       if (chess._turn === "b") {
  //         clearInterval(id);
  //       } else {
  //         setTimeSeconds((prev) => prev - 1);
  //         if (timeSeconds === 0) {
  //           setTimeMinutes((prev) => prev - 1);
  //           setTimeSeconds(60);
  //         }
  //       }
  //     }, 1000);
  //   }
  //   if (chess._turn === "b") {
  //     setInterval(() => {
  //       setOppTimeSeconds((prev) => prev - 1);
  //       if (timeSeconds === 0) {
  //         setOppTimeMinutes((prev) => prev - 1);
  //         setOppTimeSeconds(60);
  //       }
  //     }, 1000);
  //   }
  // }, [chess]);

  const playHandler = () => {
    if (gameType === "create") {
      socket.send(
        JSON.stringify({
          type: "create",
          code: params.code,
        })
      );
    } else if (gameType === "join") {
      socket.send(
        JSON.stringify({
          type: "join",
          code: params.code,
        })
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full h-screen">
          <div className="col-span-4 w-full flex justify-center">
            <Board
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
              setWhiteTimeSeconds={setWhiteTimeSeconds}
              setBlackTimeSeconds={setBlackTimeSeconds}
            />
          </div>
          <div className="col-span-2 bg-green-200 w-full">
            <button onClick={playHandler}>Play</button>
            <div>White : {whiteTimeSeconds}</div>
            <div>Black : {blackTimeSeconds}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
