import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationComp({ page, length }: { page: number; length: number }) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/players?page=${page - 1}`} />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink href={`/players?page=${page - 1}`}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={`/players?page=${page}`} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < length && (
          <PaginationItem>
            <PaginationLink href={`/players?page=${page + 1}`}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < length - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < length && (
          <PaginationItem>
            <PaginationNext href={`/players?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComp;
