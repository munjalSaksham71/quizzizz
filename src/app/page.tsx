"use client";
import QuizContent from "@/components/QuizContent";
import QuizHomePage from "@/components/QuizHomepage";
import ShowResult from "@/components/ShowResult";
import { useEffect, useState } from "react";

const quizInitialState = {
  currentQuestionIndex: 0,
  score: 0,
  answers: {},
  showResults: false,
};

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [quizState, setQuizState] = useState(quizInitialState);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleStart = () => {
    setStarted(true);
    setQuizState(quizInitialState);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
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
          score={quizState.score}
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
      />
    </div>
  );
}
