import React, { useEffect, useRef, useState } from "react";

interface SnakeSegment {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;
  let point = 0;

  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    // canvas dimensions
    canvas.width = 800;
    canvas.height = 500;

    const gridSize = 10;
    let dx = 0;
    let dy = 0;

    let snake: SnakeSegment[] = [
      { x: 250, y: 150 },
      { x: 260, y: 150 },
      { x: 270, y: 150 },
    ];

    let food: SnakeSegment = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize)),
    };

    let frame = 0;
    let point = 0;

    const paintCanvas = () => {
      if (frame < 5) {
        frame++;
        return;
      }
      frame = 0;

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "red";
        context.fillRect(
          food.x * gridSize,
          food.y * gridSize,
          gridSize,
          gridSize
        );

        let ate: Boolean = false;

        if (
          food.x * gridSize < snake[0].x + 5 &&
          snake[0].x + 5 < food.x * gridSize + gridSize &&
          food.y * gridSize < snake[0].y + 5 &&
          snake[0].y + 5 < food.y * gridSize + gridSize
        ) {
          food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize)),
          };
          ate = true;
        }

        if (
          0 > snake[0].x ||
          snake[0].x > canvas.width ||
          0 > snake[0].y ||
          snake[0].y > canvas.height
        ) {
          console.log("game over");
        }

        if (ate) {
          snake = [
            snake[0],
            { x: snake[0].x, y: snake[0].y },
            ...snake.slice(1),
          ];

          point++;
          console.log(point);
        }

        snake[0].x = snake[0].x + dx;
        snake[0].y = snake[0].y + dy;

        if (snake.length > 1) {
          for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
          }
        }

        context.fillStyle = "green";
        snake.forEach((segment) => {
          context.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
      }
    };

    const renderAnimation = () => {
      paintCanvas();
      animationFrameId = requestAnimationFrame(renderAnimation);
    };

    renderAnimation();

    const handleKeyDown = (event: any) => {
      switch (event.code) {
        case "ArrowUp":
          if (dy == 0) {
            dx = 0;
            dy = -gridSize;
          }
          break;
        case "ArrowDown":
          if (dy == 0) {
            dx = 0;
            dy = gridSize;
          }
          break;
        case "ArrowLeft":
          if (dx == 0) {
            dx = -gridSize;
            dy = 0;
          }
          break;
        case "ArrowRight":
          if (dx == 0) {
            dx = gridSize;
            dy = 0;
          }
          break;
        case "Space":
          dx = 0;
          dy = 0;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove any event listeners or other resources
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(animationFrameId);
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen  flex flex-col gap-5 justify-center items-center bg-slate-500">
      <h1>Welcome to the Snake Game {point}</h1>
      <canvas ref={canvasRef} className="bg-slate-100 " />
    </div>
  );
};

export default SnakeGame;
