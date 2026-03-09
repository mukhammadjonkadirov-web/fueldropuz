 "use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/Card";

type OrderStatus = "new" | "accepted" | "on_the_way" | "delivered";
type PaymentStatus = "pending" | "paid" | "failed";

type Order = {
  id: string;
  orderId: string;
  name: string;
  phone: string;
  city: string | null;
  address: string | null;
  coordinates: string | null;
  fuelType: string | null;
  liters: string | null;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  { value: "new", label: "new", color: "bg-slate-200 text-slate-800" },
  { value: "accepted", label: "accepted", color: "bg-sky-100 text-sky-800" },
  { value: "on_the_way", label: "on the way", color: "bg-amber-100 text-amber-800" },
  { value: "delivered", label: "delivered", color: "bg-emerald-100 text-emerald-800" },
];

function statusBadge(status: OrderStatus) {
  const opt = STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${opt.color}`}
    >
      {opt.label}
    </span>
  );
}

function paymentStatusBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    paid: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        map[status]
      }`}
    >
      {status}
    </span>
  );
}

export default function OrdersDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load orders");
        }
        setOrders(data.orders);
      } catch (e) {
        console.error(e);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      setError(null);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
      );
    } catch (e) {
      console.error(e);
      setError("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Internal view of incoming fuel orders. Update status as your team
          processes each order.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card padding="none">
        <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
          <CardTitle>Orders</CardTitle>
        </div>
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No orders yet. New orders will appear here in real time as customers
            submit them.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2 sm:px-4">Order ID</th>
                  <th className="px-3 py-2 sm:px-4">Name</th>
                  <th className="px-3 py-2 sm:px-4">Phone</th>
                  <th className="px-3 py-2 sm:px-4">City</th>
                  <th className="px-3 py-2 sm:px-4">Fuel</th>
                  <th className="px-3 py-2 sm:px-4">Liters</th>
                  <th className="px-3 py-2 sm:px-4">Payment</th>
                  <th className="px-3 py-2 sm:px-4">Payment status</th>
                  <th className="px-3 py-2 sm:px-4">Order status</th>
                  <th className="px-3 py-2 sm:px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 hover:bg-slate-50/60"
                  >
                    <td className="px-3 py-2 sm:px-4 font-mono text-xs text-slate-800">
                      {order.orderId}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-900">
                      {order.name}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {order.phone}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {order.city || "—"}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {order.fuelType || "—"}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {order.liters || "—"}
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {order.paymentMethod}
                    </td>
                    <td className="px-3 py-2 sm:px-4">
                      {paymentStatusBadge(order.paymentStatus)}
                    </td>
                    <td className="px-3 py-2 sm:px-4">
                      <div className="flex items-center gap-2">
                        {statusBadge(order.status)}
                        <select
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.orderId, e.target.value as OrderStatus)
                          }
                          disabled={updatingId === order.orderId}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-4 text-slate-700">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

