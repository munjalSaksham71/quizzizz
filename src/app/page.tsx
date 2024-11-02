"use client";
import QuizContent from "@/components/QuizContent";
import QuizHomePage from "@/components/QuizHomepage";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    showResults: false,
  })


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

  console.log(questions);

  const handleStart = () => {
    setStarted(true);
  };

  if(loading) {
    return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>
  }

  if(!started) {
    return (
      <QuizHomePage
      handleStart={handleStart} 
      />
    )
  }

  if(quizState.showResults) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-[#ED4E4E]">Results</h1>
      </div>
    )
  }


  return (
    <div className="flex h-screen w-screen items-center justify-center">
       <QuizContent questions={questions} quizState={quizState} setQuizState={setQuizState}  />
    </div>
  );
}
