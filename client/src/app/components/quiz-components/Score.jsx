import ButtonComponent from "@/app/utils/Button";
import { PieChart } from "@mui/x-charts";
import React from "react";

function Score({ exams, handleSubmit, answersQuiz }) {
  // ES5
  // const total = Object.keys(answersQuiz).filter((key) => answersQuiz[key]);
  // ES2017
  const total = Object.values(answersQuiz).filter((val) => val);
  const score = (total.length / exams) * 100;
  return (
    <>
      <div className="rounded-lg border bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 lg:w-1/2 max-sm:w-screen">
        <h1>Score</h1>

        <div className="score">
          <h2>
            {total.length} / {exams}
          </h2>
          <h2>{score} % </h2>
          <PieChart
            className="lg:w-96 max-sm:w-screen"
            series={[
              {
                data: [
                  {
                    id: 1,
                    value: total.length,
                    label: "Correct",
                  },
                  { id: 2, value: exams - total.length, label: "Faild" },
                ],
              },
            ]}
            height={200}
          />
        </div>
      </div>
      <ButtonComponent title="Ok" onClick={handleSubmit} />
    </>
  );
}

export default Score;
