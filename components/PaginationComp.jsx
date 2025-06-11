"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationComp() {
  const [page, setPage] = useState(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          {page !== 1 && <PaginationLink href="#">{page - 1}</PaginationLink>}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComp;
