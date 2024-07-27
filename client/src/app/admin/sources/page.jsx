"use client";
import { getSources, deleteSourceById } from "@/app/functions/users";
import React from "react";
import { useEffect, useState } from "react";
import TableComponent from "../_components/Table";
import EmptyPage from "../_components/EmptyPage";
import Heading from "../_components/Heading";
function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getSources()
      .then((sources) => {
        setData(sources);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);
  const handleDelete = async (id) => {
    const data = await deleteSourceById(id);
    const sources = await getSources();
    setData(sources);
    console.log(data);
  };
  return (
    <div className="sources  h-screen">
      <div className="container flex justify-evenly flex-col h-screen">
        <Heading title="Sources" btnValue="Add Source" link="sources" />
        {data && data.length >= 1 ? (
          <TableComponent data={data} handleDelete={handleDelete} />
        ) : (
          <EmptyPage link="/admin/sources/add" />
        )}
      </div>
    </div>
  );
}

export default Page;
