"use client";
import React, { useMemo, useState } from "react";
import QuizComponent from "../../_components/quiz/QuizComponent";
import { addQuizzes } from "@/app/functions/quizzes";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import ModalComponent from "@/app/components/quiz-components/ModalCopmonent";

function Page() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [quizzes, setQuizzes] = useState({
    sources: [""],
    question: "",
    answers: ["", ""],
    correct: "",
    image: "",
    explanation: "",
    subjects: [""],
    pastPapers: [""],
  });
  const [image, setImage] = useState("");
  const handleChangeAnswer = (e, answerIndex) => {
    const { value } = e.target;
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = { ...prevQuizzes };
      updatedQuizzes.answers[answerIndex] = value;
      return updatedQuizzes;
    });
  };
  const uploadFile = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    let formData = new FormData();
    formData.append("img", image);
    formData.append("sources", JSON.stringify(quizzes.sources));
    formData.append("question", quizzes.question);
    formData.append("answers", JSON.stringify(quizzes.answers));
    formData.append("correct", quizzes.correct);
    formData.append("explanation", quizzes.explanation);
    formData.append("subjects", JSON.stringify(quizzes.subjects));
    formData.append("pastPapers", JSON.stringify(quizzes.pastPapers));
    await addQuizzes(formData).then((res) => {
      router.push("/admin/quizzes");
      // setQuizzes({
      //   sources: [""],
      //   question: "",
      //   correct: "",
      //   image: "",
      //   explanation: "",
      //   answers: ["", ""],
      //   subjects: [""],
      //   pastPapers: [""],
      // });
    });
  };
  return (
    <div className="container py-10">
      <Button onClick={handleSubmit}>Submit</Button>
      <div>
        <div className="question min-h-52 flex justify-between gap-5 mb-5">
          <div className="input w-1/2">
            <Input
              size="large"
              placeholder="Question"
              className="mb-5 bg-gray-100"
              value={quizzes.question}
              onChange={(e) => {
                setQuizzes((prevQuizzes) => {
                  const updatedQuizzes = { ...prevQuizzes };
                  updatedQuizzes.question = e.target.value;
                  return updatedQuizzes;
                });
              }}
            />
          </div>
          <div className="image bg-sky-200 border-sky-500 border-2 border-dashed w-1/2 min-h-52 rounded-sm flex justify-center items-center">
            <label htmlFor="upload">Upload image</label>
            <Input
              type="file"
              onChange={uploadFile}
              accept="image/*"
              hidden
              id="upload"
            />
          </div>
        </div>
        <div className="options flex justify-between gap-5 mb-5">
          <div className="chose w-1/2">
            <div className="inputs grid grid-cols-1 gap-3">
              <Input
                type="text"
                placeholder="Correct Answer"
                className="bg-gray-100"
                value={quizzes.correct}
                onChange={(e) => {
                  handleChangeAnswer(e, 0);
                  setQuizzes((prevQuizzes) => {
                    const updatedQuizzes = { ...prevQuizzes };
                    updatedQuizzes.correct = e.target.value;
                    return updatedQuizzes;
                  });
                }}
              />
              {quizzes &&
                quizzes.answers &&
                quizzes.answers.map((_ans, i) => {
                  return (
                    <Input
                      key={i}
                      type="text"
                      placeholder="answer"
                      className="bg-gray-100"
                      value={quizzes.answers[i + 1]}
                      onChange={(e) => handleChangeAnswer(e, i + 1)}
                    />
                  );
                })}
            </div>
          </div>
          <div className="adv w-1/2 grid grid-cols-1 gap-3">
            <div className="add-source">
              <Button
                className="w-full"
                size="large"
                onClick={() => {
                  setData("source");
                  setModalOpen(!modalOpen);
                }}
              >
                Source
              </Button>
            </div>
            <div className="add-subject">
              <Button
                className="w-full"
                size="large"
                onClick={() => {
                  setData("subject");
                  setModalOpen(!modalOpen);
                }}
              >
                Subject
              </Button>
            </div>
            <div className="add-past-paper">
              <Button
                className="w-full"
                size="large"
                onClick={() => {
                  setData("past-papers");
                  setModalOpen(!modalOpen);
                }}
              >
                past paper
              </Button>
            </div>
          </div>
        </div>
        <div className="explanation">
          <ReactQuill
            theme="snow"
            value={quizzes?.explanation}
            onChange={(e) => setQuizzes({ ...quizzes, explanation: e })}
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
      </div>
      <div className="max-h-screen absolute">
        <ModalComponent
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          data={data}
          setQuizzes={setQuizzes}
          quizzes={quizzes}
        />
      </div>
    </div>
  );
}

export default Page;
