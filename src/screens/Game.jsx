import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Game = () => {
  const params = useParams();
  console.log(params.code);
  const [socket, setSocket] = useState();
  const gameType = useSelector((state) => state.game.type);
  console.log(gameType, "gameType");

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
          console.log("create");
          break;

        case "join":
          console.log("join");
          break;

        case "move":
          console.log("move");
          break;
      }
    };
  }, [socket]);

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
    <div>
      {socket ? (
        <div className="bg-blue-500" onClick={playHandler}>
          Play
        </div>
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default Game;
