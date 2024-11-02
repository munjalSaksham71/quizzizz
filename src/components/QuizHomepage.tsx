"use client";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  handleStart: () => void;
}

const QuizHomePage = ({ handleStart }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-[#F3F0FF] to-[#E3D9FF]">
      <div className="flex flex-col items-center justify-between h-[500px] w-[350px] p-8">
        <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-lg">
          <h1 className="text-4xl font-bold text-[#ED4E4E]">Quiz</h1>
        </div>
        <Button
          size="lg"
          onClick={handleStart}
          className="w-full py-6 text-white text-xl font-semibold rounded-full bg-[#ED4E4E] hover:bg-[#E13F3F] transition-all duration-200"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuizHomePage;
