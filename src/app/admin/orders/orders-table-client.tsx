"use client";

import React, { useState } from "react";
import { Search, Phone, MapPin, Check, AlertCircle, Clock } from "lucide-react";

interface OrdersTableClientProps {
  initialOrders: any[];
}

export function OrdersTableClient({ initialOrders }: OrdersTableClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== "ALL" && o.status !== selectedStatus) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      const matchNumber = o.orderNumber.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchNumber) return false;
    }
    return true;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statuses = ["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div className="bg-cwb-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedStatus === s
                  ? "bg-cwb-accent text-black font-bold shadow-md shadow-cwb-accent/20"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, or phone..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cwb-accent"
          />
        </div>
      </div>

      {/* Orders List / Cards */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-white/40 text-xs">
            No orders match the selected filter.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-extrabold text-cwb-accent tracking-wide">
                    {order.orderNumber}
                  </span>
                  <span className="text-[11px] text-white/40">
                    {new Date(order.createdAt).toLocaleDateString()} at{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/50 uppercase font-semibold">
                    Change Status:
                  </span>
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs font-bold uppercase rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer border ${
                      order.status === "DELIVERED"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : order.status === "SHIPPED"
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                        : order.status === "CANCELLED"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    <option value="PENDING" className="bg-[#12141c]">PENDING</option>
                    <option value="PROCESSING" className="bg-[#12141c]">PROCESSING</option>
                    <option value="SHIPPED" className="bg-[#12141c]">SHIPPED</option>
                    <option value="DELIVERED" className="bg-[#12141c]">DELIVERED</option>
                    <option value="CANCELLED" className="bg-[#12141c]">CANCELLED</option>
                  </select>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    Customer Information
                  </span>
                  <p className="text-white font-bold">{order.customerName}</p>
                  <p className="text-white/70 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cwb-accent" />
                    <span>{order.customerPhone}</span>
                  </p>
                  {order.customerEmail && (
                    <p className="text-white/50">{order.customerEmail}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    Delivery Address
                  </span>
                  <p className="text-white/80 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cwb-accent shrink-0 mt-0.5" />
                    <span>{order.shippingAddress}, {order.city}</span>
                  </p>
                  {order.notes && (
                    <p className="text-amber-300/80 text-[11px] pt-1 italic">
                      Note: &quot;{order.notes}&quot;
                    </p>
                  )}
                </div>

                <div className="space-y-1 md:text-right">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    Payment & Total
                  </span>
                  <p className="text-lg font-black text-cwb-accentLight">
                    ${order.totalAmount}
                  </p>
                  <span className="inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-semibold block mb-2">
                  Ordered Garments ({order.items.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-white line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-white/50">
                          {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-cwb-accentLight text-xs">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
