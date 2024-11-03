import React, { useEffect, useState } from "react";
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

const ShowResult = ({ totalQuestions, handleStart }: Props) => {
  const [resultStat, setResultStat] = useState<any>({});

  const percentage = Math.round((resultStat?.totalScore / totalQuestions) * 100);
  const incorrect = resultStat?.incorrect || 0;
  const correct = resultStat?.correct || 0;

  const fetchResult = async () => {
    try {
      const response = await fetch("/api/questions?action=get_results");
      const data = await response.json();
      setResultStat(data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const resetQuiz = async() => {
    try {
      const response = await fetch("/api/questions?action=reset_results");
      const data = await response.json();
      setResultStat(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      handleStart();
    }
  }

  useEffect(() => {
    fetchResult();
  }, []);

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
              You scored {correct} out of {totalQuestions} questions correctly
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
                  {correct}
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
            onClick={resetQuiz}
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
