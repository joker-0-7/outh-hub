"use client";
import { ExamContext } from "@/app/generate-quiz/_context";
import React, { useContext } from "react";
function Subject({ data, setData }) {
  const [exam, setExam] = useContext(ExamContext);

  const onChange = (e) => {
    const selectedSource = e.target.value;
    if (!exam.subjects.includes(selectedSource)) {
      setExam({ ...exam, subjects: [...exam.subjects, selectedSource] });
    } else {
      setExam({
        ...exam,
        subjects: exam.subjects.filter((subject) => subject !== selectedSource),
      });
    }
  };
  return (
    <div className="subject">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-4">
        {data.length >= 1 &&
          data.map((s, i) => {
            return (
              <label
                key={i}
                htmlFor={s?.name + i}
                className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
              >
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id={s?.name + i}
                    value={s?.name}
                    onChange={onChange}
                    checked={exam.subjects.includes(s.name) ? true : false}
                  />
                </div>
                <div>
                  <strong className="text-pretty font-medium text-gray-900">
                    {s?.name}
                  </strong>
                  <p className="mt-1 text-pretty text-sm text-gray-700">
                    {s?.descriprion}
                  </p>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
}
export default Subject;
