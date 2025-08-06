"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Launch } from "@/lib/types";
import { LaunchModal } from "@/components/LaunchModal";
import { DateModal } from "@/components/DateModal";
import { Loader } from "@/components/Loader";
import { useAllLaunches } from "../hooks/useAllLaunches";
import { useLaunchDetails } from "../hooks/useLaunchDetails";
import { DataTable } from "@/components/DataTable";
import { launchFilterOptions } from "@/lib/constant";
import { CustomPagination } from "@/components/CustomPagination";

const Page = () => {
  const [launchData, setLaunchData] = useState<Launch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [launchFilter, setLaunchFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [openDateModal, setDateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentRows, setCurrentRows] = useState<Launch[]>([]);
  const [indexOfFirstRow, setIndexOfFirstRow] = useState(0);

  const { data: allLaunches, isStale, isFetching, refetch } = useAllLaunches();
  useEffect(() => {
    if (allLaunches) {
      setLaunchData(allLaunches);
    }
  }, [allLaunches]);

  const { data: singleLaunch, isLoading: modalDataLoading } =
    useLaunchDetails(selectedId);

  const openLaunchDetailsModal = async (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      setOpenModal(true);
    }, 250);
  };

  const launchStatusFilter = (status: string) => {
    if (!allLaunches) return;
    setLoading(true);
    setCurrentPage(1);

    let filtered: Launch[] = [];

    if (status === "all") {
      filtered = allLaunches;
    } else if (status === "upcoming") {
      filtered = allLaunches.filter(
        (launch: Launch) => launch.upcoming === true
      );
    } else if (status === "successful") {
      filtered = allLaunches.filter(
        (launch: Launch) => launch.success === true && launch.upcoming === false
      );
    } else if (status === "failed") {
      filtered = allLaunches.filter(
        (launch: Launch) =>
          launch.success === false && launch.upcoming === false
      );
    }

    setLaunchData(filtered);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="w-11/12 mx-auto min-h-[calc(100vh-8rem)] ">
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

      <div className="overflow-x-auto w-full">
        <div className="w-full overflow-x-auto">
          {isFetching || loading ? (
            <div className="w-full min-h-[300px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {launchData?.length === 0 ? (
                <div className="w-full text-center text-[#374151] text-lg">
                  No results found for the specified filter
                </div>
              ) : (
                <>
                  <div className="flex gap-x-4 items-center pb-4">
                    <div
                      className={` text-sm py-2 ${
                        isStale ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {isStale ? "Data is Stale." : "Data is Fresh."}
                    </div>

                    <button
                      onClick={() => refetch()}
                      disabled={!isStale}
                      className={`px-4 py-2 rounded-md text-white cursor-pointer ${
                        !isStale ? "bg-gray-400 cursor-not-allowed" : "bg-black"
                      }`}
                    >
                      Refetch Data
                    </button>
                  </div>

                  <DataTable
                    currentRows={currentRows}
                    openLaunchDetailsModal={openLaunchDetailsModal}
                    indexOfFirstRow={indexOfFirstRow}
                  />

                  <CustomPagination
                    launchData={launchData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentRows={setCurrentRows}
                    setIndexOfFirstRow={setIndexOfFirstRow}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {openModal && singleLaunch && (
        <LaunchModal
          setOpenModal={setOpenModal}
          data={singleLaunch}
          openModal={openModal}
          modalDataLoading={modalDataLoading}
        />
      )}

      {openDateModal && (
        <DateModal
          setOpenModal={setDateModal}
          openModal={openDateModal}
          setFilteredData={setLaunchData}
        />
      )}
    </div>
  );
};

export default Page;
