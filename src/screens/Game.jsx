import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Game = () => {
  const params = useParams();
  console.log(params.code);
  const [socket, setSocket] = useState();

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

  return (
    <div>
      {socket ? (
        <div
          className="bg-blue-500"
          onClick={() => {
            socket.send(
              JSON.stringify({
                type: "create",
                code: "dwij2",
              })
            );
          }}
        >
          Play
        </div>
      ) : (
        <div>Connecting...</div>
      )}
    </div>
  );
};

export default Game;
