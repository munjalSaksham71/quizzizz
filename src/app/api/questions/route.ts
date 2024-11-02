import { Question } from "@/lib/types/question";

const quizQuestions: Question[] = [
    {
      id: 1,
      type: "single_select",
      question: "Which HTML tag is used to define a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<nav>"],
      answer: "<a>",
      image: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?w=800&q=80"
    },
    {
      id: 2,
      type: "single_select",
      question: "Which JavaScript framework is known for its virtual DOM?",
      options: ["Angular", "Vue", "React", "Svelte"],
      answer: "React",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
    },
    {
      id: 3,
      type: "multi_select",
      question: "Which of the following are CSS layout techniques?",
      options: ["Grid", "Flexbox", "Box Model", "Bootstrap"],
      answer: ["Grid", "Flexbox", "Box Model"]
    },
    {
      id: 4,
      type: "multi_select",
      question: "Select all JavaScript data types.",
      options: ["String", "Number", "Boolean", "Array", "Object"],
      answer: ["String", "Number", "Boolean", "Object"]
    },
    {
      id: 5,
      type: "single_select",
      question: "Which HTTP method is typically used to retrieve data from a server?",
      options: ["POST", "DELETE", "PUT", "GET"],
      answer: "GET"
    }
  ];
  
export async function GET() {
  return new Response(JSON.stringify(quizQuestions));
}