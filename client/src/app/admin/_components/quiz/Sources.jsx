import { getSources } from "@/app/functions/users";
import React, { useEffect, useState } from "react";

const Sources = ({ setQuizzes, quiz }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourcesData = await getSources();
        setData(sourcesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleCheckboxChange = (option) => {
    const isSelected = quiz.sources.includes(option);
    if (isSelected) {
      setQuizzes({
        ...quiz,
        sources: quiz.sources.filter((item) => item !== option),
      });
    } else {
      setQuizzes({ ...quiz, sources: [...quiz.sources, option] });
    }
    console.log(quiz.sources);
  };
  return (
    <div className="dropdown-checkbox grid grid-cols-1 sm:grid-cols-2">
      <div className="dropdown-content">
        {data.map((option, index) => (
          <div key={index} className="">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={quiz["sources"].includes(option.name)}
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

export default Sources;
