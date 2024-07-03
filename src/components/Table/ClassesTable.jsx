import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export function ClassesTable({ tableBody }) {
  return (
    <div className="w-full h-[calc(100vh_-_64px)] overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell className="w-[24px]">T/r</Table.HeadCell>
          <Table.HeadCell>Class</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Student count</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Remove</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tableBody &&
            tableBody.map((table, index) => (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-2/6">
                    {table.class}
                  </Table.Cell>
                  <Table.Cell className=" w-2/6">{table.subject}</Table.Cell>
                  <Table.Cell className=" w-2/6">Sliver</Table.Cell>
                  <Table.Cell className="flex items-center gap-2">
                    <Link to={table.uid}>Open</Link>
                    <button className=" font-medium text-cyan-600 hover:underline dark:text-cyan-500 p-2">
                      Edit
                    </button>
                    <button className=" font-medium text-cyan-600 hover:underline dark:text-cyan-500 p-2">
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              </>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
