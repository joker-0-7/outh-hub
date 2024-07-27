"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExamContext } from "./_context";
import CardContentComponent from "../components/CardContent";
import { BookOpenIcon, SchoolIcon } from "./IconsSVG";

function Page() {
  const [exam, setExam] = useContext(ExamContext);
  const router = useRouter();
  const handleModeChange = (e) => {
    setExam({ ...exam, mode: e });
    router.push("/generate-quiz/quiz");
  };

  useEffect(() => {
    console.log(exam);
  }, [exam]);
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <CardContentComponent
            onClick={() => {
              handleModeChange("exam");
            }}
            Icon={BookOpenIcon}
            desc="This mode is designed to simulate the actual timed exam experience."
            mode="Exam"
          />
          <CardContentComponent
            onClick={() => {
              handleModeChange("tutor");
            }}
            Icon={SchoolIcon}
            desc="This mode allows you to move question-by-question, seeing the correct answer and explanation after every question."
            mode="Tutor"
          />
          <CardContentComponent
            onClick={() => {
              handleModeChange("quiz");
            }}
            Icon={BookOpenIcon}
            desc="Our team members have compiled Recalls or past papers to simulate the real exam with super-
            efficient explanations for every scenario."
            mode="Past Papers"
          />
        </div>
      </div>
    </main>
  );
}

export default Page;
