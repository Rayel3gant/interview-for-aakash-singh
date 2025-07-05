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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/lib/redux/store';
import { addLaunchData } from '@/lib/redux/slices/launchDataSlice';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Launch, singleLaunch } from '@/lib/types';
import LaunchModal from '@/components/LaunchModal';
import { formatLaunchDate } from '@/lib/utils';
import DateModal from '@/components/DateModal';
import Loader from '@/components/Loader';

const Page = () => {
  const dispatch = useDispatch();
  const { allLaunches } = useSelector((state: RootState) => state.launch);

  const [launchData, setLaunchData] = useState<Launch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const [loading,setLoading]=useState(false)
  const [launchFilter,setLaunchFilter]=useState("all");
  const [openModal,setOpenModal]=useState(false);
  const [singleLaunch,setSingleLaunch]=useState<singleLaunch | null>(null);
  const [openDateModal,setDateModal]=useState(false);
  const [modalDataLoading,setModalDataLoading]=useState(false);

  // Fetch data if not in Redux
  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch("/api/launchData");
      const data = await res.json();
      setLaunchData(data.data);
      dispatch(addLaunchData(data.data));
    } catch(error){
      console.error(error)
    }
    setLoading(false)
  }

  async function fetchLaunchDetails(id:string){
    try {
      const res = await fetch(`/api/getLaunch/${id}`);
      const data = await res.json();
      setSingleLaunch(data.data);
      
    } catch(error){
      console.error(error)
    }
    setLoading(false)
  }

  const openLaunchDetailsModal=(id:string)=>{
    setModalDataLoading(true);
    fetchLaunchDetails(id);
    setTimeout(() => {
      setOpenModal(true)
    }, 1000);
    setTimeout(() => {
      setModalDataLoading(false);
    }, 1500);
  }

  useEffect(() => {
    if (!allLaunches || allLaunches.length === 0) {
      fetchData();
    } else {
      setLaunchData(allLaunches);
    }
  }, []);


  // Pagination logic
  const totalPages = Math.ceil(launchData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = launchData.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Smart Pagination Logic
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1); // Always show first

    if (start > 2) pages.push('ellipsis-start');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('ellipsis-end');

    if (totalPages > 1) pages.push(totalPages); // Always show last

    return pages;
  };

  const pageNumbers = getPageNumbers();

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
    setLoading(false);
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
          loading ? (
            <div className='w-full min-h-[300px] flex justify-center items-center'>
                <Loader/>
            </div>
          ) : (
            <>
            {
              (launchData.length===0)? (
                <div className='w-full text-center text-[#374151] text-lg'>
                  No results found for the specified filter
                </div>
              ) : (
                <>
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="my-8 w-full flex justify-end ">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() => goToPage(currentPage - 1)}
                          />
                        </PaginationItem>

                        {pageNumbers.map((item, idx) => (
                          <PaginationItem key={idx}>
                            {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                isActive={item === currentPage}
                                onClick={() => goToPage(Number(item))}
                              >
                                {item}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() => goToPage(currentPage + 1)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
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
