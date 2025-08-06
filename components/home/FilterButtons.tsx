import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { launchFilterOptions } from "@/lib/constant";
interface FilterButtonsProps {
  setDateModal: (status: boolean) => void;
  launchFilter: string;
  setLaunchFilter: (filter: string) => void;
  launchStatusFilter: (status: string) => void;
}
export const FilterButtons = ({
  setDateModal,
  launchFilter,
  setLaunchFilter,
  launchStatusFilter,
}: FilterButtonsProps) => {
  return (
    <div className="w-full flex items-center justify-between my-12">
      <div
        className="cursor-pointer px-4 py-2 rounded-md border"
        onClick={() => setDateModal(true)}
      >
        Date filter
      </div>

      <div>
        <Select
          value={launchFilter}
          onValueChange={(value) => {
            setLaunchFilter(value);
            launchStatusFilter(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent defaultValue="all" className="bg-white">
            {Object.entries(launchFilterOptions).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
