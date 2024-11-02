"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Question } from "@/lib/types/question";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

interface Props {
  question: Question;
  selectedAnswer: string;
  isLast: boolean;
  onNext: () => void;
  onAnswerSelect: (value: string | string[]) => void;
}

const QuizCard = ({
  question,
  selectedAnswer,
  isLast,
  onNext,
  onAnswerSelect,
}: Props) => {
  const handleMultiSelect = (option: string, checked: boolean) => {
    const currentAnswers = Array.isArray(selectedAnswer) ? selectedAnswer : [];
    const newAnswers: string[] = checked
      ? [...currentAnswers, option]
      : currentAnswers.filter((answer) => answer !== option);
    onAnswerSelect(newAnswers);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/80 border-none shadow-lg">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <CardTitle className="text-3xl md:text-3xl font-bold text-center relative z-10 ">
          {question?.question || ""}
        </CardTitle>
      </CardHeader>
      {question?.image && (
        <div className="relative w-full h-48 md:h-64 lg:h-72 mb-6 px-4">
          <Image
            src={question?.image}
            alt={question?.question}
            fill
            className="object-cover rounded-xl shadow-lg"
            priority
          />
        </div>
      )}
      <CardContent className="relative z-10 p-4 md:p-6">
        {question?.type === "single_select" ? (
          <RadioGroup
            value={selectedAnswer as string}
            onValueChange={onAnswerSelect}
            className="space-y-3"
          >
            {question?.options?.map((option, index) => (
              <div
                key={`${index}_${option}`}
                className={cn(
                  "flex items-center space-x-2 rounded-xl border border-violet-200 p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-50",
                  selectedAnswer === option &&
                    "border-violet-500 bg-violet-50 shadow-md"
                )}
              >
                <RadioGroupItem value={option} id={option} />
                <Label
                  htmlFor={option}
                  className="flex-grow cursor-pointer font-medium text-sm md:text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            {question?.options?.map((option, index) => (
              <div
                key={`${index}_${option}`}
                className={cn(
                  "flex items-center space-x-2 rounded-xl border border-violet-200 p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-violet-50",
                  Array.isArray(selectedAnswer) &&
                    selectedAnswer.includes(option) &&
                    "border-violet-500 bg-violet-50 shadow-md"
                )}
              >
                <Checkbox
                  id={option}
                  checked={
                    Array.isArray(selectedAnswer) &&
                    selectedAnswer.includes(option)
                  }
                  onCheckedChange={(checked) =>
                    handleMultiSelect(option, checked as boolean)
                  }
                />
                <Label
                  htmlFor={option}
                  className="flex-grow cursor-pointer font-medium text-sm md:text-base"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center p-4 md:p-6">
        <Button
          onClick={onNext}
          disabled={
            !selectedAnswer ||
            (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)
          }
          size="lg"
          className="py-6 text-white font-semibold rounded-full bg-[#ED4E4E] hover:bg-[#E13F3F] transition-all duration-200"
        >
          {isLast ? "Finish Quiz" : "Next Question"} <MoveRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
