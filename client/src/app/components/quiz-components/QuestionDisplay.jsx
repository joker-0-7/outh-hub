"use client";
import { Image } from "antd";
import ButtonComponent from "@/app/utils/Button";
import { ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FlagCircleOutlined } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { EyeClose, EyeOpen } from "../../../../public/assets";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { ExamContext } from "@/app/generate-quiz/_context";
import { addQuizToUser } from "@/app/functions/quizzes";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

const QuestionDisplay = ({
  exam,
  index,
  setIndex,
  handleAns,
  excludesAns,
  handleExcludes,
  handleChange,
  answersQuiz,
  flags,
  ansFun,
  showAns,
  addFlag,
  formatTime,
  time,
  exams,
  setAnswersQuiz,
  checkedAns,
}) => {
  const router = useRouter();
  const [examContext] = useContext(ExamContext);
  const [checked, setChecked] = useState("");
  const { confirm } = Modal;
  const showConfirm = () => {
    const okFun = async () => {
      const updatedAnswersQuiz = { ...answersQuiz };
      exams.forEach((exam) => {
        if (!updatedAnswersQuiz.hasOwnProperty(exam._id)) {
          updatedAnswersQuiz[exam._id] = false;
        }
      });

      setAnswersQuiz(updatedAnswersQuiz);

      await addQuizToUser(updatedAnswersQuiz)
        .then((res) => setIndex(exams.length + 1))
        .catch((err) => console.log(err));
    };

    confirm({
      title: "Do you want to Exit This Exam",
      icon: <ExclamationCircleFilled />,
      content:
        "if you exit this exam will add to your score faild in not answerd questions",
      onOk() {
        okFun();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  useEffect(() => {
    console.log(answersQuiz);
  }, [answersQuiz]);
  const isChecked = (questionId, answer) => {
    const checkedAnsBefore = handleAns.find((e) => e.quizId === questionId);
    return checkedAnsBefore ? checkedAnsBefore.userAnswer === answer : null;
  };
  const shouldShowExplanation =
    examContext.mode !== "exam" &&
    (showAns || handleAns.some((e) => e.quizId === exam._id));

  return (
    <div className="rounded-lg border bg-gray-50 lg:p-6 max-sm:p-2 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-between md:flex-row max-sm:flex-col-reverse pb-2 items-center ">
        <div className="flex items-center max-sm:w-full lg:w-auto justify-between lg:flex-row max-sm:flex-col">
          <h3 className="text-lg font-semibold lg:mr-8 lg:mb-0 max-sm:mb-2 max-sm:mr-0 ">
            Question {index + 1}
          </h3>
          <span
            className={`cursor-pointer h-9 w-fit flex items-center justify-center transition-all ${
              flags.includes(index) && "bg-amber-300 rounded-full"
            }`}
            onClick={() => addFlag(index)}
          >
            <Button variant="outline">
              <FlagCircleOutlined className="h-5 w-5 mr-2" />
              Flag This Question
            </Button>
            <span className="sr-only">Flag question</span>
          </span>
        </div>
        <div className="flex flex-row-reverse max-sm:justify-between max-sm:items-center max-sm:w-full lg:w-auto">
          <Button
            variant="destructive"
            className="font-semibold text-lg lg:hidden max-sm:block"
            onClick={() => showConfirm()}
          >
            <CloseCircleOutlined />
          </Button>

          <Button
            variant="destructive"
            className="font-semibold text-lg lg:block max-sm:hidden"
            onClick={() => showConfirm()}
          >
            End Exam
          </Button>
          <div className="flex items-center space-x-4 mr-10">
            {(examContext?.mode === "exam" || examContext?.time) && (
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <ClockCircleOutlined className="h-4 w-4" />
                <span>{formatTime(time)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between h-5/6">
        <div>
          <p className="mb-6 text-gray-500 dark:text-gray-400 pt-2">
            {exam.question}
          </p>
          {exam.image && (
            <div className="image">
              <Image
                alt="image"
                src={`${process.env.NEXT_PUBLIC_API}/public/images/${exam.image}`}
              />
            </div>
          )}
          <div className="space-y-2">
            {exam.answers.sort().map((ans, i) => (
              <div
                key={i}
                className={`flex items-center space-x-2 mb-3 border-1 border-gray-700 px-1 py-2 rounded-sm relative ${
                  excludesAns.includes(ans) && "bg-red-100"
                } ${
                  examContext.mode !== "exam" &&
                  (showAns || checkedAns(exam._id)) &&
                  exam.correct === ans
                    ? "bg-green-200"
                    : ""
                } ${
                  (isChecked(exam._id, ans) || checked === ans) &&
                  "border-sky-400 shadow-md border-2"
                }`}
              >
                <div className="icon absolute right-1">
                  {excludesAns.includes(ans) ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => handleExcludes(ans)}
                    >
                      <EyeClose />
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer"
                      onClick={() => handleExcludes(ans)}
                    >
                      <EyeOpen />
                    </span>
                  )}
                </div>
                <label
                  htmlFor={`${ans}_${i}`}
                  className="flex items-center cursor-pointer w-full text-left"
                >
                  <input
                    id={`${ans}_${i}`}
                    name={`answer_${index}`}
                    style={{ width: "50px" }}
                    onClick={(e) => {
                      setChecked(ans);
                      handleChange(e);
                    }}
                    hidden={true}
                    value={ans}
                    disabled={
                      examContext.mode !== "exam" &&
                      (showAns ||
                        handleAns.filter((e) => e.quizId === exam._id).length >
                          0)
                    }
                    type="radio"
                  />
                  <span className={`ml-2 text-left`}>
                    {ans != "" ? ans : false}
                  </span>
                </label>
              </div>
            ))}

            {shouldShowExplanation && (
              <div className="explanation">
                <hr />
                <h1 className="font-bold text-xl">Explanation</h1>
                {parse(exam?.explanation)}
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-4 lg:items-center justify-between gap-5 max-sm:items-start">
          <div>
            <Button
              disabled={index <= 0}
              className="bg-gray-900 me-6"
              onClick={() => (index > 0 ? setIndex(index - 1) : false)}
            >
              Previous
            </Button>
          </div>
          <div className="flex lg:flex-row max-sm:flex-col-reverse items-center justify-center">
            {index < exams.length - 1 && (
              <span
                className="font-bold cursor-pointer hover:text-gray-500 transition-colors lg:mr-5 lg:mt-0 max-sm:mt-3 max-sm:mr-0"
                onClick={() => setIndex(index + 1)}
              >
                Skip
              </span>
            )}
            <ButtonComponent
              onClick={(e) => ansFun(e, exam._id, index)}
              title={
                index < exams.length - 1
                  ? showAns
                    ? "Next Question"
                    : "Next"
                  : showAns
                  ? "Submit"
                  : "Next"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
