"use client";
import QuizContent from "@/components/QuizContent";
import QuizHomePage from "@/components/QuizHomepage";
import ShowResult from "@/components/ShowResult";
import { useEffect, useState } from "react";

const quizInitialState = {
  currentQuestionIndex: 0,
  showResults: false,
  answers: {}
};
export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [quizState, setQuizState] = useState(quizInitialState);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const resetQuizResults = async () => {
    try {
      const response = await fetch("/api/questions?action=reset_results");
      return response;
    } catch (error) {
      console.error("error: ", error);
    }
  }

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questions?action=get_questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetQuizResults();
    fetchQuestions();
  }, []);

  const handleStart = () => {
    setStarted(true);
    setQuizState(quizInitialState);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-[#F3F0FF] to-[#E3D9FF]">
        Loading...
      </div>
    );
  }

  if (!started) {
    return <QuizHomePage handleStart={handleStart} />;
  }

  if (quizState.showResults) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ShowResult
          score={quizState.currentQuestionIndex}
          totalQuestions={questions.length}
          handleStart={handleStart}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <QuizContent
        questions={questions}
        quizState={quizState}
        setQuizState={setQuizState}
        questionStartTime={questionStartTime}
        setQuestionStartTime={setQuestionStartTime}
      />
    </div>
  );
}
