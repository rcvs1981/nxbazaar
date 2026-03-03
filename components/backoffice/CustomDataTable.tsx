"use client";
import React, { useState } from "react";
import { Order } from "@/types/dashboard";

interface Props {
  orders: Order[];
}

export default function CustomDataTable({ orders }: Props) {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const currentOrders = orders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, orders.length);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      <div className="overflow-x-auto shadow-md rounded-lg p-6 bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-6 py-4 font-medium">#{order.id}</td>
                <td className="px-6 py-4">₹ {order.total}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs">
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-blue-600 cursor-pointer">
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <p>
            Showing {itemStartIndex}-{itemEndIndex} of {orders.length}
          </p>

          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
