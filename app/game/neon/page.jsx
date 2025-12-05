"use client";

import { useEffect, useRef, useState } from "react";

export default function CatchGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerX, setPlayerX] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const moveRef = useRef({ left: false, right: false });
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 500 });

  const playerWidth = 60;
  const playerHeight = 20;
  const blockSize = 20;

  // responsive canvas
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const width = Math.min(400, containerRef.current.offsetWidth);
        const height = width * 1.25; // maintain aspect ratio
        setCanvasSize({ width, height });
        setPlayerX(width / 2 - playerWidth / 2);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // keyboard input
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")
        setPlayerX((x) => Math.max(0, x - 20));
      if (e.key === "ArrowRight")
        setPlayerX((x) => Math.min(canvasSize.width - playerWidth, x + 20));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [canvasSize.width]);

  // mobile buttons movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerX((x) => {
        if (moveRef.current.left) return Math.max(0, x - 5);
        if (moveRef.current.right) return Math.min(canvasSize.width - playerWidth, x + 5);
        return x;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [canvasSize.width]);

  // game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlocks = prev
          .map((b) => ({ ...b, y: b.y + 5 }))
          .filter((b) => {
            if (
              b.y + blockSize >= canvasSize.height - playerHeight &&
              b.x + blockSize >= playerX &&
              b.x <= playerX + playerWidth
            ) {
              setScore((s) => s + 1);
              return false;
            }
            return b.y < canvasSize.height;
          });

        if (Math.random() < 0.05) {
          newBlocks.push({
            x: Math.random() * (canvasSize.width - blockSize),
            y: 0,
          });
        }

        return newBlocks;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playerX, canvasSize, gameOver]);

  // render canvas
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // draw player
      ctx.fillStyle = "#0ff";
      ctx.fillRect(playerX, canvasSize.height - playerHeight, playerWidth, playerHeight);

      // draw blocks
      blocks.forEach((b) => {
        ctx.fillStyle = "#f0f";
        ctx.fillRect(b.x, b.y, blockSize, blockSize);
      });

      // draw score
      ctx.fillStyle = "#fff";
      ctx.font = `${Math.floor(canvasSize.width / 20)}px Arial`;
      ctx.fillText("Score: " + score, 10, 30);

      if (!gameOver) requestAnimationFrame(render);
    };
    render();
  }, [blocks, playerX, score, gameOver, canvasSize]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-2 mt-20"
    >
      <h1 className="text-3xl mb-4 font-bold animate-pulse text-cyan-400 text-center">
        Neon Catch Game
      </h1>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border-4 border-cyan-500 max-w-full"
      />

      <p className="mt-4 text-xl text-center">Use arrow keys or buttons to move</p>

      {/* Mobile buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onPointerDown={() => (moveRef.current.left = true)}
          onPointerUp={() => (moveRef.current.left = false)}
          onPointerLeave={() => (moveRef.current.left = false)}
          className="px-6 py-3 bg-blue-600 rounded text-white font-bold"
        >
          LEFT
        </button>
        <button
          onPointerDown={() => (moveRef.current.right = true)}
          onPointerUp={() => (moveRef.current.right = false)}
          onPointerLeave={() => (moveRef.current.right = false)}
          className="px-6 py-3 bg-blue-600 rounded text-white font-bold"
        >
          RIGHT
        </button>
      </div>

      {gameOver && <p className="text-red-500 text-2xl mt-4">Game Over!</p>}
    </div>
  );
}
