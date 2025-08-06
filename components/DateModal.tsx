"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Launch } from "@/lib/types";
import { Calendar } from "./ui/calendar";
import { addDays } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { daysMap, filterLabels, filterOptions } from "@/lib/constant";

const DateModal = ({
  setOpenModal,
  openModal,
  setFilteredData,
}: {
  setOpenModal(open: boolean): void;
  openModal: boolean;
  setFilteredData: (filtered: Launch[]) => void;
}) => {
  const [filterOption, setFilterOption] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [date2, setDate2] = useState<Date | undefined>(undefined);
  const queryClient = useQueryClient();
  const allLaunches = queryClient.getQueryData<Launch[]>(["launchData"]);

  const filterLaunchData = () => {
    let filtered: Launch[] = [];
    if (!allLaunches) return;
    if (date && date2) {
      filtered = allLaunches.filter((launch: Launch) => {
        const launchDate = new Date(launch.static_fire_date_utc!);
        return launchDate >= date && launchDate <= date2;
      });
    } else {
      const now = new Date();
      let startDate: Date = now;
      const daysToSubtract = daysMap[filterOption] ?? 365 * 5;
      startDate = addDays(now, -daysToSubtract);

      filtered = allLaunches.filter((launch: Launch) => {
        const launchDate = new Date(launch.static_fire_date_utc!);
        return launchDate >= startDate && launchDate <= now;
      });
    }
    setFilteredData(filtered);
    setOpenModal(false);
  };

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogContent className="bg-white px-6 py-8 w-11/12 mx-auto">
        <div className="mb-4">
          {date && date2 ? (
            <div className="text-sm text-gray-700 font-medium">
              Selected Range:{" "}
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                {date.toDateString()} ➝ {date2.toDateString()}
              </span>
            </div>
          ) : filterOption !== 0 ? (
            <div className="text-sm text-gray-700 font-medium">
              Selected Filter:{" "}
              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-md">
                {(() => {
                  const label = filterLabels[filterOption] ?? "";
                  return label;
                })()}
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">No filter selected</div>
          )}
        </div>

        <div className="flex flex-row gap-x-6 mt-4 items-start">
          <div className="flex flex-col gap-y-2 text-[10px] md:text-sm">
            {filterOptions.map(({ id, label }) => (
              <button
                key={id}
                className={`${filterOption === id ? "text-blue-400" : ""}`}
                onClick={() => setFilterOption(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
            <Calendar
              mode="single"
              selected={date2}
              onSelect={setDate2}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={filterLaunchData}
            className="text-blue-600 cursor-pointer rounded-md hover:text-blue-700"
          >
            Apply Filter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DateModal;
