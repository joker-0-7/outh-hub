"use client";
import { useEffect, useState } from "react";
import {
  changeStatusUser,
  deleteUserById,
  endDateUser,
  getUsers,
} from "@/app/functions/users";
import Moment from "react-moment";
import { DatePicker } from "antd";
import { Button } from "@/components/ui/button";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setRows(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const changeStatus = async (userId, status) => {
    try {
      await changeStatusUser(userId, status);
      const users = await getUsers();
      setRows(users);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  const deleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      const users = await getUsers();
      setRows(users);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  const update = async (id) => {
    const d = new Date(date);
    const endDate = d.getTime();
    const data = await endDateUser(id, endDate);
    console.log(data);
  };
  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-lg">
        <thead className="ltr:text-left rtl:text-right bg-gray-50">
          <tr>
            <th className="whitespace-nowrap px-2 py-2 text-gray-900">Name</th>
            <th className="whitespace-nowrap px-2 py-2 text-gray-900">email</th>
            <th className="whitespace-nowrap px-2 py-2 text-gray-900">
              Status
            </th>
            <th className="whitespace-nowrap px-2 py-2 text-gray-900">Since</th>
            <th className="whitespace-nowrap px-2 py-2 text-gray-900">
              Active to
            </th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((user, i) => {
            return (
              <tr key={user._id}>
                <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
                  {user?.email}
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                  {user.active ? (
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 w-32">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-sm">Active</p>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 w-32">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-sm">Pending</p>
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-gray-700">
                  {user.createdAt ? (
                    <Moment fromNow>{user.createdAt}</Moment>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td className="whitespace-nowrap px-2 py-2">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={(e) => setDate(e)}
                  />
                </td>
                <td className="whitespace-nowrap px-2 py-2">
                  <div className="flex justify-evenly">
                    <Button
                      onClick={() => {
                        changeStatus(user._id, user.active);
                      }}
                    >
                      Change Status
                    </Button>
                    <Button
                      variant="secondary"
                      className="mx-1"
                      value={date}
                      onClick={() => update(user._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
