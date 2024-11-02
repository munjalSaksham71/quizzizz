'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const response = await fetch("/api/questions");
    const data = await response.json();
    setQuestions(data);
  }

  useEffect(() => {
    fetchQuestions();
  }, [])

  console.log(questions);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}
