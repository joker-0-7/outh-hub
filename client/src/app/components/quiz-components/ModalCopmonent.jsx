import PastPapers from "@/app/admin/_components/quiz/PastPapers";
import Sources from "@/app/admin/_components/quiz/Sources";
import Subjects from "@/app/admin/_components/quiz/Subjects";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

// reactstrap components


function Example({ setModalOpen, modalOpen, data, quizzes, setQuizzes }) {
  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header flex justify-between items-center">
          <h5 className=" modal-title" id="exampleModalLabel">
            {data}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          {data === "source" ? (
            <Sources quiz={quizzes} setQuizzes={setQuizzes} />
          ) : data === "subject" ? (
            <Subjects quiz={quizzes} setQuizzes={setQuizzes} />
          ) : (
            <PastPapers quiz={quizzes} setQuizzes={setQuizzes} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Example;
