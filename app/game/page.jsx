"use client";

import { useEffect, useState, useRef } from "react";

export default function MiniGame() {
  const gameWidth = 400;
  const gameHeight = 500;
  const blockSize = 30;
  const playerSize = 50;

  const [blocks, setBlocks] = useState([]);
  const [playerX, setPlayerX] = useState(gameWidth / 2 - playerSize / 2);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setPlayerX((x) => Math.max(0, x - 20));
      if (e.key === "ArrowRight")
        setPlayerX((x) => Math.min(gameWidth - playerSize, x + 20));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBlocks((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + 5 }))
          .filter((b) => b.y < gameHeight)
      );

      // Randomly spawn new block
      if (Math.random() < 0.03) {
        setBlocks((prev) => [
          ...prev,
          { x: Math.random() * (gameWidth - blockSize), y: 0 },
        ]);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    // Collision detection
    blocks.forEach((b) => {
      if (
        b.y + blockSize >= gameHeight - playerSize &&
        b.x + blockSize >= playerX &&
        b.x <= playerX + playerSize
      ) {
        setScore((s) => s + 1);
      }
      if (b.y + blockSize >= gameHeight) {
        setGameOver(true);
      }
    });
  }, [blocks, playerX]);

  const restart = () => {
    setBlocks([]);
    setScore(0);
    setPlayerX(gameWidth / 2 - playerSize / 2);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Maintenance Mini Game</h1>
      <p className="mb-4">Score: {score}</p>

      <div
        ref={gameRef}
        className="relative bg-gray-900 border-4 border-green-500"
        style={{ width: gameWidth, height: gameHeight }}
      >
        {/* Player */}
        <div
          className="absolute bottom-0 bg-blue-500"
          style={{
            width: playerSize,
            height: playerSize,
            left: playerX,
          }}
        />

        {/* Blocks */}
        {blocks.map((b, idx) => (
          <div
            key={idx}
            className="absolute bg-red-500 rounded"
            style={{
              width: blockSize,
              height: blockSize,
              top: b.y,
              left: b.x,
            }}
          />
        ))}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-red-500">
            <p className="text-2xl font-bold mb-4">Game Over!</p>
            <button
              className="bg-green-500 px-4 py-2 rounded font-semibold text-black"
              onClick={restart}
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-green-400">
        Use Arrow keys ← → to move the player and catch the blocks!
      </p>
    </div>
  );
}
