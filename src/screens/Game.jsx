import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const params = useParams();
  console.log(params.code);
  const [socket, setSocket] = useState();
  const ws = new WebSocket("ws://localhost:8000");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    socket.send(
      JSON.stringify({
        type: "create",
        code: params.code,
      })
    );
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

  return <div>{socket ? <div>Game</div> : <div>Connecting...</div>}</div>;
};

export default Game;
