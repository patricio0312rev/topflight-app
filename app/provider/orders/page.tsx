"use client";

import React, { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { OrdersTable } from "@/components/provider/OrdersTable";
import { OrderFilters } from "@/components/provider/OrderFilters";
import { getAllOrders } from "@/lib/data/orders";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

export default function ProviderOrdersPage() {
  const orders = getAllOrders();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const customerName =
          `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`.toLowerCase();
        const products = order.items
          .map((item) => item.product.name.toLowerCase())
          .join(" ");
        const orderNumber = order.orderNumber.toLowerCase();

        return (
          orderNumber.includes(query) ||
          customerName.includes(query) ||
          products.includes(query)
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      result = result.filter((order) => new Date(order.createdAt) >= fromDate);
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      result = result.filter((order) => new Date(order.createdAt) <= toDate);
    }

    return result;
  }, [orders, searchQuery, statusFilter, dateFrom, dateTo]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setSorting([]);
    setColumnFilters([]);
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
              <h1 className="text-4xl md:text-5xl font-bold">All Orders</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage and track all customer orders
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                dateFrom={dateFrom}
                onDateFromChange={setDateFrom}
                dateTo={dateTo}
                onDateToChange={setDateTo}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Orders Table */}
          <div className="lg:col-span-3">
            <OrdersTable
              data={filteredOrders}
              sorting={sorting}
              setSorting={setSorting}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
