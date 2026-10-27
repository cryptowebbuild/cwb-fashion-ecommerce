import React from "react";
import { prisma } from "@/lib/db";
import { OrdersTableClient } from "./orders-table-client";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const ordersRaw = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  const orders = ordersRaw.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
          Logistics Fulfillment
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Cash on Delivery Orders ({orders.length})
        </h1>
        <p className="text-xs text-white/50 mt-1">
          Review customer addresses, verify telephone numbers, and track courier dispatch.
        </p>
      </div>

      <OrdersTableClient initialOrders={orders} />
    </div>
  );
}
