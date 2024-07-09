import QuitModel from "@/components/molecule/QuitModel";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLessRounded,
  ExpandMoreRounded,
  Logout,
  SpaceBar,
} from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface SnakeSegment {
  x: number;
  y: number;
}

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pause = useRef<boolean>(false);
  const animationFrameId = useRef<number>();
  const [point, setPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [quitModel, setQuitModel] = useState(false);

  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")!;

    // canvas dimensions
    canvas.width = 650;
    canvas.height = 420;

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

    const paintCanvas = () => {
      if (pause.current) return;

      if (frame < 5) {
        frame++;
        return;
      }
      frame = 0;

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#827397";
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
          setGameOver(true);
        }

        snake.forEach((segment, idx) => {
          if (
            idx > 3 &&
            segment.x < snake[0].x + 5 &&
            snake[0].x + 5 < segment.x + gridSize &&
            segment.y < snake[0].y + 5 &&
            snake[0].y + 5 < segment.y + gridSize
          ) {
            setGameOver(true);
          }
        });

        if (ate) {
          snake = [
            snake[0],
            { x: snake[0].x, y: snake[0].y },
            ...snake.slice(1),
          ];
          setPoint((prev) => prev + 1);
        }

        snake[0].x = snake[0].x + dx;
        snake[0].y = snake[0].y + dy;

        if (snake.length > 1) {
          for (let i = snake.length - 1; i > 0; i--) {
            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
          }
        }

        context.fillStyle = "#4D4C7D";
        snake.forEach((segment) => {
          context.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
      }
    };

    const renderAnimation = () => {
      paintCanvas();
      animationFrameId.current = requestAnimationFrame(renderAnimation);
    };

    renderAnimation();

    const handleKeyDown = (event: any) => {
      switch (event.code) {
        case "ArrowUp":
          if (pause.current) {
            pause.current = false;
          }
          if (dy == 0) {
            dx = 0;
            dy = -gridSize;
          }
          break;
        case "ArrowDown":
          if (pause.current) {
            pause.current = false;
          }
          if (dy == 0) {
            dx = 0;
            dy = gridSize;
          }
          break;
        case "ArrowLeft":
          if (pause.current) {
            pause.current = false;
          }
          if (dx == 0) {
            dx = -gridSize;
            dy = 0;
          }
          break;
        case "ArrowRight":
          if (pause.current) {
            pause.current = false;
          }
          if (dx == 0) {
            dx = gridSize;
            dy = 0;
          }
          break;
        case "Space":
          if (pause.current) {
            pause.current = false;
          } else {
            // dx = 0;
            // dy = 0;
            pause.current = true;
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove any event listeners or other resources
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animationFrameId.current)
        window.cancelAnimationFrame(animationFrameId.current);
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      pause.current = true;
    }
  }, [gameOver]);

  const handleRestart = () => {
    pause.current = false;
    setGameOver(false);
    setPoint(0);
  };

  return (
    <div className="w-screen h-screen  flex gap-5 justify-center items-center bg-col-4">
      <div>
        <div className="font-bold text-3xl text-white mb-4">
          Welcome to The Snake Game
        </div>
        <canvas
          ref={canvasRef}
          className="bg-slate-300 border-col-1 border-[8px]"
        />
      </div>
      <div className="w-[280px] h-[435px] mt-[52px] bg-slate-300 flex flex-col items-center justify-between">
        <div className="bg-col-1 w-full font-extrabold text-xl py-3 flex items-center justify-center">
          Points :<span className="mx-2 text-2xl">{point}</span>
        </div>
        <div className="px-3 text-center">
          Try to collect as many points as possible without colliding snake with
          the wall or his own body.
        </div>
        <div className="flex flex-col justify-center items-center px-5">
          <div className="text-center mb-4">
            Use Arrow Keys to start and change direction
          </div>
          <div className="mb-2">
            <ExpandLessRounded className="bg-slate-400" />
          </div>
          <div className="flex gap-2">
            <ChevronLeft className="bg-slate-400" />
            <ExpandMoreRounded className="bg-slate-400" />
            <ChevronRight className="bg-slate-400" />
          </div>
        </div>
        <div className="mx-4 text-center">
          <span>Press Space bar to pause / unpause game</span>
          <SpaceBar className="bg-slate-400 ml-3" />
        </div>
        <div
          className="py-2 bg-col-1 w-full text-center cursor-pointer hover:bg-slate-400"
          onClick={() => {
            setQuitModel(true);
            pause.current = true;
          }}
        >
          Quit to Home <Logout />
        </div>
      </div>
      {gameOver && (
        <div
          className="w-screen h-screen absolute top-0 left-0 bg-slate-300 opacity-70 flex
       flex-col justify-center items-center "
        >
          <div className="text-5xl font-extrabold text-col-4 mb-4">
            Game Over
          </div>
          <div className="bg-col-1 w-full font-extrabold text-slate-100 text-2xl py-2 flex items-center justify-center">
            Final Points :<span className="mx-2 ">{point}</span>
          </div>
          <div>
            <div className="mt-4 flex gap-6 text-col-4 text-xl">
              <div
                className="hover:scale-110 cursor-pointer"
                onClick={handleRestart}
              >
                Restart
              </div>
              <Link href="/" className="hover:scale-110">
                Quit
              </Link>
            </div>
          </div>
        </div>
      )}
      <QuitModel show={quitModel} setModel={setQuitModel} />
    </div>
  );
};

export default SnakeGame;
