"use client";

import React, { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/storefront/ProductCard";
import {
  ProductFilters,
  FilterState,
} from "@/components/storefront/ProductFilters";
import { MobileFilters } from "@/components/storefront/MobileFilters";
import { products, getCategories } from "@/lib/data/products";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const categories = getCategories();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    priceRange: { min: 0, max: 200 },
    sortBy: "featured",
    showBestSellers: false,
  });

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      priceRange: { min: 0, max: 200 },
      sortBy: "featured",
      showBestSellers: false,
    });
  };

  // Filter and Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter (name and description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Best sellers filter
    if (filters.showBestSellers) {
      result = result.filter((product) => product.isBestSeller);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "best-sellers":
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.reviews - a.reviews;
        });
        break;
      default:
        // Featured - keep original order but prioritize best sellers
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
    }

    return result;
  }, [filters]);

  const handleAddToCart = (product: any) => {
    // We'll implement cart functionality later
    console.log("Added to cart:", product);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">All Products</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of premium supplements
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                onResetFilters={handleResetFilters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filters & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredAndSortedProducts.length}
                </span>{" "}
                products
              </p>
              <div className="lg:hidden">
                <MobileFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  categories={categories}
                  onResetFilters={handleResetFilters}
                  resultsCount={filteredAndSortedProducts.length}
                />
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16"
              >
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Reset all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
