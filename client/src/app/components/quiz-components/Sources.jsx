import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

function Sources({ name, data, page }) {
  return (
    <div>
      <label
        className="flex justify-between font-medium text-gray-900 dark:text-gray-50"
        htmlFor="sources"
      >
        <span>{name}</span>
        {page && page !== "past papers" && (
          <span>
            <Checkbox
              name={name}
              label="Select All"
              onChange={(e) => {
                let arr = [];
                exam[name].length > 0
                  ? setExam({ ...exam, [name]: [] })
                  : data.map((s) => arr.push(s.name));
                setExam({ ...exam, [name]: [].concat(arr) });
              }}
              checked={exam[name].length === [name].length}
            >
              Select All
            </Checkbox>
          </span>
        )}
      </label>
      <div className="mt-2 grid gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {data[name].map((s, i) => {
            return (
              <div className="flex items-center space-x-2" key={i}>
                <Checkbox
                  id={s?.name}
                  name={name}
                  onChange={(e) => {
                    onChange(s.name, name);
                  }}
                  checked={exam[name].includes(s?.name) ? true : false}
                />
                <label
                  className="text-sm font-normal text-gray-900 dark:text-gray-50"
                  htmlFor={s?.name}
                >
                  {s?.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sources;
