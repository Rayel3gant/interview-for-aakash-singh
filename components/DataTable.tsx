import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Launch } from '@/lib/types';
import { formatLaunchDate } from '@/lib/utils';

const DataTable = ({currentRows , openLaunchDetailsModal , indexOfFirstRow}:
  {
    currentRows:Launch[],
    openLaunchDetailsModal:(id:string)=>void,
    indexOfFirstRow: number
  }) => {
  return (
    <div>
      <Table className="table-fixed w-full tableBorder rounded-md min-w-[1200px]">
        <TableHeader className="bg-[#F4F5F7] text-[#4B5563]">
          <TableRow>
            <TableHead className="w-[60px] text-center">No.</TableHead>
            <TableHead className="min-w-[300px] max-w-fit text-center">Launched (UTC)</TableHead>
            <TableHead className="min-w-[250px] max-w-fit text-center">Location</TableHead>
            <TableHead className="min-w-[150px] text-center">Mission</TableHead>
            <TableHead className="min-w-[120px] text-center">Orbit</TableHead>
            <TableHead className="min-w-[160px] text-center">Launch Status</TableHead>
            <TableHead className="min-w-[120px] text-center">Rocket</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#1F2937] border-b-0">
          {currentRows.map((launch: Launch, index: number) => (
            <TableRow
              onClick={() => openLaunchDetailsModal(launch.id)}
              key={launch.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell className='text-center border-0'>{indexOfFirstRow + index + 1}</TableCell>
              <TableCell className='text-center border-0'>{formatLaunchDate(launch.static_fire_date_utc!)}</TableCell>
              <TableCell className='text-center border-0'>{launch.location}</TableCell>
              <TableCell className='text-center border-0'>{launch.name}</TableCell>
              <TableCell className='text-center border-0'>{launch.orbit}</TableCell>
              <TableCell className='flex justify-center items-center border-0'>
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
              <TableCell className='text-center border-0'>{launch.rocket}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>    
    </div>
  )
}

export default DataTable