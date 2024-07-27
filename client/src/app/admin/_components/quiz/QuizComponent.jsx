"use client";
// import ButtonComponent from "@/app/utils/Button";
import { Input } from "@/components/ui/input";
import Sources from "./Sources";
import "react-quill/dist/quill.snow.css";
import Subjects from "./Subjects";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import PastPapers from "./PastPapers";

function QuizComponent({ setQuizzes, handleChangeAnswer, quiz, uploadFile }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  // const addAnswers = () => {
  //   setQuizzes({ ...quiz, answers: [...quiz.answers, ""] });
  // };

  return (
    <div className="box mx-auto container">
      <div className="heading grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="sources">
          <Sources setQuizzes={setQuizzes} quiz={quiz} />
        </div>
        <div className="subjects">
          <Subjects setQuizzes={setQuizzes} quiz={quiz} />
        </div>
        <div className="past-papers">
          <PastPapers setQuizzes={setQuizzes} quiz={quiz} />
        </div>
      </div>
      <div className="content">
        <div className="input">
          <Input
            size="large"
            placeholder="Question"
            className="mb-5"
            value={quiz.question}
            onChange={(e) => {
              setQuizzes((prevQuizzes) => {
                const updatedQuizzes = { ...prevQuizzes };
                updatedQuizzes.question = e.target.value;
                return updatedQuizzes;
              });
            }}
          />
        </div>
        <div className="chose">
          <div className="inputs grid grid-cols-1 gap-3">
            <Input
              type="text"
              placeholder="Correct Answer"
              value={quiz.correct}
              onChange={(e) => {
                handleChangeAnswer(e, 0);
                setQuizzes((prevQuizzes) => {
                  const updatedQuizzes = { ...prevQuizzes };
                  updatedQuizzes.correct = e.target.value;
                  return updatedQuizzes;
                });
              }}
            />
            {quiz &&
              quiz.answers &&
              quiz.answers.map((_ans, i) => {
                return (
                  <Input
                    key={i}
                    type="text"
                    placeholder="answer"
                    value={quiz.answers[i + 1]}
                    onChange={(e) => handleChangeAnswer(e, i + 1)}
                  />
                );
              })}
            <div className="explanation">
              <ReactQuill
                theme="snow"
                value={quiz?.explanation}
                onChange={(e) => setQuizzes({ ...quiz, explanation: e })}
                placeholder="Explanation"
                modules={{
                  toolbar: {
                    container: [
                      ["bold", "italic", "underline", "strike"],
                      ["blockquote", "code-block"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input type="file" onChange={uploadFile} accept="image/*" />
              {/* <ButtonComponent title="Add Answer" onClick={addAnswers} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;
