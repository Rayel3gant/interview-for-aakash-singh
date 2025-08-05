'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Launch } from '@/lib/types';
import LaunchModal from '@/components/LaunchModal';
import { formatLaunchDate } from '@/lib/utils';
import DateModal from '@/components/DateModal';
import Loader from '@/components/Loader';
import { useAllLaunches } from '../hooks/useAllLaunches';
import { useLaunchDetails } from '../hooks/useLaunchDetails';
import Pagintaion from '@/components/Pagintaion';

const Page = () => {
  const [launchData, setLaunchData] = useState<Launch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [launchFilter,setLaunchFilter]=useState("all");
  const [openModal,setOpenModal]=useState(false);
  const [openDateModal,setDateModal]=useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading,setLoading]=useState(false)
  const [currentRows,setCurrentRows]=useState<Launch[]>([])
 

  const { data: allLaunches, isStale, isFetching, refetch } = useAllLaunches();
  useEffect(() => {
    if (allLaunches) {
      setLaunchData(allLaunches);
    }
  }, [allLaunches]);

  const { data:singleLaunch, isLoading:modalDataLoading  } = useLaunchDetails(selectedId);

  const openLaunchDetailsModal = async (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      setOpenModal(true)
    }, 250);
  };
  
  const launchStatusFilter = (status: string) => {
    setLoading(true);
    setCurrentPage(1); // Reset pagination on filter change

    let filtered: Launch[] = [];

    if (status === "all") {
      filtered = allLaunches;
    } else if (status === "upcoming") {
      filtered = allLaunches.filter((launch: Launch) => launch.upcoming === true);
    } else if (status === "successful") {
      filtered = allLaunches.filter((launch: Launch) =>
        launch.success === true && launch.upcoming === false
      );
    } else if (status === "failed") {
      filtered = allLaunches.filter((launch: Launch) =>
        launch.success === false && launch.upcoming === false
      );
    }

    setLaunchData(filtered);
    setTimeout(()=>{
      setLoading(false);
    },300)
  };

  return (
    <div className='w-11/12 mx-auto min-h-[calc(100vh-8rem)] '>
      <div className='w-full flex items-center justify-between my-12'>
        <div className='cursor-pointer px-4 py-2 rounded-md border' onClick={()=>setDateModal(true)}>
          Date filter
        </div>

        <div>
          <Select value={launchFilter}
            onValueChange={(value) => {
            setLaunchFilter(value);
            launchStatusFilter(value);
          }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent defaultValue="all" className='bg-white'>
              <SelectItem value="all">All Launches</SelectItem>
              <SelectItem value="upcoming">Upcoming Launches</SelectItem>
              <SelectItem value="successful">Successful Launches</SelectItem>
              <SelectItem value="failed">Failed Launches</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="w-full overflow-x-auto">
        {
          isFetching || loading ? (
            <div className='w-full min-h-[300px] flex justify-center items-center'>
                <Loader/>
            </div>
          ) : (
            <>
            {
              (launchData?.length===0)? (
                <div className='w-full text-center text-[#374151] text-lg'>
                  No results found for the specified filter
                </div>
              ) : (
                <>
                  <div className='flex gap-x-4 items-center pb-4'>
                    <div className={` text-sm py-2 ${isStale ? "text-red-500":"text-green-500"}`}>
                      {
                        isStale ? "Data is Stale." : "Data is Fresh."
                      }
                    </div>

                    <button onClick={()=>refetch()} disabled={!isStale} className={`px-4 py-2 rounded-md text-white cursor-pointer ${!isStale ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}>
                      Refetch Data
                    </button>

                  </div>
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
                          <TableCell className='text-center border-0'>{ index + 1}</TableCell>
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

                  <Pagintaion 
                    launchData={launchData} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    setCurrentRows={setCurrentRows}
                  />
                    
                  
                </>
              )
            }
            </>
          )
        }

        

      </div>       
      </div>

      {
        openModal && singleLaunch && <LaunchModal setOpenModal={setOpenModal} data={singleLaunch} openModal={openModal} modalDataLoading={modalDataLoading}   />
      }

      {
        openDateModal && <DateModal  setOpenModal={setDateModal}  openModal={openDateModal} setFilteredData={setLaunchData} />
      }
    </div>
  );
};

export default Page;
