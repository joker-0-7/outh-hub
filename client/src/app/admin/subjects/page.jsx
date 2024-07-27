"use client";
import { deleteSubjectById, getSubjects } from "@/app/functions/users";
import React from "react";
import { useEffect, useState } from "react";
import TableComponent from "../_components/Table";
import EmptyPage from "../_components/EmptyPage";
import Heading from "../_components/Heading";
function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const subjects = await getSubjects();
        setData(subjects);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchSubject();
  }, []);
  const handleDelete = async (id) => {
    const data = await deleteSubjectById(id);
    const subjects = await getSubjects();
    setData(subjects);
    console.log(data);
  };
  const handleUpdate = async (id) => {
    console.log(id);
  };
  return (
    <div className="subjects  h-screen">
      <div className="container flex justify-evenly flex-col h-screen">
        <Heading title="Subjects" btnValue="Add Subject" link="subjects" />
        {data && data.length >= 1 ? (
          <TableComponent
            data={data}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ) : (
          <EmptyPage link="/admin/subjects/add" />
        )}
      </div>
    </div>
  );
}

export default Page;
