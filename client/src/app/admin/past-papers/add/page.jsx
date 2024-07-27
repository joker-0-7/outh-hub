"use client";
import Forms from "../../_components/Forms";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addPastPapers } from "@/app/functions/quizzes";

function Page() {
  const [pastPaper, setPastPaper] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addPastPapers(pastPaper);
    if (data && data.status === "success") router.push("/admin/past-papers");
  };
  const handleChange = (e) => {
    setPastPaper({ ...pastPaper, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-subject h-screen">
      <div className="container mx-auto flex justify-evenly flex-col h-1/2">
        <div className="header">
          <h1 className="text-2xl font-bold mb-5">Add Past Paper</h1>
          <p className="text-gray-600">
            You can add past papers here to make it easier for you to manage
            your past papers.
          </p>
        </div>
        <div className="form">
          <Forms
            placeholderInp1="Past Paper Name"
            placeholderInp2="Past Paper Description"
            btnValue="Add Past Paper"
            handleSubmit={handleSubmit}
            data={pastPaper}
            setSubject={setPastPaper}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
