"use client";
import { Question } from "@/lib/types/question";
import React from "react";
import QuizCard from "./QuizCard";

interface Props {
  questions: Question[];
  quizState: any;
  setQuizState: any;
}

const QuizContent = ({ questions, quizState, setQuizState }: Props) => {
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

  const handleNext = () => {
    // Handling Logic for Score
    let isCorrect = false;

    if (currentQuestion.type === "single_select") {
      isCorrect =
        currentQuestion.answer ===
        quizState.answers[quizState.currentQuestionIndex];
    } else if (currentQuestion.type === "multi_select") {
      const selectedAnswer = quizState.answers[
        quizState.currentQuestionIndex
      ] as string[];
      const correctAnswer = currentQuestion.answer as string[];

      isCorrect =
        selectedAnswer.length === correctAnswer.length &&
        selectedAnswer.every((answer) => correctAnswer.includes(answer)) &&
        correctAnswer.every((answer) => selectedAnswer.includes(answer));
    }

    setQuizState((prev: any) => ({
      ...prev,
      score: prev.score + (isCorrect ? 1 : 0),
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      showResults: prev.currentQuestionIndex === questions.length - 1,
    }));
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
