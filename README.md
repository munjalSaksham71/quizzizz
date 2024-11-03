# Quizzizz
A simple Quiz App built with Next.js that lets users answer multiple-choice questions, track scores, and view results. This app is structured to store quiz questions, evaluate user answers, and maintain a tally of correct and incorrect answers along with the time taken per question.

## Features
- **Multiple-Choice Questions** - Supports single-select and multi-select question types.
- **Answer Evaluation**: Verifies answers on each submission and updates score.
- **Retry Option**: Allows users to reset their scores and reattempt the quiz.

## Getting Started

First clone the repo
```bash
git clone https://github.com/munjalSaksham71/quizzizz.git
cd quizzizz
```

Then download the node_modules by running 
```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization
- **Adding Questions**: Add more questions in app/data/questions.ts to expand the quiz.
- **Change Scoring Logic**: Modify the scoring and time-tracking logic in app/api/questions/route.ts to adapt the quiz for different formats or points per question.

## License
This project is licensed under the MIT License.


