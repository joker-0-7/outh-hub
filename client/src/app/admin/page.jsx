"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import {
  BarChart,
  LineChart,
  PieChart,
  SearchIcon,
} from "../generate-quiz/IconsSVG";
import { useEffect, useState } from "react";
import { getUsers } from "../functions/users";
import { Image } from "antd";
import { getQuestionsCount } from "../functions/quizzes";

export default function Component() {
  const [allUsers, setAllUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [activeUser, setActiveUser] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      let arr = [];
      let active = [];
      let date = new Date();
      try {
        await getUsers().then((res) => {
          setAllUsers(res);
          arr = res.filter((user) => {
            const createdAt = new Date(user.createdAt);
            return createdAt.getMonth() == date.getMonth();
          });
          active = res.filter((user) => user.active);
        });
        setNewUsers(arr.length);
        setActiveUser(active.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const getCountQuestions = async () => {
      try {
        await getQuestionsCount().then((res) => setTotalQuestions(res));
      } catch (error) {
        console.log(error);
      }
    };
    getCountQuestions();
  }, []);
  return (
    <div className="flex flex-col w-screen sm:w-full">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search users, subjects, sources, quiz, past papers, etc..."
                type="search"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              size="icon"
              variant="ghost"
            >
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Total Users</CardTitle>
              <CardDescription>
                The total number of registered users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{allUsers?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>New Signups</CardTitle>
              <CardDescription>
                The number of new users that signed up this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{newUsers || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Active Users</CardTitle>
              <CardDescription>
                The number of users that have been active in the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{activeUser || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Pending Subjects</CardTitle>
              <CardDescription>
                The number of subjects that are awaiting approval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">45</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Total Sources</CardTitle>
              <CardDescription>
                The total number of available sources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">321</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Total Questions</CardTitle>
              <CardDescription>
                The total number of available questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalQuestions || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Past Papers</CardTitle>
              <CardDescription>
                The total number of available past papers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">156</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                A line chart showing user growth over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Subject Categories</CardTitle>
              <CardDescription>
                A pie chart showing the distribution of subject categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart className="aspect-square" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                A bar chart showing user activity over the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
