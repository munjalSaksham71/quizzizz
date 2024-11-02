"use client";
import QuizHomePage from "@/components/QuizHomepage";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

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


  return (
    <div className="flex h-screen w-screen items-center justify-center">
       Quiz Started
    </div>
  );
}
