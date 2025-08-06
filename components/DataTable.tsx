import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Launch } from "@/lib/types";
import { formatLaunchDate } from "@/lib/utils";
import CustomTableHeader from "./table/CustomTableHeader";

export const DataTable = ({
  currentRows,
  openLaunchDetailsModal,
  indexOfFirstRow,
}: {
  currentRows: Launch[];
  openLaunchDetailsModal: (id: string) => void;
  indexOfFirstRow: number;
}) => {
  return (
    <div>
      <Table className="table-fixed w-full tableBorder rounded-md min-w-[1200px]">
        <CustomTableHeader />
        <TableBody className="text-[#1F2937] border-b-0">
          {currentRows.map((launch: Launch, index: number) => (
            <TableRow
              onClick={() => openLaunchDetailsModal(launch.id)}
              key={launch.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell className="text-center border-0">
                {indexOfFirstRow + index + 1}
              </TableCell>
              <TableCell className="text-center border-0">
                {formatLaunchDate(launch.static_fire_date_utc!)}
              </TableCell>
              <TableCell className="text-center border-0">
                {launch.location}
              </TableCell>
              <TableCell className="text-center border-0">
                {launch.name}
              </TableCell>
              <TableCell className="text-center border-0">
                {launch.orbit}
              </TableCell>
              <TableCell className="flex justify-center items-center border-0">
                {launch.upcoming && (
                  <span className="bg-[#FEF3C7] text-[#92400F] rounded-[20px] px-3 py-1 inline-block">
                    Upcoming
                  </span>
                )}
                {launch.success === true && !launch.upcoming && (
                  <span className="bg-[#DEF7EC] text-[#03543F] rounded-[20px] px-3 py-1 inline-block">
                    Success
                  </span>
                )}
                {launch.success === false && !launch.upcoming && (
                  <span className="bg-[#FDE2E1] text-[#981B1C] rounded-[20px] px-3 py-1 inline-block">
                    Failed
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center border-0">
                {launch.rocket}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
