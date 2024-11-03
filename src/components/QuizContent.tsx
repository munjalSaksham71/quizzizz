"use client";
import { Question } from "@/lib/types/question";
import React from "react";
import QuizCard from "./QuizCard";

interface Props {
  questions: Question[];
  quizState: any;
  setQuizState: any;
  questionStartTime: number;
  setQuestionStartTime: any;
}

const QuizContent = ({ questions, quizState, setQuizState, questionStartTime, setQuestionStartTime }: Props) => {
  const currentQuestion = questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (answer: string | string[]) => {
    setQuizState((prev: any) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestionIndex]: answer,
      },
    }));
  };

  const isLast = quizState.currentQuestionIndex === questions.length - 1;

  const handleNext = async () => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000); 

    // POST CALL TO SAVE ANSWER
    await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: currentQuestion?.id,
        selectedAnswer: quizState?.answers[quizState.currentQuestionIndex],
        timeTaken: timeTaken,
      }),
    });

    setQuizState((prev: any) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      showResults: prev.currentQuestionIndex === questions.length - 1,
    }));

    setQuestionStartTime(Date.now());
  };

  return (
    <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-[#F3F0FF] to-[#E3D9FF]">
      {/* Scrollable content */}
      <div className="flex flex-col items-center justify-between p-8 max-h-[700px] overflow-y-auto">
        <QuizCard
          question={currentQuestion}
          selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          isLast={isLast}
        />
      </div>
    </div>
  );
};

export default QuizContent;
