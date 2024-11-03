import {
  getQuizResults,
  quizQuestions,
  resetQuizResults,
  updateQuizResults,
} from "@/app/data/questions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Check for the 'action' query parameter
  const action = searchParams.get("action");

  // Fetch quiz questions
  if (action === "get_questions") {
    const questionsWithoutAnswer = quizQuestions.map(
      ({ answer, ...rest }) => rest
    );
    return NextResponse.json(questionsWithoutAnswer);
  }

  // Fetch quiz results
  if (action === "get_results") {
    const results = getQuizResults();
    return NextResponse.json(results);
  }

  if (action === "reset_results") {
    resetQuizResults();
    return NextResponse.json({ message: "Results reset successfully" });
  }

  // Handle unknown endpoints or actions
  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const { questionId, selectedAnswer, timeTaken } = await req.json();

  // Check if the question exists
  const question = quizQuestions.find((q) => q.id === questionId);

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  // Evaluate the answer
  let isCorrect = false;
  if (question.type === "single_select") {
    isCorrect = question.answer === selectedAnswer;
  } else if (question.type === "multi_select") {
    const selectedAnswers = selectedAnswer as string[];
    const correctAnswers = question.answer as string[];
    isCorrect =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer)) &&
      correctAnswers.every((answer) => selectedAnswers.includes(answer));
  }

  if (isCorrect) {
    updateQuizResults(1, 0, 1, timeTaken);
  } else {
    updateQuizResults(0, 1, 0, timeTaken);
  }

  return NextResponse.json({
    message: "successfully saved!!",
  });
}
