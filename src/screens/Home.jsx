import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [showJoinGame, setShowJoinGame] = useState(false);
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const createGameHandler = () => {
    setShowCreateGame(true);
    setShowJoinGame(false);
    const code = generateRandomCode();
    setCode(code);
    console.log(code);
  };

  const joinGameHandler = () => {
    setShowJoinGame(true);
    setShowCreateGame(false);
  };

  const generateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * 6));
    }
    return result;
  };
  return (
    <div className="flex h-screen items-center">
      <div>
        <Toaster />
      </div>
      <div>
        <img src="board.jpg" className="h-screen p-10" alt="" />
      </div>
      <div className="flex justify-center items-center">
        <div className="text-white flex flex-col items-center">
          <h1 className="text-3xl font-semibold">
            Create or Join game to play with your friends
          </h1>
          <div className="flex  gap-y-6 gap-x-6 mt-10">
            <button
              onClick={createGameHandler}
              className="bg-green-500 px-8 py-3 rounded-xl text-xl font-bold"
            >
              Create Game
            </button>
            <button
              onClick={joinGameHandler}
              className="bg-green-500 px-8 py-3 rounded-xl text-xl font-bold"
            >
              Join Game
            </button>
          </div>
          {showCreateGame && (
            <div className="mt-12 flex gap-x-4">
              <div className="flex justify-between rounded-lg gap-x-8 bg-slate-300 text-black px-6 py-2">
                <span className="text-xl font-semibold tracking-wider">
                  {code}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    toast.success("Code copied to clipboard");
                  }}
                >
                  <FaRegCopy />
                </button>
              </div>
              <button
                onClick={() => navigate(`/game/${code}`)}
                className="bg-green-500 px-6 py-1 rounded-xl text-lg font-bold"
              >
                Create
              </button>
            </div>
          )}

          {showJoinGame && (
            <div className="mt-12 flex ">
              <div className="flex justify-between rounded-lg gap-x-4 text-black px-6 ">
                <input
                  type="text"
                  className=" bg-slate-300  rounded-lg px-3 py-2 placeholder-black outline-none"
                  placeholder="Enter the game code"
                />
              </div>
              <button className="bg-green-500 px-6 py-1 rounded-xl text-lg font-bold">
                Join
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
