import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [orders, totalProducts, lowStockCount, recentOrders] = await Promise.all([
    prisma.order.findMany({
      select: { totalAmount: true, status: true },
    }),
    prisma.product.count({ where: { isArchived: false } }),
    prisma.productVariant.count({ where: { stock: { lte: 3 } } }),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const averageOrderValue =
    totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div className="space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cwb-accent mb-1 block">
            Executive Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Live Store Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 rounded-xl bg-cwb-accent text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-cwb-accentLight transition-colors shadow-lg shadow-cwb-accent/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Garment</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Review Orders</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-cwb-card border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="p-2.5 rounded-xl bg-cwb-accent/10 text-cwb-accent">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">
              ${totalRevenue.toLocaleString()}
            </span>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>100% Cash on Delivery settled</span>
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-3xl bg-cwb-card border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">
              Total Orders
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{totalOrders}</span>
            <p className="text-[11px] text-white/50 mt-1">
              {pendingOrders} awaiting fulfillment
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-6 rounded-3xl bg-cwb-card border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">
              Avg Order Value
            </span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">
              ${averageOrderValue}
            </span>
            <p className="text-[11px] text-white/50 mt-1">
              High-value luxury basket size
            </p>
          </div>
        </div>

        {/* Live Active Products */}
        <div className="p-6 rounded-3xl bg-cwb-card border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50 font-semibold uppercase tracking-wider">
              Active Garments
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-white">{totalProducts}</span>
            <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{lowStockCount} variants low in stock</span>
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide uppercase">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Live orders requiring verification and dispatch.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-cwb-accent hover:text-cwb-accentLight flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">City</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Total Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40">
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-cwb-accent">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 text-white font-medium">
                      {order.customerName}
                      <span className="block text-[10px] text-white/40">
                        {order.customerPhone}
                      </span>
                    </td>
                    <td className="py-3.5 text-white/70">{order.city}</td>
                    <td className="py-3.5 text-white/70">{order.items.length} items</td>
                    <td className="py-3.5 font-bold text-cwb-accentLight">
                      ${order.totalAmount}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : order.status === "SHIPPED"
                            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            : order.status === "CANCELLED"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
