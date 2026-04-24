import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getEventAnalytics,
  getRevenueAnalytics,
} from "../../api/admin.api";
import StatCard from "../../components/admin/StatCard";
import RevenueChart from "../../components/admin/RevenueChart";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AdminDashboard() {
  const [eventStats, setEventStats] = useState(null);
  const [revenueStats, setRevenueStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [eventsRes, revenueRes] = await Promise.all([
          getEventAnalytics(),
          getRevenueAnalytics(),
        ]);

        setEventStats(eventsRes.data);
        setRevenueStats(revenueRes.data);
      } catch (error) {
        toast.error(error.response?.data?.detail || "Failed to load analytics");
      }
    };

    load();
  }, []);

  const revenue = Number(revenueStats?.total_revenue || 0);

  return (
    <div>
      <div className="mb-8">
        <p className="text-label text-accentPrimary">Admin OS</p>
        <h1 className="heading-section mt-2">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Events" value={eventStats?.total_events || 0} />
        <StatCard label="Total Bookings" value={eventStats?.total_bookings || 0} />
        <StatCard label="Confirmed" value={eventStats?.confirmed_bookings || 0} />
        <StatCard label="Revenue" value={formatCurrency(revenue)} />
      </div>

      <div className="mt-8">
        <RevenueChart revenue={revenue} />
      </div>
    </div>
  );
}