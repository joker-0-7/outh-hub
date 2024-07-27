"use client";
import React, { useEffect, useState, useContext } from "react";
import { addQuizToUser } from "@/app/functions/quizzes";
import { ExamContext } from "../../_context";
import QuestionNavigation from "@/app/components/quiz-components/QuestionNavigation";
import QuestionDisplay from "@/app/components/quiz-components/QuestionDisplay";
import { useTimer } from "@/app/utils/useTimer";
import Score from "@/app/components/quiz-components/Score";
import { useRouter } from "next/navigation";

function Page() {
  const [exams, setExams] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [exam, setExam] = useContext(ExamContext);
  const [answersQuiz, setAnswersQuiz] = useState([]);
  const [exclude, setExclude] = useState(false);
  const [excludesAns, setExcludesAns] = useState([]);
  const [handleAns, setHandleAns] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState([]);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const time = useTimer(Number(exam?.questions?.length) * 60);

  useEffect(() => {
    setExams(exam.questions || []);
  }, [exam]);

  useEffect(() => {
    setShowAns(false);
  }, [index]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your progress will be lost.";
      if (!window.confirm(confirmationMessage)) {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    const handlePopState = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? Your progress will be lost.";
      if (!window.confirm(confirmationMessage)) {
        event.preventDefault();
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const nextBtn = () => {
    setIndex((num) => (num <= exams.length ? num + 1 : num));
  };
  const handleExcludes = (e) => {
    if (excludesAns.includes(e)) {
      setExcludesAns(excludesAns.filter((item) => item !== e));
    } else {
      setExcludesAns([...excludesAns, e]);
    }
  };
  const checkAnswer = (answerUser, correctAnswer) =>
    answerUser === correctAnswer;

  const handleChange = (e) =>
    setUserAnswers({ ...userAnswers, [exams[index]._id]: e.target.value });

  const addFlag = (i) => {
    setFlags((prevFlags) =>
      prevFlags.includes(i)
        ? prevFlags.filter((item) => item !== i)
        : [...prevFlags, i]
    );
  };

  const ansFun = async (e, quizId, i) => {
    const isCorrect = checkAnswer(userAnswers[quizId], exams[i].correct);
    if (isCorrect) {
      setAnswersQuiz({ ...answersQuiz, [quizId]: true });
      if (exam.mode === "tutor" && e.target.innerHTML === "Next")
        return setShowAns(true);
      else {
        nextBtn();
        setShowAns(false);
      }
    } else {
      setAnswersQuiz({ ...answersQuiz, [quizId]: false });
      if (exam.mode !== "exam") {
        setShowAns(true);
      } else {
        nextBtn();
      }
      if (e.target.innerHTML === "Next Question") {
        nextBtn();
        setShowAns(false);
      }
      if (e.target.innerHTML === "Submit") {
        await addQuizToUser(answersQuiz);
        nextBtn();
      }
    }
    setHandleAns([
      ...handleAns,
      { quizId: quizId, userAnswer: userAnswers[quizId] },
    ]);
    console.log(answersQuiz);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0 && minutes === 0) {
      handleSubmit();
      setIndex(exams.length);
    }
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = async () => {
    setExam({
      mode: "",
      subjects: [],
      sources: [],
      questions: [],
      adv: false,
      count: 0,
      time: false,
    });
    router.push("/");
  };
  const checkedAns = (questionId) => {
    const checkedAnsBefore = handleAns.filter((e) => e.quizId === questionId);
    if (checkedAnsBefore.length > 0) {
      return checkedAnsBefore[0].userAnswer;
    } else return null;
  };
  return (
    <div className="quiz min-h-screen ">
      <div className="min-h-screen">
        {index < exams.length ? (
          <div
            className="lg:grid lg:grid-cols-[100px_1fr] gap-8 lg:p-8 max-sm:p-2 sm:flex sm:flex-col"
            style={{ minHeight: "inherit" }}
          >
            <QuestionNavigation
              exams={exams}
              flags={flags}
              setIndex={setIndex}
              addFlag={addFlag}
              index={index}
            />
            <QuestionDisplay
              answersQuiz={answersQuiz}
              setAnswersQuiz= {setAnswersQuiz}
              exam={exams[index]}
              examContext={exam}
              examsCount={exams.length}
              setIndex={setIndex}
              handleExcludes={handleExcludes}
              index={index}
              excludesAns={excludesAns}
              setExclude={setExclude}
              exams={exams}
              checkedAns={checkedAns}
              flags={flags}
              userAnswers={userAnswers}
              handleAns={handleAns}
              handleChange={handleChange}
              ansFun={ansFun}
              showAns={showAns}
              addFlag={addFlag}
              formatTime={formatTime}
              time={time}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen p-8 flex-col">
            <Score
              correct={correct}
              answersQuiz={answersQuiz}
              exams={exams.length}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
