// "use client";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   DeleteIcon,
//   FileQuestionIcon,
//   TrashIcon,
// } from "@/app/generate-quiz/IconsSVG";
// import { useState } from "react";
// import { addPastPapers } from "@/app/functions/quizzes";

// export default function Component() {
//   const [data, setData] = useState({
//     question: "",
//     answers: ["", "", "", "", ""],
//     correct: "",
//     image: "",
//   });
//   const [quizzes, setQuizzes] = useState({ quizName: "", data: [] });
//   const handleAddition = (e) => {
//     e.preventDefault();
//     setQuizzes({ ...quizzes, data: [...quizzes.data, data] });
//     setData({
//       question: "",
//       answers: ["", "", "", "", ""],
//       correct: "",
//       image: "",
//     });
//     console.log(quizzes);
//   };
//   const handleChangeAnswer = (e, answerIndex) => {
//     const { value } = e.target;
//     setData((prevQuizzes) => {
//       const updatedQuizzes = { ...prevQuizzes };
//       updatedQuizzes.answers[answerIndex] = value;
//       return updatedQuizzes;
//     });
//   };
//   const handleSubmit = async () => {
//     const data = await addPastPapers(quizzes).then((res) => console.log(res));
//   };
//   return (
//     <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Quiz Creator</h1>
//         <button
//           className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//           onClick={handleSubmit}
//         >
//           Submit Quiz
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {quizzes &&
//           quizzes?.data.length > 0 &&
//           quizzes.data.map((data, i) => {
//             return (
//               <div className="bg-white shadow-md rounded-lg p-6" key={i}>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-semibold">Question Name</h2>
//                   <div className="flex items-center gap-2">
//                     <button className="text-gray-500 hover:text-gray-700 transition-colors">
//                       <DeleteIcon className="h-5 w-5" />
//                     </button>
//                     <button className="text-red-500 hover:text-red-700 transition-colors">
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//                 {data.image && (
//                   <img
//                     alt="Quiz Image"
//                     className="rounded-lg mb-4"
//                     height={200}
//                     src={img}
//                     style={{
//                       aspectRatio: "400/200",
//                       objectFit: "cover",
//                     }}
//                     width={400}
//                   />
//                 )}
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <FileQuestionIcon className="h-5 w-5 text-gray-500" />
//                     <span className="text-gray-700">{data.question}</span>
//                   </div>
//                   {data.answers.map((ans, i) => {
//                     return (
//                       <div className="flex items-center gap-2" key={i}>
//                         <Checkbox id="option1" />
//                         <label className="text-gray-700" htmlFor="option1">
//                           {ans}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
//         <form className="space-y-4" onSubmit={handleAddition}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="quizName">Quiz Name</Label>
//               <Input
//                 id="quizName"
//                 placeholder="Enter quiz name"
//                 onChange={(e) =>
//                   setQuizzes({ ...quizzes, quizName: e.target.value })
//                 }
//                 value={data.quizName}
//               />
//             </div>
//             <div>
//               <Label htmlFor="quizImage">Quiz Image (optional)</Label>
//               <Input id="quizImage" type="file" />
//             </div>
//           </div>
//           <div>
//             <Label htmlFor="questions">Questions</Label>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Input
//                     placeholder="Question"
//                     value={data.question}
//                     onChange={(e) => {
//                       setData({ ...data, question: e.target.value });
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     placeholder="Answer 1"
//                     value={data.correct}
//                     onChange={(e) => {
//                       handleChangeAnswer(e, 0);
//                       setData({ ...data, correct: e.target.value });
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Input
//                     placeholder="Answer 2"
//                     value={data.answers[1]}
//                     onChange={(e) => handleChangeAnswer(e, 1)}
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     placeholder="Answer 3"
//                     value={data.answers[2]}
//                     onChange={(e) => handleChangeAnswer(e, 2)}
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Input
//                     placeholder="Answer 4"
//                     value={data.answers[3]}
//                     onChange={(e) => handleChangeAnswer(e, 3)}
//                   />
//                 </div>
//                 <div>
//                   <Input
//                     placeholder="Answer 5"
//                     value={data.answers[4]}
//                     onChange={(e) => handleChangeAnswer(e, 4)}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Button className="w-full" type="submit">
//             Add Question To Quiz
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import { useEffect, useState } from "react";
import TableComponent from "../_components/Table";
import EmptyPage from "../_components/EmptyPage";
import Heading from "../_components/Heading";
import { getPastPaper } from "@/app/functions/quizzes";
function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const pastPapers = await getPastPaper();
        setData(pastPapers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchSubject();
  }, []);
  const handleDelete = async (id) => {
    // const data = await deleteSubjectById(id);
    const pastPapers = await getPastPaper();
    setData(pastPapers);
  };
  const handleUpdate = async (id) => {
    console.log(id);
  };
  return (
    <div className="past-papers  h-screen">
      <div className="container flex justify-evenly flex-col h-screen">
        <Heading
          title="Past Papers"
          btnValue="Add Past Paper"
          link="past-papers"
        />
        {data && data.length >= 1 ? (
          <TableComponent
            data={data}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ) : (
          <EmptyPage link="/admin/past-papers/add" />
        )}
      </div>
    </div>
  );
}

export default Page;
