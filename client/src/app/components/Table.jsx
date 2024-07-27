import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@/app/generate-quiz/IconsSVG";
import { UpdateIcon } from "../../../public/assets/Icons";

function TableComponent({ data, page, handleUpdate, handleDelete }) {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              {page === "admin" ? (
                <>
                  <TableHead className="w-[100px]">Delete</TableHead>
                  <TableHead className="w-[100px]">Edit</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="w-[100px]">Answers</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((data, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="w-3/4">
                      {page === "admin"
                        ? data.question
                        : data?.questionId !== null && data.questionId.question}
                    </TableCell>
                    {page !== "admin" && (
                      <TableCell>
                        {data?.questionId?.answers.map((ans, i) => (
                          <p
                            key={i}
                            className={
                              ans == data.questionId.correct
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {ans}
                          </p>
                        ))}
                      </TableCell>
                    )}
                    {page === "admin" && (
                      <>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDelete(data._id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleUpdate(data._id)}
                          >
                            <UpdateIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TableComponent;
