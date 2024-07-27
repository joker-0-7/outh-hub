"use client";
import React from "react";
import Forms from "../../_components/Forms";
import { addSource } from "@/app/functions/users";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [source, setSource] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addSource(source);
    if (data && data.status === "success") router.push("/admin/sources");
  };

  const handleChange = (e) => {
    setSource({ ...source, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-subject h-screen">
      <div className="container mx-auto flex justify-evenly flex-col h-1/2">
        <div className="header">
          <h1 className="text-2xl font-bold mb-5">Add Source</h1>
          <p className="text-gray-600">
            You can add source here to make it easier for you to manage your
            sources.
          </p>
        </div>
        <div className="form">
          <Forms
            placeholderInp1="Source Name"
            placeholderInp2="Source Description"
            btnValue="Add Source"
            handleSubmit={handleSubmit}
            data={source}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
