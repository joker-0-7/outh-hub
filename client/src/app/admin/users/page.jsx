"use client";
import React from "react";
import DataTable from "../_components/UsersTable";

function Page() {
  return (
    <div className="admin-page">
      <div className="container mx-auto">
        <div className="text-3xl mt-20 text-right p-6">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default Page;
