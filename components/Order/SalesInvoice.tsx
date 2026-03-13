"use client";

import Image from "next/image";
import React, { useRef } from "react";
import logo from "@/public/limiLogo.webp";
import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import { useReactToPrint } from "react-to-print";
import { Order } from "@/types/order";

type Props = {
  order: Order;
};

export default function SalesInvoice({ order }: Props) {

  const invoiceRef = useRef<HTMLDivElement>(null);

  const invoiceDate = convertIsoDateToNormal(order.createdAt);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div className="flex flex-col">

      <div className="flex justify-end mb-8">
        <button
          onClick={handlePrint}
          className="px-4 py-3 text-xs font-bold bg-slate-800 text-white rounded-md"
        >
          Download / Print Invoice
        </button>
      </div>

      <div ref={invoiceRef}>

        <div className="max-w-4xl mx-auto border p-8 rounded-sm">

          <div className="flex justify-between border-b pb-8">

            <div>
              <h2>Bill From:</h2>
              <p>LimiFood</p>
              <p>Canada</p>
              <p>sales@limifood.com</p>
            </div>

            <Image src={logo} alt="logo" className="w-36 h-24" />

          </div>

          <div className="flex justify-between border-b py-8">

            <div>
              <h2>Bill To:</h2>
              <p>{order.firstName} {order.lastName}</p>
              <p>{order.address}</p>
              <p>{order.city} - {order.country}</p>
              <p>{order.email}</p>
            </div>

            <div>
              <p>Invoice #: {order.orderNumber}</p>
              <p>Date: {invoiceDate}</p>
            </div>

          </div>

          <table className="w-full mt-8 text-sm">

            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>

              {order.orderItems.map((item) => {

                const lineTotal = (item.price * item.quantity).toFixed(2);

                return (
                  <tr key={item.id}>

                    <td>
                      <Image
                        src={item.imageUrl}
                        width={40}
                        height={40}
                        alt={item.title}
                        className="rounded"
                      />
                    </td>

                    <td>{item.title}</td>

                    <td>{item.quantity}</td>

                    <td>${item.price}</td>

                    <td>${lineTotal}</td>

                  </tr>
                );
              })}

            </tbody>

          </table>

          <div className="mt-8 flex justify-end">

            <div className="w-64 space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST ({order.gstRate}%)</span>
                <span>${order.gstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}