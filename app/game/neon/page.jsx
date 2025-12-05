"use client";

import { useEffect, useRef, useState } from "react";

export default function CatchGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerX, setPlayerX] = useState(200);
  const [blocks, setBlocks] = useState([]);

  const canvasWidth = 400;
  const canvasHeight = 500;
  const playerWidth = 60;
  const playerHeight = 20;
  const blockSize = 20;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setPlayerX((x) => Math.max(0, x - 20));
      if (e.key === "ArrowRight")
        setPlayerX((x) => Math.min(canvasWidth - playerWidth, x + 20));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlocks = prev
          .map((b) => ({ ...b, y: b.y + 5 }))
          .filter((b) => {
            // Catch block
            if (
              b.y + blockSize >= canvasHeight - playerHeight &&
              b.x + blockSize >= playerX &&
              b.x <= playerX + playerWidth
            ) {
              setScore((s) => s + 1);
              return false; // remove block
            }
            return b.y < canvasHeight; // remove if passed bottom
          });
        // spawn new block randomly
        if (Math.random() < 0.05) {
          newBlocks.push({ x: Math.random() * (canvasWidth - blockSize), y: 0 });
        }
        return newBlocks;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playerX, gameOver]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // draw player
      ctx.fillStyle = "#0ff";
      ctx.fillRect(playerX, canvasHeight - playerHeight, playerWidth, playerHeight);

      // draw blocks
      blocks.forEach((b) => {
        ctx.fillStyle = "#f0f";
        ctx.fillRect(b.x, b.y, blockSize, blockSize);
      });

      // draw score
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 30);

      if (!gameOver) requestAnimationFrame(render);
    };
    render();
  }, [blocks, playerX, score, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-4 font-bold animate-pulse text-cyan-400">
        Neon Catch Game
      </h1>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border-4 border-cyan-500" />
      <p className="mt-4 text-xl">Use arrow keys to move</p>
      {gameOver && <p className="text-red-500 text-2xl mt-4">Game Over!</p>}
    </div>
  );
}
