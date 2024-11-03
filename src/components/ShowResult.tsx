import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

interface Props {
  score: number;
  totalQuestions: number;
  handleStart: () => void;
}

const ShowResult = ({ score, totalQuestions, handleStart }: Props) => {

  const percentage = Math.round((score / totalQuestions) * 100);
  const incorrect = totalQuestions - score;

  return (
    <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-[#F3F0FF] to-[#E3D9FF]">
      <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/80 border-none shadow-lg">
        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0" />
          <CardTitle className="text-3xl md:text-3xl font-bold text-center relative z-10">
            Quiz Results
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10 p-4 md:p-6">
          {/* Message */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {percentage >= 80
                ? "Excellent Work! 🎉"
                : percentage >= 40
                ? "Good Effort! 👏"
                : "Keep Practicing! 💪"}
            </h3>
            <p className="text-gray-600">
              You scored {score} out of {totalQuestions} questions correctly
            </p>
          </div>

          {/* Results summary with your styling */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 rounded-xl border border-green-200 p-4 bg-green-50">
              <div className="flex-grow">
                <span className="text-green-600 font-medium">
                  Correct Answers
                </span>
                <span className="float-right font-semibold text-green-600">
                  {score}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 rounded-xl border border-red-200 p-4 bg-red-50">
              <div className="flex-grow">
                <span className="text-red-600 font-medium">
                  Incorrect Answers
                </span>
                <span className="float-right font-semibold text-red-600">
                  {incorrect}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center p-4 md:p-6">
          <Button
            onClick={handleStart}
            size="lg"
            className="py-6 text-white font-semibold rounded-full bg-[#ED4E4E] hover:bg-[#E13F3F] transition-all duration-200"
          >
            Start Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShowResult;
