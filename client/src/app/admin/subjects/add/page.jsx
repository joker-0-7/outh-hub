"use client";
import React from "react";
import Forms from "../../_components/Forms";
import { addSubject } from "@/app/functions/users";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [subject, setSubject] = useState({
    name: "",
    description: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addSubject(subject);
    if (data && data.status === "success") router.push("/admin/subjects");
  };
  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };
  return (
    <div className="add-subject h-screen">
      <div className="container mx-auto flex justify-evenly flex-col h-1/2">
        <div className="header">
          <h1 className="text-2xl font-bold mb-5">Add Subject</h1>
          <p className="text-gray-600">
            You can add subjects here to make it easier for you to manage your
            subjects.
          </p>
        </div>
        <div className="form">
          <Forms
            placeholderInp1="Subject Name"
            placeholderInp2="Subject Description"
            btnValue="Add Subject"
            handleSubmit={handleSubmit}
            data={subject}
            setSubject={setSubject}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
