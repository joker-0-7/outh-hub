"use client";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { UserContext } from "./context/User";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";
import { getQuestionsCount, getQuizzesUser } from "./functions/quizzes";
const CardComponent = dynamic(() => import("./components/CardComponent"));
const icons = {
  BookIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.BookIcon)
  ),
  CheckIcon: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.CheckIcon)
  ),
  PieChart: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.PieChart)
  ),
  Percent: dynamic(() =>
    import("./generate-quiz/IconsSVG").then((mod) => mod.Percent)
  ),
};

export default function Home() {
  const [state] = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (state.user.email !== "free@trail.com") {
        try {
          const quizzes = await getQuizzesUser(state?.token).then((res) => res);
          const filteredAllQuestions = quizzes[0]?.question.filter(
            (question) => question.questionId !== null
          );

          setCount(filteredAllQuestions ? filteredAllQuestions.length : 0);
          const filteredSuccessQuestions = quizzes[0]?.question.filter(
            (question) =>
              question.value == "true" && question.questionId !== null
          );
          setSuccess(
            filteredSuccessQuestions ? filteredSuccessQuestions.length : 0
          );
          const res = await getQuestionsCount().then((res) =>
            setQuestionsCount(res)
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setQuestionsCount(
          JSON.parse(window.localStorage.getItem("data")).length
        );
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      id: "Correct",
      label: "Correct",
      value: success,
    },
    {
      id: "Incorrect",
      label: "Incorrect",
      value: count - success,
    },
  ];
  const questions = [
    {
      id: "Remaining",
      label: "Remaining",
      value: questionsCount - count,
      color: "hsla(209, 100%, 50%, 1)",
      background: "hsla(209, 100%, 50%, 1)",
    },
    {
      id: "Taken",
      label: "Taken",
      value: count,
      color: "hsl(282, 70%, 50%)",
    },
  ];
  return (
    <div className="min-h-screen flex items-end">
      <main
        className="flex flex-col gap-8 p-6 md:p-10 w-full"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <header className="flex flex-col gap-2">
          {state?.user && (
            <h1 className="text-3xl font-bold">
              Welcome,{" "}
              <span style={{ color: "#e5482e" }}>{state?.user?.firstName}</span>
            </h1>
          )}
          <p className="text-gray-500 dark:text-gray-400">
            Explore your academic progress and stay informed.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CardComponent
            title="QUESTIONS TAKEN"
            value={count}
            Icon={icons.BookIcon}
            description="total number of answered questions"
          />
          <CardComponent
            title="QUESTIONS CORRECT"
            value={success}
            Icon={icons.CheckIcon}
            description="total number of correctly answered questions"
          />
          <CardComponent
            title="PERCENT CORRECT"
            value={
              success != 0 ? Math.ceil((success / count) * 100) + "%" : 0 + "%"
            }
            Icon={icons.Percent}
            description="the percentage of correctly answered questions"
          />
        </section>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 md:w-3/4 mx-aut max-sm:w-full">
          <Card>
            <CardHeader>
              <CardBody className="text-center">
                Questions Taken / Questions Remaining
              </CardBody>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3]">
                <icons.PieChart data={questions} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardBody className="text-center">
                Questions Correct / Questions Incorrect
              </CardBody>
            </CardHeader>
            <CardContent>
              <div className="aspect-[4/3]">
                <icons.PieChart data={data} />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
