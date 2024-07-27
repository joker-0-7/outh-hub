"use client";
import { createContext, useState, useEffect } from "react";

const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [exam, setExam] = useState(() => {
    if (typeof window !== "undefined") {
      const storedExam = sessionStorage.getItem("exam");
      return storedExam
        ? JSON.parse(storedExam)
        : {
            mode: "",
            subjects: [],
            sources: [],
            questions: [],
            count: 0,
            time: false,
            pastPapers: [],
            useAndInCorrect: false,
            useAndCorrect: false,
          };
    }
    return {
      mode: "",
      subjects: [],
      sources: [],
      questions: [],
      count: 0,
      time: false,
      pastPapers: [],
      useAndInCorrect: false,
      useAndCorrect: false,
    };
  });

  useEffect(() => {
    sessionStorage.setItem("exam", JSON.stringify(exam));
  }, [exam]);

  return (
    <ExamContext.Provider value={[exam, setExam]}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
