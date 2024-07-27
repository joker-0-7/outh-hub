import {
  BookIcon,
  FileIcon,
  FileQuestionIcon,
  UsersIcon,
} from "@/app/generate-quiz/IconsSVG";

export const navData = [
  {
    id: 1,
    name: "Users",
    link: "/admin/users",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    id: 2,
    name: "Questions",
    link: "/admin/quizzes",
    icon: <FileQuestionIcon className="h-4 w-4" />,
  },
  {
    id: 3,
    name: "Subject",
    link: "/admin/subjects",
    icon: <BookIcon className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "Sources",
    link: "/admin/sources",
    icon: <BookIcon className="h-4 w-4" />,
  },
  {
    id: 4,
    name: "Past Papers",
    link: "/admin/past-papers",
    icon: <FileIcon className="h-4 w-4" />,
  },
];
