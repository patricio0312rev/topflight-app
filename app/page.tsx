"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export interface FilterState {
  search: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: string;
  showBestSellers: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  onResetFilters: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  categories,
  onResetFilters,
}: ProductFiltersProps) {
  // Local state for search input (not debounced)
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounced search value
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update parent filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ ...filters, search: debouncedSearch });
    }
  }, [debouncedSearch]);

  // Sync local search with external filters (for reset)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: { min, max } });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleBestSellerToggle = () => {
    onFilterChange({ ...filters, showBestSellers: !filters.showBestSellers });
  };

  const activeFiltersCount = [
    filters.category !== "all",
    filters.priceRange.min > 0 || filters.priceRange.max < 200,
    filters.showBestSellers,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchInput && searchInput !== debouncedSearch && (
            <p className="text-xs text-muted-foreground mt-2">Searching...</p>
          )}
        </CardContent>
      </Card>

      {/* Sort */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="best-sellers">Best Sellers</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Reset ({activeFiltersCount})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Category</Label>
            <Select
              value={filters.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Price Range
            </Label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Min
                  </Label>
                  <Input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      handlePriceRangeChange(
                        Number(e.target.value),
                        filters.priceRange.max
                      )
                    }
                    min={0}
                    placeholder="$0"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Max
                  </Label>
                  <Input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      handlePriceRangeChange(
                        filters.priceRange.min,
                        Number(e.target.value)
                      )
                    }
                    min={0}
                    placeholder="$200"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(0, 30)}
                  className="flex-1"
                >
                  Under $30
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePriceRangeChange(30, 50)}
                  className="flex-1"
                >
                  $30 - $50
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Best Sellers Filter */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Special</Label>
            <Button
              variant={filters.showBestSellers ? "default" : "outline"}
              size="sm"
              onClick={handleBestSellerToggle}
              className="w-full justify-start"
            >
              {filters.showBestSellers && "✓ "}
              Best Sellers Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.category !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {filters.category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleCategoryChange("all")}
                  />
                </Badge>
              )}
              {(filters.priceRange.min > 0 || filters.priceRange.max < 200) && (
                <Badge variant="secondary" className="gap-1">
                  ${filters.priceRange.min} - ${filters.priceRange.max}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handlePriceRangeChange(0, 200)}
                  />
                </Badge>
              )}
              {filters.showBestSellers && (
                <Badge variant="secondary" className="gap-1">
                  Best Sellers
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={handleBestSellerToggle}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
