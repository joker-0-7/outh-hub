"use client";
import React, { useContext, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { UserContext } from "../context/User";
import PaginationComp from "../components/PaginationComp";

function Page() {
  const [data, setData] = useState([]);
  const [state] = useContext(UserContext);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(1);
  const fetchData = async () => {
    try {
      const page = 1;
      const limit = 10;
      const questionLimit = 10;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/quiz/previous-questions?page=${page}&limit=${limit}&questionPage=${current}&questionLimit=${questionLimit}`,
        {
          headers: {
            Authorization: `${state?.token}`,
          },
        }
      );
      const data = await response.json();
      if (data && data.quizzes) {
        const filteredQuestions = data?.quizzes[0]?.question.filter(
          (question) => question.questionId !== null
        );
        setData(filteredQuestions.length > 0 ? filteredQuestions : []);
      }
      setCount(data.quizzes[0].totalQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  const onChange = (page) => {
    setCurrent(+page);
  };
  return (
    <div className="min-h-screen flex justify-center flex-col items-center my-4">
      <div className="container mx-auto min-h-screen">
        {data.length > 0 ? (
          <TableComponent page="client" data={data} link="/generate-quiz" />
        ) : (
          ""
        )}
      </div>
      <div className="my-4">
        <PaginationComp current={current} count={count} onChange={onChange} />
      </div>
    </div>
  );
}

export default Page;
