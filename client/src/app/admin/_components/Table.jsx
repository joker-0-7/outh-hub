"use client";
import Link from "next/link";
import React from "react";
function TableComponent({ data, handleDelete }) {
  return (
    <div className="subjects">
      <div className="overflow-x-auto container mx-auto flex align-middle items-center min-h-96 text-center justify-center">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-lg">
          <thead className="ltr:text-left rtl:text-right py-2">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Id
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 py-2">
            {data &&
              data.map((subject, i) => {
                return (
                  <tr key={subject._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {subject?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {subject?.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-between w-44 mx-auto">
                      <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                        <Link href={`/admin/subjects/update/${subject._id}`}>
                          Edit
                        </Link>
                      </button>
                      <button
                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                        onClick={() => {
                          handleDelete(subject._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
