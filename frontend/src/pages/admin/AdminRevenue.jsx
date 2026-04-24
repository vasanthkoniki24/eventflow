import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRevenueAnalytics } from "../../api/admin.api";
import RevenueChart from "../../components/admin/RevenueChart";
import StatCard from "../../components/admin/StatCard";
import { formatCurrency } from "../../utils/formatCurrency";

export default function AdminRevenue() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getRevenueAnalytics();
        setRevenue(Number(res.data.total_revenue || 0));
      } catch (error) {
        toast.error(error.response?.data?.detail || "Failed to load revenue");
      }
    };

    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-label text-accentPrimary">Finance</p>
        <h1 className="heading-section mt-2">Revenue Analytics</h1>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <StatCard label="Total Revenue" value={formatCurrency(revenue)} />
        <StatCard label="Gateway" value="Stripe" />
        <StatCard label="Status" value={revenue > 0 ? "Active" : "Pending"} />
      </div>

      <RevenueChart revenue={revenue} />
    </div>
  );
}