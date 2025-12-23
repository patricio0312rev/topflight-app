"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { ProductFilters, FilterState } from "./ProductFilters";

interface MobileFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  onResetFilters: () => void;
  resultsCount: number;
}

export function MobileFilters({
  filters,
  onFilterChange,
  categories,
  onResetFilters,
  resultsCount,
}: MobileFiltersProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters & Sort
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters & Sort</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <ProductFilters
            filters={filters}
            onFilterChange={onFilterChange}
            categories={categories}
            onResetFilters={onResetFilters}
          />
          <div className="mt-6 sticky bottom-0 bg-background pt-4 border-t">
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600"
              onClick={() => setOpen(false)}
            >
              Show {resultsCount} Results
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
