import { getPastPaper } from "@/app/functions/quizzes";
import React, { useEffect, useState } from "react";

const PastPapers = ({ quiz, setQuizzes }) => {
  const [data, setData] = useState([]);
  const handleCheckboxChange = (option) => {
    const isSelected = quiz.pastPapers.includes(option);
    if (isSelected) {
      setQuizzes({
        ...quiz,
        pastPapers: quiz.pastPapers.filter((item) => item !== option),
      });
    } else {
      setQuizzes({ ...quiz, pastPapers: [...quiz.pastPapers, option] });
    }
    console.log(quiz);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pastPapers = await getPastPaper();
        setData(pastPapers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="dropdown-checkbox">
      <div className="dropdown-content grid grid-cols-1 sm:grid-cols-2">
        {data.map((option, index) => (
          <div key={index}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={quiz["pastPapers"].includes(option.name)}
                onChange={() => handleCheckboxChange(option.name)}
              />
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastPapers;
