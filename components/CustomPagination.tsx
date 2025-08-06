"use client";
import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Launch } from "@/lib/types";
const rowsPerPage = 12;

const CustomPagination = ({
  launchData,
  currentPage,
  setCurrentPage,
  setCurrentRows,
  setIndexOfFirstRow,
}: {
  launchData: Launch[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setCurrentRows: (launches: Launch[]) => void;
  setIndexOfFirstRow: (index: number) => void;
}) => {
  const totalPages = Math.ceil(launchData?.length / rowsPerPage);
  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    setIndexOfFirstRow(indexOfFirstRow);
    const currentRows = launchData?.slice(indexOfFirstRow, indexOfLastRow);
    setCurrentRows(currentRows);
  }, [launchData, currentPage, setCurrentRows]);
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);

    pages.push(1);

    if (start > 2) pages.push("ellipsis-start");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("ellipsis-end");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();
  return (
    <div>
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
              {item === "ellipsis-start" || item === "ellipsis-end" ? (
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
    </div>
  );
};

export default CustomPagination;
