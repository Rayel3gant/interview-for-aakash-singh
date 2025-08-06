import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

const CustomTableHeader = () => {
  return (
    <TableHeader className="bg-[#F4F5F7] text-[#4B5563]">
      <TableRow>
        <TableHead className="w-[60px] text-center">No.</TableHead>
        <TableHead className="min-w-[300px] max-w-fit text-center">
          Launched (UTC)
        </TableHead>
        <TableHead className="min-w-[250px] max-w-fit text-center">
          Location
        </TableHead>
        <TableHead className="min-w-[150px] text-center">Mission</TableHead>
        <TableHead className="min-w-[120px] text-center">Orbit</TableHead>
        <TableHead className="min-w-[160px] text-center">
          Launch Status
        </TableHead>
        <TableHead className="min-w-[120px] text-center">Rocket</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CustomTableHeader;
