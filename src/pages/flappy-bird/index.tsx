import Bird from "@/components/flappyBird/Bird";
import QuitModel from "@/components/molecule/QuitModel";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pause = useRef(true);
  const animationFrameId = useRef<number>();
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [quitModel, setQuitModel] = useState(false);

  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 480;

    let birdx = 200;
    let birdy = 200;

    let windowSize = 160;

    let fallSpeed = 1;
    let pillarSpeed = 2;

    let gravity = 0.8;

    let thrust = 0;

    let heights = [100, 120, 140, 160, 180, 200, 220, 240, 260, 300];

    let textx = 40;

    let segments = [
      {
        x: 680,
        h: 150,
        crossed: false,
      },
      {
        x: 980,
        h: 100,
        crossed: false,
      },
      {
        x: 1280,
        h: 280,
        crossed: false,
      },
      {
        x: 1580,
        h: 140,
        crossed: false,
      },
      {
        x: 1880,
        h: 250,
        crossed: false,
      },
    ];

    let pillarsColor = "#827397";

    const paintCanvas = () => {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (textx > -200) {
          context.font = "45px cursive";
          context.fillText("Flappy Bird", textx, 80);
        }

        //bird
        context.fillStyle = pillarsColor;
        context.fillRect(birdx, birdy, 30, 30);

        context.beginPath();
        context.arc(birdx + 20, birdy + 10, 3, 0, 2 * Math.PI);
        context.fillStyle = "#fff";
        context.fill();

        context.fillStyle = pillarsColor;
        context.fillRect(birdx + 30, birdy + 10, 5, 2);

        context.fillStyle = "#000";
        context.fillRect(birdx, birdy + 34, 10, 2);

        context.fillStyle = "#000";
        context.fillRect(birdx + 20, birdy + 34, 10, 2);

        context.fillStyle = pillarsColor;
        context.fillRect(birdx - 5, birdy + 10, 15, 12);

        //pillars
        segments.forEach((pillar) => {
          context.fillStyle = pillarsColor;
          context.fillRect(pillar.x, 0, 65, pillar.h);
          context.fillRect(
            pillar.x,
            pillar.h + windowSize,
            60,
            500 - pillar.h - windowSize
          );
        });

        if (pause.current) return;

        if (segments?.length && segments[0].x < -60) {
          segments = segments.slice(1);
          const rand = Math.floor(Math.random() * 10);

          segments.push({
            x: segments[segments.length - 1].x + 300,
            h: heights[rand],
            crossed: false,
          });
        }

        for (let pillar of segments) {
          if (
            pillar.x < birdx &&
            pillar.x + 60 > birdx &&
            (birdy < pillar.h || birdy > pillar.h + windowSize)
          ) {
            setGameOver(true);
            break;
          }

          if (
            pillar.x < birdx + 30 &&
            pillar.x + 60 > birdx + 30 &&
            (birdy < pillar.h || birdy > pillar.h + windowSize)
          ) {
            setGameOver(true);
            break;
          }

          if (
            pillar.x < birdx &&
            pillar.x + 60 > birdx &&
            (birdy + 30 < pillar.h || birdy + 30 > pillar.h + windowSize)
          ) {
            setGameOver(true);
            break;
          }

          if (
            pillar.x < birdx + 30 &&
            pillar.x + 60 > birdx + 30 &&
            (birdy + 30 < pillar.h || birdy + 30 > pillar.h + windowSize)
          ) {
            setGameOver(true);
            break;
          }

          if (pillar.x + 60 < birdx && !pillar.crossed) {
            pillar.crossed = true;
            setPoints((prev) => prev + 1);
          }
        }

        if (birdy < 0 || birdy > 500) {
          setGameOver(true);
        }

        birdy = birdy + fallSpeed;

        segments.forEach((pillar) => {
          pillar.x = pillar.x - pillarSpeed;
        });

        if (fallSpeed < 5) {
          fallSpeed += gravity;
        }

        if (thrust) {
          fallSpeed -= thrust;
          thrust = 0;
        }

        if (textx > -200) {
          textx -= pillarSpeed;
        }
      }
    };

    const renderAnimation = () => {
      paintCanvas();
      animationFrameId.current = requestAnimationFrame(renderAnimation);
    };

    const handler = (e: any) => {
      if (gameOver) return;

      if (e.key == "p") pause.current = true;
      else {
        pause.current = false;
        thrust = 15;
      }
    };

    window.addEventListener("keydown", handler);

    renderAnimation();

    return () => {
      window.removeEventListener("keydown", handler);

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
      setGameOverModal(true);
      pause.current = true;
    }
  }, [gameOver]);

  const handleRestart = () => {
    setPoints(0);
    setGameOver(false);
    setGameOverModal(false);
    pause.current = true;
  };

  return (
    <div className="w-screen h-screen flex justify-center gap-3 items-center bg-gradient-to-b from-col-4 via-col-4 to-col-1">
      <canvas
        ref={canvasRef}
        className="border-[8px] bg-slate-300 border-col-1"
      />
      <div className="w-60 h-[496px] flex flex-col gap-3">
        <div className="p-4 border-8 border-col-1 bg-slate-300">
          <div className="flex justify-center gap-8 ">
            <Bird />
            <div className="text-lg text-col-4 font-bold">
              Welcome to <br /> Flappy Bird
            </div>
          </div>
          <div className="w-full text-2xl text-white bg-col-1 rounded-md py-2 text-center font-bold mt-3">
            Score : {points}
          </div>
        </div>
        <div className="p-4 border-8 border-col-1 bg-slate-300 h-full">
          <div className="flex flex-col justify-end h-full gap-1">
            <div className="text-lg text-col-3 font-semibold text-center">
              Instructions
            </div>
            <div className="text-col-4 text-center">
              Press Any Key to Start and to fly, avoid getting hit by pillars
              and see how far can you go without hitting pillars and flying out
              of the board.
            </div>
            <div className="text-col-4 my-3 text-lg italic text-center">
              Press P to pause
            </div>

            <div
              onClick={() => {
                setQuitModel(true);
                pause.current = true;
              }}
              className=" bg-col-3  hover:bg-col-4  rounded-md text-center p-2 text-white  cursor-pointer "
            >
              Quit
            </div>
          </div>
        </div>

        <QuitModel show={quitModel} setModel={setQuitModel} />

        {gameOverModal && (
          <div
            className="w-screen h-screen absolute top-0 left-0 bg-slate-300 opacity-70 flex
       flex-col justify-center items-center "
          >
            <div className="text-5xl font-extrabold text-col-4 mb-4">
              Game Over
            </div>
            <div className="bg-col-1 w-full font-extrabold text-slate-100 text-2xl py-2 flex items-center justify-center">
              Final Score :<span className="mx-2 ">{points}</span>
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
      </div>
    </div>
  );
};

export default FlappyBird;
