"use client";

import { FaBullseye } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

function PracticeArea() {
  const router = useRouter();

  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(60);
  const [isOpen, setIsOpen] = useState(false);
  const containerPadding = 10;

  const handleSpanClick = () => {
    if (counter === 0) {
      startTimer();
    }

    setCounter(counter + 1);

    const newTop = containerPadding + Math.random() * (100 - 2 * containerPadding);
    const newLeft = containerPadding + Math.random() * (100 - 2 * containerPadding);

    setPosition({ top: newTop, left: newLeft });
  };

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          setIsOpen(true)
          return 0;
        }
      });
    }, 1000);
  };

  const handleSaveScore = async () => {
    await fetch("/api/scores", {
      method: "POST",
      body: JSON.stringify({ counter }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    setIsOpen(false);
    resetGame();
    router.refresh();
  }

  const resetGame = () => {
    setTime(60);
    setCounter(0);
    setPosition({ top: 50, left: 50 });
  }

  return (
    <section className="flex-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Practice Area</h2>
        <p>Points: <b>{counter}</b></p>
        <p>
          Time: <b>{Math.floor(time / 60)}:{(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</b>
        </p>
      </div>
      <div className="w-full h-full border border-gray-700 rounded-md relative">
        <span
          className="text-4xl absolute cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110"
          style={{ top: `${position.top}%`, left: `${position.left}%` }}
          onClick={handleSpanClick}
        >
          <FaBullseye />
        </span>
      </div>
      <Modal
        counter={counter}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          resetGame();
        }}
        onSaveScore={handleSaveScore}
      />
    </section>
  )
}

export default PracticeArea